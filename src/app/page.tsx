"use client"
import Sidebar from "./components/Sidebar"
import { usePathname } from "next/navigation"
import TestSidebar from "./components/TestSidebar"
import { CalendarCheck2, Inbox } from "lucide-react"

function page() {
  const items = [
    {
      icon: CalendarCheck2,
      label: "Calendar",
      onClick: () => { console.log("SUCSESS") },
    },
    {
      icon: Inbox,
      label: "Inbox",
      onClick: () => { console.log("INBOX") }
    }
  ]
  return (
    <div className="flex flex-row">
      <TestSidebar items={items} />
      <div>
      </div>
    </div>
  )
}
export default page
