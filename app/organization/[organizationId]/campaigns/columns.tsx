"use client"

import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { ChevronsUpDown, Link, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

type Campaign = {
  id: string
  name: string
  created_at: string
  status: "launched" | "scheduled" | "unscheduled"
  organization_id: string
}

export const columns: ColumnDef<Campaign, unknown>[] = [

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
      const status = row.getValue("status") as "launched" | "scheduled" | "draft"
      return (
        <div className="py-2">
          <Badge 
            variant="outline" 
            className={cn(
              "px-4 py-1",
              status === "launched" && "bg-green-100 text-green-800 border-green-200",
              status === "scheduled" && "bg-blue-100 text-blue-800 border-blue-200",
              status === "draft" && "bg-gray-100 text-gray-800 border-gray-200"
            )}
          >
            {status}
          </Badge>
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
      const campaign = row.original
      const router = useRouter()

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
              onClick={() => navigator.clipboard.writeText(campaign.id)}
            >
              Copy campaign ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => router.push(`/organization/${campaign.organization_id}/campaigns/${campaign.id}`)}
            >
              View campaign
            </DropdownMenuItem>
            <DropdownMenuItem>View analytics</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

