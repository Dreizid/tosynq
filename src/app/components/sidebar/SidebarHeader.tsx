"use client";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { useCalendar } from "@/app/context/calendar-context";
import ViewSelector from "@/app/components/sidebar/ViewSelector";

export default function SidebarHeader({}) {
  const { date } = useCalendar();
  const options = {
    year: "numeric",
    month: "long",
  };
  return (
    <header className="bg-background sticky top-0 z-10 flex h-16 shrink-0 mt-2 items-center gap-2 px-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage className="text-2xl mx-2 font-bold">
              {date.toLocaleDateString("en-US", options)}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex h-full items-center ml-auto">
        <ViewSelector />
      </div>
    </header>
  );
}
