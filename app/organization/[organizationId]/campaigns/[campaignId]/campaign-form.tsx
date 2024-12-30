"use client"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectGroup,SelectLabel,  SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import DOMPurify from 'isomorphic-dompurify'
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { updateCampaign } from "./actions"
import { useToast } from "@/hooks/use-toast"

type Template = {
  id: string
  organization_id: string
  name: string
  html: string
  created_at: string
}

type EmailGroup = {
  id: string
  name: string
  organization_id: string
  created_at: string
}

export function CampaignForm({ 
  templates, 
  emailGroups = [],
  campaignName = "New Campaign",
  organizationId,
  campaignId,
  defaultTemplate = ""
}: { 
  templates: Template[]
  emailGroups: EmailGroup[]
  campaignName?: string
  organizationId: string
  campaignId: string
  defaultTemplate?: string
}) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>(defaultTemplate)
  const [selectedGroups, setSelectedGroups] = useState<string[]>([])
  const [name, setName] = useState(campaignName)
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date>()
  const { toast } = useToast()

  useEffect(() => {
    setSelectedTemplate(defaultTemplate)
  }, [defaultTemplate])

  const selectedTemplateHtml = templates.find(t => t.id === selectedTemplate)?.html || ""
  
  const sanitizedHtml = DOMPurify.sanitize(selectedTemplateHtml)

  const handleSave = async () => {
    try {
      await updateCampaign(organizationId, campaignId, {
        name: name,
        templates: [selectedTemplate],
        email_groups: selectedGroups,
        scheduled_at: date ? date.toISOString() : null
      })
      
      toast({
        title: "Campaign saved",
        description: "Your changes have been saved successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save campaign changes.",
        variant: "destructive",
      })
    }
  }

  // Find the template name for initial render
  const defaultTemplateName = templates.find(t => t.id === defaultTemplate)?.name || "Choose a template"

  return (
    <div className="max-w-[2400px] mx-auto p-6">
      <div className="mt-8 pl-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">{name}</h1>
        </div>

        <div className="grid grid-cols-20 gap-6">
          {/* Left column */}
          <div className="col-span-4">
            <Card className="h-[calc(90vh-12rem)] flex flex-col">
              <CardHeader>
                <CardTitle>Campaign Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 flex-grow">
                <div className="space-y-6 h-full flex flex-col">
                  <div className="space-y-6 flex-grow">
                    <div>
                      <h2 className="text-lg font-medium mb-2">Campaign Name</h2>
                      <Input 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter campaign name"
                      />
                    </div>

                    <div>
                      <h2 className="text-lg font-medium mb-4">Select Template</h2>
                      <Select defaultValue={defaultTemplate} value={selectedTemplate} onValueChange={setSelectedTemplate}>
                        <SelectTrigger>
                          <SelectValue placeholder={templates.find(t => t.id === selectedTemplate)?.name || "Choose a template"}>
                            {templates.find(t => t.id === selectedTemplate)?.name}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {templates.map((template) => (
                            <SelectItem key={template.id} value={template.id}>
                              {template.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <h2 className="text-lg font-medium mb-4">Email Groups</h2>
                      <div className="border rounded-md">
                        <Button
                          variant="ghost"
                          role="combobox"
                          aria-expanded={open}
                          className="w-full justify-between"
                          onClick={() => setOpen(!open)}
                        >
                          {selectedGroups.length === 0
                            ? "Select email groups"
                            : `${selectedGroups.length} groups selected`}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                        {open && (
                          <div className="p-4 space-y-4">
                            {emailGroups.map((group) => (
                              <div key={group.id} className="flex items-center space-x-2">
                                <Checkbox
                                  id={group.id}
                                  checked={selectedGroups.includes(group.id)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setSelectedGroups([...selectedGroups, group.id])
                                    } else {
                                      setSelectedGroups(selectedGroups.filter(id => id !== group.id))
                                    }
                                  }}
                                />
                                <label
                                  htmlFor={group.id}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {group.name}
                                </label>
                              </div>
                            ))}
                          </div>
                        )}

                      </div>
                    </div>

                    <div>
                      <h2 className="text-lg font-medium mb-4">Runs at</h2>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : "Schedule Campaign"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <Button variant="destructive" className="w-full" onClick={handleSave}>
                    Run Campaign
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column */}
          <div className="col-span-16 col-start-5">
            <div className="flex gap-6">

              {/* Right column - takes remaining space */}
              <div className="flex-grow w-[1400px]">
                <Card className="h-[calc(90vh-12rem)]">
                  <CardHeader>
                    <CardTitle>Template Preview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedTemplate ? (
                      <div 
                        className="h-[calc(90vh-22rem)] border rounded-lg p-4 overflow-auto"
                        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
                      />
                    ) : (
                      <div className="h-[calc(90vh-22rem)] border rounded-lg p-4 flex items-center justify-center text-gray-500">
                        Select a template to preview
                      </div>
                    )}
                    <div className="flex justify-end">
                      <Button onClick={handleSave}>Save Campaign</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 