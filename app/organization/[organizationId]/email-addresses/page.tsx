import { Suspense } from "react"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { TableSkeleton } from "@/components/table-skeleton"
import { getEmailAddresses, EmailAddressesResponse } from "./actions"
import { useRouter } from "next/navigation"

export default async function EmailAddressesPage({
  params,
  searchParams,
}: {
  params: { organizationId: string }
  searchParams: { page?: string }
}) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const result = await getEmailAddresses(params.organizationId, page)

  if (!result.success) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="text-red-500">
          {result.error}
        </div>
      </div>
    )
  }

  const { results, current_page, total_pages } = result.data as EmailAddressesResponse

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-[#412C72]">
          Email Addresses
        </h2>
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
        <Suspense fallback={<TableSkeleton />}>
          <DataTable 
            columns={columns} 
            data={results}
            pageCount={total_pages}
            currentPage={current_page}
          />
        </Suspense>
      </div>
    </div>
  )
} 