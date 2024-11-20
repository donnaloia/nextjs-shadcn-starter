"use client"

import { useEffect, useState } from "react"
import { DataTable } from "./data-table"
import { columns } from "./columns"

type Pokemon = {
  name: string
  url: string
}

type ApiResponse = {
  count: number
  next: string | null
  previous: string | null
  results: Pokemon[]
}

export default function EmailListsPage() {
  const [data, setData] = useState<Pokemon[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const ITEMS_PER_PAGE = 20

  useEffect(() => {
    const fetchData = async () => {
      const offset = (currentPage - 1) * ITEMS_PER_PAGE
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${ITEMS_PER_PAGE}`)
      const result: ApiResponse = await response.json()
      setData(result.results)
      setTotalPages(Math.ceil(result.count / ITEMS_PER_PAGE))
    }
    fetchData()
  }, [currentPage])

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Pokemon List</h2>
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
        <DataTable 
          columns={columns} 
          data={data} 
          pageCount={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  )
}