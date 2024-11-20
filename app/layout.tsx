import '@/app/globals.css'
import AppSidebar from '../components/app-sidebar';
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "../components/theme-provider"
import { cookies } from 'next/headers'

async function getIsAuthenticated() {
  const cookieStore = cookies()
  return !!cookieStore.get('token')
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isAuthenticated = await getIsAuthenticated()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
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