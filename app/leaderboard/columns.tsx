"use client"

import { ColumnDef } from "@tanstack/react-table"

type CatBreed = {
  breed: string
  country: string
  origin: string
  coat: string
  pattern: string
}

export const columns: ColumnDef<CatBreed>[] = [
  {
    accessorKey: "breed",
    header: "Breed",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "origin",
    header: "Origin",
  },
  {
    accessorKey: "coat",
    header: "Coat",
  },
  {
    accessorKey: "pattern",
    header: "Pattern",
  },
]

