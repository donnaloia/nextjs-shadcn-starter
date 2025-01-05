import { getTemplates } from "./actions"
import { CampaignForm } from "./campaign-form"
import { getEmailGroups } from "./actions"
import { getCampaign } from "./actions"
import { Toaster } from "@/components/ui/toaster"

async function getPageData(organizationId: string, campaignId: string) {
  return await Promise.all([
    getCampaign(organizationId, campaignId),
    getTemplates(organizationId),
    getEmailGroups(organizationId)
  ])
}

export default async function CampaignPage({
  params,
}: {
  params: Promise<{ organizationId: string; campaignId: string }>
}) {
  try {
    const { organizationId, campaignId } = await params

    const [campaign, templatesData, emailGroupsData] = await getPageData(
      organizationId,
      campaignId
    )

    const defaultTemplateId = campaign?.templates?.[0]?.id || ""

    return (
      <div className="pt-8 pl-8">
        <CampaignForm 
          templates={templatesData.results} 
          emailGroups={emailGroupsData.results}
          organizationId={organizationId}
          campaignId={campaignId}
          campaignName={campaign.name}
          defaultTemplate={defaultTemplateId}
          defaultEmailGroups={campaign.email_groups}
        />
        <Toaster />
      </div>
    )
  } catch (error) {
    console.error('Error loading campaign page:', error)
    throw error
  }
} 