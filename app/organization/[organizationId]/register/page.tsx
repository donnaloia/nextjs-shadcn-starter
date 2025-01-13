import { notFound } from "next/navigation"
import { RegisterForm } from "./register-form"

type PageProps = {
  params: Promise<{ organizationId: string }>
}

async function checkOrganization(organizationId: string) {
  const response = await fetch(
    `http://localhost:8080/api/v1/organizations/${organizationId}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  return response.ok
}

export default async function RegisterPage({
  params,
}: PageProps) {
  const resolvedParams = await params
  const orgExists = await checkOrganization(resolvedParams.organizationId)
  if (!orgExists) {
    return notFound()
  }
  return (
    <div className="fixed inset-0 grid place-items-center pt-[8vh]">
      <RegisterForm organizationId={resolvedParams.organizationId} />
    </div>
  )
}