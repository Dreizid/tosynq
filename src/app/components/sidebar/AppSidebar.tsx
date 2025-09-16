"use client"
import { Home, Inbox, Search, SeparatorHorizontal, Settings } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator
} from "@/components/ui/sidebar"
import { Calendar } from "@/components/ui/calendar"
import Link from "next/link"
import AppCalendar from "../calendar/AppCalendar"
import SidebarCalendar from "./SidebarCalendar"
import { Separator } from "@/components/ui/separator"
import ListSelector from "./ListSelector"

const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",

    icon: Inbox,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {

    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarCalendar />
            <ListSelector />
          </SidebarGroupContent>
        </SidebarGroup>
        <Separator orientation="horizontal" />
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link key={item.title} href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
