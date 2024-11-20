"use client"

import { useEffect, useState } from "react"
import { DataTable } from "./data-table"
import { columns } from "./columns"

type CatBreed = {
  breed: string
  country: string
  origin: string
  coat: string
  pattern: string
}

type ApiResponse = {
  data: CatBreed[]
  current_page: number
  last_page: number
  total: number
}

export default function LeaderboardPage() {
  const [data, setData] = useState<CatBreed[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageCount, setPageCount] = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://catfact.ninja/breeds?page=${currentPage}`)
      const result: ApiResponse = await response.json()
      setData(result.data)
      setPageCount(result.last_page)
    }
    fetchData()
  }, [currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Cat Breeds</h2>
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
        <DataTable 
          columns={columns} 
          data={data} 
          pageCount={pageCount}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}