"use client"

import { useState } from "react"
import { User, Mail, Briefcase, Globe, Pencil } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

interface ProfileEditPopoverProps {
  trigger: React.ReactNode
  username: string
  userEmail: string
  userAvatar: string
  onOpenChange?: (open: boolean) => void
}

export function ProfileEditPopover({ trigger, username, userEmail, userAvatar, onOpenChange }: ProfileEditPopoverProps) {
  const [open, setOpen] = useState(false)

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen && onOpenChange) {
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <div onClick={() => setOpen(true)}>
        {trigger}
      </div>
      <DialogContent className="w-[800px] max-w-[90vw] p-0 fixed top-[50vh] left-[50vw] -translate-x-1/2 -translate-y-1/2">
        <DialogTitle className="sr-only">Edit Profile</DialogTitle>
        <div className="space-y-4 px-12 py-8">
          <div className="flex items-center space-x-4">
            <div className="relative group cursor-pointer">
              <Avatar className="h-20 w-20">
                <AvatarImage src={userAvatar} />
                <AvatarFallback>
                  {username?.charAt(0)?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Pencil className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Edit Profile</h2>
              <p className="text-sm text-muted-foreground">Update your campaign settings</p>
            </div>
          </div>
          <Separator />
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-lg">First Name</Label>
                <div className="relative">
                  <User className="absolute left-2 top-3 h-5 w-5 text-muted-foreground" />
                  <Input id="firstName" placeholder="First Name" className="pl-9 text-lg h-12 placeholder:text-lg placeholder:text-gray-500 text-gray-500" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-lg">Last Name</Label>
                <div className="relative">
                  <User className="absolute left-2 top-3 h-5 w-5 text-muted-foreground" />
                  <Input id="lastName" placeholder="Last Name" className="pl-9 text-lg h-12 placeholder:text-lg placeholder:text-gray-500 text-gray-500" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-lg">Email</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-3 h-5 w-5 text-muted-foreground" />
                <Input 
                  id="email" 
                  type="email" 
                  defaultValue={userEmail}
                  placeholder="Enter your email address" 
                  style={{ fontSize: '1.25rem' }}
                  className="pl-12 text-2xl h-12 placeholder:text-2xl text-2xl placeholder:text-gray-500 text-gray-500" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio" className="text-lg">Campaign Signature</Label>
              <Textarea 
                id="bio" 
                placeholder="Add a signature that will appear at the bottom of your campaign emails" 
                className="min-h-[100px] text-lg placeholder:text-lg placeholder:text-gray-500 text-gray-500" 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="organization" className="text-lg">Organization</Label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-3 h-5 w-5 text-muted-foreground" />
                  <Input id="organization" placeholder="Organization Name" className="pl-12 text-lg h-12 placeholder:text-lg placeholder:text-gray-500 text-gray-500" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone" className="text-lg">Timezone</Label>
                <div className="relative">
                  <Globe className="absolute left-4 top-3 h-5 w-5 text-muted-foreground" />
                  <Input id="timezone" placeholder="UTC" className="pl-12 text-lg h-12 placeholder:text-lg placeholder:text-gray-500 text-gray-500" />
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4 pt-4">
              <Switch id="notifications" className="scale-125" />
              <Label htmlFor="notifications" className="text-lg">Receive campaign performance notifications</Label>
            </div>
          </form>
        </div>
        <div className="flex items-center justify-between px-12 py-6" style={{ backgroundColor: '#1b1b1d' }}>
          <Button variant="ghost" onClick={() => setOpen(false)} className="text-lg px-6 py-6">
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)} className="text-lg px-6 py-6">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 