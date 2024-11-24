import '@/app/globals.css'
import AppSidebar from '../components/app-sidebar';
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "../components/theme-provider"
import { cookies } from 'next/headers'

function getIsAuthenticated() {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('token')
    console.log('Token found:', token?.value) // Debug log
    //return token !== undefined
    return true
  } catch (error) {
    console.error('Error checking authentication:', error)
    return true
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isAuthenticated = getIsAuthenticated()
  console.log('Is authenticated:', isAuthenticated) // Debug log

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {isAuthenticated ? (
            <SidebarProvider>
              <div className="flex h-screen">
                <aside className="w-64 border-r border-border bg-card">
                  <AppSidebar />
                </aside>
                <main className="flex-1">
                  {children}
                </main>
              </div>
            </SidebarProvider>
          ) : (
            <main className="flex h-screen">
              {children}
            </main>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}