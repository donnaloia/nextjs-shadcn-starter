import { DataTable } from "./data-table"
import { columns, DataItem } from "./columns"

// Example data - replace with your actual data fetching logic
const getData = async (): Promise<DataItem[]> => {
  return [
    {
      id: "1",
      title: "Task 1",
      status: "completed",
      createdAt: "2024-01-01",
    },
    {
      id: "2",
      title: "Task 2",
      status: "pending",
      createdAt: "2024-01-02",
    },
    // Add more items as needed
  ]
}

export default async function Page() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
} 