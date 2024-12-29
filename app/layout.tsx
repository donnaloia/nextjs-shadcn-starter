import '@/app/globals.css'
import AppSidebar from '../components/shared/app-sidebar';
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "../components/theme-provider"
import { cookies } from 'next/headers'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

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
            <div className="flex h-screen">
              <aside className="w-64 border-r border-border bg-card">
                <AppSidebar />
              </aside>
              <main className="flex-1">
                {children}
              </main>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}