"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { format } from "date-fns"

type Template = {
  id: string
  name: string
  created_at: string
  status?: string
}

export const columns: ColumnDef<Template>[] = [
    {
        accessorKey: "name",
        header: () => (
        <div className="pl-4 py-4 text-[#614785] text-lg">
            Name
        </div>
        ),
        cell: ({ row }) => (
        <div className="pl-4 py-2">
            {row.getValue("name")}
        </div>
        ),
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => (
        <div className="flex items-center space-x-3 text-[#614785] text-lg">
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
            <div className="py-2 ext-[#614785]">
            {format(date, "MMM d, yyyy")}
            </div>
        )
        }
    },
  {
    id: "actions",
    header: () => (
      <div className="py-4 text-[#614785] text-lg">
        Action
      </div>
    ),
    cell: ({ row }) => {
      const template = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(template.id)}
            >
              Copy template ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View template</DropdownMenuItem>
            <DropdownMenuItem>View analytics</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
] 