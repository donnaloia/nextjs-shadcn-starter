import { notFound } from "next/navigation"
import { RegisterForm } from "./register-form"


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
  params: { organizationId },
}: {
  params: { organizationId: string }
}) {
  const orgExists = await checkOrganization(organizationId)
  if (!orgExists) {
    return notFound()
  }
  return (
    <div className="fixed inset-0 grid place-items-center pt-[8vh]">
      <RegisterForm organizationId={organizationId} />
    </div>
  )
} 