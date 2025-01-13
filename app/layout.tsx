import '@/app/globals.css'
import AppSidebar from '../components/shared/app-sidebar';
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "../components/theme-provider"
import { cookies } from 'next/headers'
import { Toaster } from "@/components/ui/toaster"
import { ProfileProvider } from '@/lib/profile-context'


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const profileData = {
    username: cookieStore.get('profile-username')?.value || '',
    email: cookieStore.get('profile-email')?.value || '',
    avatar: cookieStore.get('profile-picture')?.value || '',
    organizationName: cookieStore.get('organization-name')?.value || ''
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <ProfileProvider value={profileData}>
              <div className="flex h-screen">
                <aside className="w-64 border-r border-border bg-card">
                  <AppSidebar />
                </aside>
                <main className="flex-1">
                  {children}
                </main>
              </div>
              <Toaster />
            </ProfileProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}