"use client"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { useCalendar } from "../context/calendar-context";

export default function SidebarHeader() {
  const { date } = useCalendar()
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return (
    <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator
        orientation="vertical"
        className="mr-2 data-[orientation=vertical]:h-4"
      />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>{date.toLocaleDateString("en-US", options)}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  )
}
