"use client"
import Sidebar from "./components/Sidebar"
import { usePathname } from "next/navigation"

function page() {
  return (
    <div className="flex flex-row">
      <Sidebar
        categories={[
          {
            title: "Calendar",
            links: [{
              label: "Today",
              href: "/"
            }]
          }
        ]}
        currentPath={usePathname()}
      />
      <div>
      </div>
    </div>
  )
}
export default page
