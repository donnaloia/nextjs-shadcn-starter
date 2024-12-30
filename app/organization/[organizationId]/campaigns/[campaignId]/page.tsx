import { getTemplates } from "./actions"
import { CampaignForm } from "./campaign-form"
import { getEmailGroups } from "./actions"
import { getCampaign } from "./actions"
import { Toaster } from "@/components/ui/toaster"


export default async function CampaignPage({
  params,
}: {
  params: { organizationId: string; campaignId: string }
}) {
  const [campaign, templatesData, emailGroupsData] = await Promise.all([
    getCampaign(params.organizationId, params.campaignId),
    getTemplates(params.organizationId),
    getEmailGroups(params.organizationId)
  ])

  return (
    <>
      <CampaignForm 
        templates={templatesData.results} 
        emailGroups={emailGroupsData.results}
        organizationId={params.organizationId}
        campaignId={params.campaignId}
        campaignName={campaign.name}
        defaultTemplate={campaign.templates[0]?.id}
      />
      <Toaster />
    </>
  )
} 