"use client"

import { format } from "date-fns"
import { ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"

type EmailGroup = {
  id: string
  name: string
  created_at: string
  status?: string
}

export const columns: ColumnDef<EmailGroup, unknown>[] = [
  {
    accessorKey: "id",
    header: () => (
      <div className="py-4 pl-4 text-[#614785] text-lg">
        ID
      </div>
    ),
    cell: ({ row }) => (
      <div className="py-2 pl-4">
        {row.getValue("id")}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: () => (
      <div className="py-4 text-[#614785] text-lg">
        Name
      </div>
    ),
    cell: ({ row }) => (
      <div className="py-2">
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <div className="flex items-center space-x-3 text-[#614785] text-lg py-4">
        Created On
        <ChevronsUpDown 
          className="h-6 w-4 text-[#614785]/50 hover:text-[#614785] ml-1" 
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      </div>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"))
      return (
        <div className="py-2">
          {format(date, "MMM d, yyyy")}
        </div>
      )
    }
  },
  {
    accessorKey: "status",
    header: () => (
      <div className="py-4 text-[#614785] text-lg">
        Status
      </div>
    ),
    cell: ({ row }) => {
      const status = row.index % 3 === 0 ? "launched" : 
                    row.index % 3 === 1 ? "scheduled" : 
                    "unscheduled"
      return (
        <div className="py-2">
          <Badge 
            variant="outline" 
            className={cn(
              "px-4 py-1",
              status === "launched" && "bg-green-100 text-green-800 border-green-200",
              status === "scheduled" && "bg-blue-100 text-blue-800 border-blue-200",
              status === "unscheduled" && "bg-gray-100 text-gray-800 border-gray-200"
            )}
          >
            {status}
          </Badge>
        </div>
      )
    }
  }
]

