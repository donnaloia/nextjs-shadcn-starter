export function TableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <div className="border-b">
          {/* Header skeleton */}
          <div className="flex h-10 items-center bg-[#412C72]/5">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-4 w-[250px]">
                <div className="h-4 w-3/4 bg-[#412C72]/20 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
        {/* Rows skeleton */}
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center border-b">
            {[...Array(3)].map((_, j) => (
              <div key={j} className="p-4 w-[250px]">
                <div className="h-4 w-4/5 bg-[#412C72]/10 rounded animate-pulse" />
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* Pagination skeleton */}
      <div className="flex justify-end">
        <div className="w-[300px] h-8 bg-[#412C72]/10 rounded animate-pulse" />
      </div>
    </div>
  )
} 