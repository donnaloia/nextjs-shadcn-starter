"use client"

import { useEffect, useState, use } from "react"
import { DataTable } from "@/components/shared/data-table"
import { columns } from "./columns"
import { TableSkeleton } from "@/components/shared/table-skeleton"
import { getAccessToken} from "@/lib/client-auth"
import { removeAccessToken } from "@/lib/auth"
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { TypeAnimation } from 'react-type-animation'
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { createTemplate } from "./create/actions"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

type Template = {
  id: string
  name: string
  created_at: string
  status?: string
}

type ApiResponse = {
  results: Template[]
  current_page: number
  total_pages: number
  total: number
}

export default function TemplatesPage({
  params,
}: {
  params: Promise<{ organizationId: string }>
}) {
  const { organizationId } = use(params)
  const [data, setData] = useState<Template[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageCount, setPageCount] = useState(1)
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const [nameError, setNameError] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = getAccessToken()
      
      setIsLoading(true)
      setError("")
      
      try {
        console.log('Fetching page:', currentPage)
        const response = await fetch(`http://localhost:8080/api/v1/organizations/${organizationId}/templates?page=${currentPage}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result: ApiResponse = await response.json()
        setData(result.results)
        setPageCount(result.total_pages)
      } catch (err: any) {
        if (err.response?.status === 401) {
          removeAccessToken()
          router.push('/login')
        }
        console.error('Fetch error:', err)
        setError("Failed to load templates. Please try again later.")
        setData([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [currentPage])

  const handlePageChange = (page: number) => {
    console.log('Changing to page:', page)
    setCurrentPage(page)
  }

  async function onSubmit(formData: FormData) {
    const name = formData.get('name') as string
    
    if (!name || name.trim() === '') {
      setNameError("Template name is required")
      return
    }
    
    setNameError("")
    await createTemplate(organizationId, formData)
  }

  return (
    <div className="flex-1 space-y-12 p-16 pt-14">
      <div className="flex items-center justify-between mb-12 pl-4">
        <div className="space-y-6">
          <h2 className="text-5xl font-bold tracking-tight text-[#412C72]">Templates</h2>
          <p className="text-muted-foreground text-2xl font-light leading-relaxed tracking-wide max-w-3xl font-['Helvetica']">
            Manage your email templates here. Create reusable templates for your campaigns, customize them with dynamic content, and ensure consistent messaging across your communications.
          </p>
        </div>
      </div>
      {error && (
        <div className="text-red-500 text-sm p-4">
          {error}
        </div>
      )}
      <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <div className="w-[1200px] p-4">
            <div className="flex items-center justify-between pb-6">
              <div className="relative w-[32rem]">
                <Search className="absolute left-2 top-3.5 h-5 w-5 text-[#5B3E9E]/50" />
                <Input
                  placeholder="Search templates..."
                  className="w-full pl-8 placeholder:text-[#5B3E9E]/50 text-lg h-12 text-base"
                  style={{ fontSize: '1.125rem', paddingLeft: '2.5rem' }}
                  onChange={(e) => {
                    // TODO: Add search functionality
                    console.log(e.target.value)
                  }}
                />
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-[#ac3f3f] text-[#e9d3ff] hover:bg-[#ac3f3f]/90 text-base px-4 py-6">
                    Create Template <Plus className="ml-1 h-6 w-6 stroke-[4]" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="space-y-6">
                  <DialogHeader className="space-y-4">
                    <DialogTitle className="text-2xl">Create Template</DialogTitle>
                    <DialogDescription>
                      Create a new template for your email campaigns.
                    </DialogDescription>
                  </DialogHeader>
                  <form action={onSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <Label htmlFor="name">Template Name</Label>
                      <Input 
                        id="name" 
                        name="name" 
                        placeholder="Enter template name" 
                        className="h-12" 
                      />
                      <Input 
                        id="html" 
                        name="html" 
                        placeholder="Enter template HTML" 
                        className="h-12" 
                      />
                      {nameError && (
                        <p className="text-sm text-red-500">{nameError}</p>
                      )}
                    </div>
                    <Button type="submit" className="w-full py-6">Create Template</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <DataTable 
              columns={columns} 
              data={data}
              pageCount={pageCount}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  )
} 