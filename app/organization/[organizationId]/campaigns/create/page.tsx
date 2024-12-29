import { use } from 'react'
import { createCampaign } from './actions'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function CreateCampaignPage({
  params,
}: {
  params: Promise<{ organizationId: string }>
}) {
  const { organizationId } = use(params)

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <Card className="w-full max-w-[600px] mx-auto">
        <CardHeader>
          <CardTitle>Create Campaign</CardTitle>
          <CardDescription>Enter a name for your new campaign.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createCampaign.bind(null, organizationId)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input
                  name="name"
                  placeholder="Campaign name"
                  required
                />
              </div>
              <Button type="submit">Create Campaign</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 