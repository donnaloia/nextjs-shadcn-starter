"use client"

import {
  BadgeCheck,
  Bell,
  BookOpen,
  Bot,
  ChevronRight,
  ChevronsUpDown,
  Command,
  CreditCard,
  Folder,
  Frame,
  LifeBuoy,
  LogOut,
  Map,
  MoreHorizontal,
  PieChart,
  Send,
  Settings2,
  Share,
  Sparkles,
  SquareTerminal,
  Trash2,
  BarChart2,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { removeAccessToken } from "@/lib/auth/cookies/client"
import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ProfileEditPopover } from "@/components/shared/profile-edit-popover/index"
import { useProfile } from "@/lib/auth/utils/profile-context"
import { logout } from '@/lib/auth/actions/logout'

export default function AppSidebar() {
  const { username, email: userEmail, avatar: userAvatar, organizationName } = useProfile()
  const params = useParams()
  const organizationId = params?.organizationId as string
  const router = useRouter()
  const [profileOpen, setProfileOpen] = useState(false)

  const data = {
    user: {
      name: "donnaloia",
      email:"ben@example.com",
      avatar: "/avatars/shadcn.png",
    },
    navMain: [
      {
        title: "Campaign",
        url: `/organization/${organizationId}/campaigns`,
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: "New",
            url: `/organization/${organizationId}/campaigns?create=true`,
          },   
          {
            title: "Latest",
            url: `/organization/${organizationId}/campaigns`,
          },
          {
            title: "Scheduled",
            url: `/organization/${organizationId}/campaigns`,
          },
          {
            title: "Past",
            url: "#",
          },
        ],
      },
      {
        title: "Email Groups",
        url: `/organization/${organizationId}/email-groups`,
        icon: Bot,
        items: [
          {
            title: "Create",
            url: `/organization/${organizationId}/email-groups?create=true`,
          },
          {
            title: "View",
            url: `/organization/${organizationId}/email-groups`,
          },
        ],
      },
      {
        title: "Email Addresses",
        url: `/organization/${organizationId}/email-addresses`,
        icon: Bot,
        items: [
          {
            title: "Create",
            url: `/organization/${organizationId}/email-addresses?create=true`,
          },
          {
            title: "View",
            url: `/organization/${organizationId}/email-addresses`,
          },
        ],
      },
      {
        title: "Templates",
        url: `/organization/${organizationId}/templates`,
        icon: Bot,
        items: [
          {
            title: "Create",
            url: `/organization/${organizationId}/templates?create=true`,
          },
          {
            title: "View",
            url: `/organization/${organizationId}/templates`,
          },
        ],
      },
      {
        title: "Automations",
        url: "#",
        icon: BookOpen,
        items: [
          {
            title: "Webhooks",
            url: "#",
          },
          {
            title: "Scripts",
            url: "#",
          },

        ],
      },
    ],
    navAnalytics: [
      {
        title: "Engagement",
        url: "/",
        icon: PieChart,
      },
      {
        title: "Performance",
        url: "/",
        icon: BarChart2,
      },
    ],
    navSecondary: [
      {
        title: "Support",
        url: "#",
        icon: LifeBuoy,
      },
      {
        title: "Feedback",
        url: "#",
        icon: Send,
      },
    ],
    projects: [
      {
        name: "Design Engineering",
        url: "#",
        icon: Frame,
      },
      {
        name: "Sales & Marketing",
        url: "#",
        icon: PieChart,
      },
      {
        name: "AI Generator",
        url: "#",
        icon: Map,
      },
    ],
  }

  return (
    <SidebarProvider>
      <Sidebar variant="inset" className="min-h-screen">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <a href="/#">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left leading-tight">
                    <span className="truncate font-semibold text-base">{organizationName}</span>
                    <span className="truncate text-sm">Enterprise</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-[#412C72] text-base">Platform</SidebarGroupLabel>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <Collapsible
                  key={item.title}
                  asChild
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip={item.title} className="text-base">
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                    {item.items?.length ? (
                      <>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuAction className="data-[state=open]:rotate-90">
                            <ChevronRight />
                            <span className="sr-only">Toggle</span>
                          </SidebarMenuAction>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items?.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild className="text-base">
                                  <a href={subItem.url}>
                                    <span>{subItem.title}</span>
                                  </a>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </>
                    ) : null}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel className="text-[#412C72] text-base">Analytics</SidebarGroupLabel>
            <SidebarMenu>
              {data.navAnalytics.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="text-base">
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel className="text-[#412C72] text-base">Projects</SidebarGroupLabel>
            <SidebarMenu>
              {data.projects.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild className="text-base">
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction showOnHover>
                        <MoreHorizontal />
                        <span className="sr-only">More</span>
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-48"
                      side="bottom"
                      align="end"
                    >
                      <DropdownMenuItem>
                        <Folder className="text-muted-foreground" />
                        <span>View Project</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share className="text-muted-foreground" />
                        <span>Share Project</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Trash2 className="text-muted-foreground" />
                        <span>Delete Project</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup className="mt-auto">
            <SidebarGroupContent>
              <SidebarMenu>
                {data.navSecondary.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild size="sm" className="text-base">
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu open={profileOpen} onOpenChange={setProfileOpen}>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src={userAvatar}
                        alt={username}
                      />
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-base leading-tight">
                      <span className="truncate font-semibold">
                        {username}
                      </span>
                      <span className="truncate text-sm">
                        {userEmail}
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-base">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage
                          src={data.user.avatar}
                          alt={data.user.name}
                        />
                        <AvatarFallback className="rounded-lg">
                          CN
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-base leading-tight">
                        <span className="truncate font-semibold">
                          {username}
                        </span>
                        <span className="truncate text-sm">
                          {userEmail}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="text-base">
                      <Sparkles />
                      Upgrade to Pro
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-base">
                      <ProfileEditPopover
                        trigger={
                          <div className="flex w-full items-center">
                            <BadgeCheck className="mr-2 h-4 w-4" />
                            <span>Account</span>
                          </div>
                        }
                        username={username}
                        userEmail={userEmail}
                        userAvatar={userAvatar}
                        onOpenChange={(open) => setProfileOpen(open)}
                      />
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-base">
                      <CreditCard />
                      Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-base">
                      <Bell />
                      Notifications
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={async () => {
                    await logout()
                    router.refresh()
                  }} className="text-base">
                    <LogOut />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  )
}