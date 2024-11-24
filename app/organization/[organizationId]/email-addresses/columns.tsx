"use client"

import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"

type EmailAddress = {
  id: string
  name: string
  created_at: string
}

export const columns: ColumnDef<EmailAddress>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "created_at",
    header: "Created On",
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"))
      return format(date, "MMM d, yyyy")
    }
  }
] 