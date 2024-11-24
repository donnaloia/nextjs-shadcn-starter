"use client"

import { useEffect, useState } from "react"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { TableSkeleton } from "@/components/table-skeleton"

type EmailAddress = {
  id: string
  name: string
  created_at: string
}

type ApiResponse = {
  results: EmailAddress[]
  current_page: number
  total_pages: number
  total: number
}

export default function EmailAddressesPage({
  params,
}: {
  params: { organizationId: string }
}) {
  const { organizationId } = params
  const [data, setData] = useState<EmailAddress[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageCount, setPageCount] = useState(1)
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async (page: number) => {
    console.log('fetchData called with page:', page)
    setIsLoading(true)
    setError("")
    
    try {
      const url = `http://localhost:8080/api/v1/organizations/${organizationId}/email-addresses?page=${page}`
      console.log('Making API call to:', url)

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: ApiResponse = await response.json()
      console.log('API Response received:', result)
      
      setData(result.results)
      setPageCount(result.total_pages)
      setCurrentPage(page)
    } catch (err) {
      console.error('Fetch error:', err)
      setError("Failed to load email addresses. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData(1)
  }, [])

  const handlePageChange = (page: number) => {
    console.log('handlePageChange called with page:', page)
    if (page === currentPage) {
      console.log('Same page requested, skipping fetch')
      return
    }
    
    console.log('Calling fetchData with page:', page)
    fetchData(page)
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-[#412C72]">Email Addresses</h2>
      </div>
      {error && (
        <div className="text-red-500 text-sm">
          {error}
        </div>
      )}
      <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <DataTable 
            columns={columns} 
            data={data}
            pageCount={pageCount}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  )
} 