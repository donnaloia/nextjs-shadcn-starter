import { RegisterForm } from "./register-form"

export default async function RegisterPage({
  params,
}: {
  params: { organizationId: string }
}) {
  return (
    <div className="fixed inset-0 grid place-items-center pt-[8vh]">
      <RegisterForm organizationId={params.organizationId} />
    </div>
  )
} 