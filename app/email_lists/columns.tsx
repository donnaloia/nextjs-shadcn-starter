"use client"

import { ColumnDef } from "@tanstack/react-table"

type Pokemon = {
  name: string
  url: string
}

export const columns: ColumnDef<Pokemon>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "url",
    header: "Details URL",
    cell: ({ row }) => (
      <a href={row.getValue("url")} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
        View Details
      </a>
    ),
  },
]

