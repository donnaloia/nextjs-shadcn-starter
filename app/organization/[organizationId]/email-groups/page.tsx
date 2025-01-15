"use client"

import { useEffect, useState, use } from "react"
import { DataTable } from "@/components/shared/data-table"
import { columns } from "./columns"
import { TableSkeleton} from "@/components/shared/table-skeleton"
import { getAccessToken} from "@/lib/auth/cookies/client"
import { removeAccessToken } from "@/lib/auth/cookies/client"
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { TypeAnimation } from 'react-type-animation'
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { createEmailGroup } from "./create/actions"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { API_ENDPOINTS } from '@/lib/config/api/endpoints'

type EmailGroup = {
  id: string
  name: string
  created_at: string
  status?: string
}

type ApiResponse = {
  results: EmailGroup[]
  current_page: number
  total_pages: number
  total: number
}

export default function EmailGroupsPage({
  params,
}: {
  params: Promise<{ organizationId: string }>
}) {
  const { organizationId } = use(params)
  const searchParams = useSearchParams()
  const [open, setOpen] = useState(searchParams.get('create') === 'true')
  const [data, setData] = useState<EmailGroup[]>([])
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
        const response = await fetch(API_ENDPOINTS.emailGroups.list(organizationId, currentPage), {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          if (response.status === 401) {
            console.log('Unauthorized, redirecting to login')
            removeAccessToken()
            router.push('/login')
            return
          }
          if (response.status === 500) {
            console.log('Server error, redirecting to login')
            removeAccessToken()
            router.push('/login')
            return
          }
          throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`)
        }

        const result: ApiResponse = await response.json()
        setData(result.results)
        setPageCount(result.total_pages)
      } catch (err: any) {
        console.error('Error fetching email groups:', err)
        setError("Failed to load email groups. Please try again later.")
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
      setNameError("Email group name is required")
      return
    }
    
    setNameError("")
    await createEmailGroup(organizationId, formData)
  }

  return (
    <div className="flex-1 space-y-12 p-16 pt-14">
      <div className="flex items-center justify-between mb-12 pl-4">
        <div className="space-y-6">
          <h2 className="text-5xl font-bold tracking-tight text-[#412C72]">Email Groups</h2>
          <p className="text-muted-foreground text-2xl font-light leading-relaxed tracking-wide max-w-3xl font-['Helvetica']">
            Organize your recipients into targeted groups. Create dynamic segments based on custom criteria, import contacts from external sources, or build lists manually. Then easily manage and update your groups to ensure precise email delivery.
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
                  placeholder="Search email groups..."
                  className="w-full pl-8 placeholder:text-[#5B3E9E]/50 text-lg h-12 text-base"
                  style={{ fontSize: '1.125rem', paddingLeft: '2.5rem' }}
                  onChange={(e) => {
                    // TODO: Add search functionality
                    console.log(e.target.value)
                  }}
                />
              </div>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#ac3f3f] text-[#e9d3ff] hover:bg-[#ac3f3f]/90 text-base px-4 py-6">
                    Create Email Group <Plus className="ml-1 h-6 w-6 stroke-[4]" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[600px] max-w-[90vw] p-0">
                  <DialogHeader className="space-y-4 px-16 py-12">
                    <DialogTitle className="text-3xl font-medium">Create Email Group</DialogTitle>
                    <DialogDescription className="text-lg text-muted-foreground">
                      Create a new email group to organize your recipients.
                    </DialogDescription>
                  </DialogHeader>
                  <form action={onSubmit} className="space-y-8 px-16 pb-12">
                    <div className="space-y-4">
                      <Label htmlFor="name" className="text-xl">Email Group Name</Label>
                      <Input 
                        id="name" 
                        name="name" 
                        placeholder="Enter email group name" 
                        style={{ fontSize: '1.25rem' }}
                        className="h-12 placeholder:text-xl text-[#412C72] placeholder:text-gray-500 font-medium placeholder:font-medium" 
                      />
                      {nameError && (
                        <p className="text-lg text-red-500">{nameError}</p>
                      )}
                    </div>
                    <div className="pt-4">
                      <Button type="submit" className="w-full py-6 text-xl">
                        Create Email Group
                      </Button>
                    </div>
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