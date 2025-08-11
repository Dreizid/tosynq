import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/app/components/AppSidebar";
import { CalendarProvider } from "@/app/context/calendar-context";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,

} from "@/components/ui/breadcrumb"
import SidebarHeader from "../components/SidebarHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CalendarProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <SidebarHeader />
          <main>
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </CalendarProvider>
  );
}
