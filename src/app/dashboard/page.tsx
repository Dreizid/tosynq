'use client'
import FloatingActionButton from "@/app/components/FloatingActionButton"
import TaskFormDialog from "@/app/components/TaskFormDialog"
import AppCalendar from "../components/AppCalendar"
import { useCalendar } from "../context/calendar-context"
import { useState } from "react"
function page() {
  const { date, view } = useCalendar()
  const [open, setOpen] = useState(false)
  return (
    <div className="h-full">
      <AppCalendar date={date} view={view} />
      <FloatingActionButton onClick={() => setOpen(true)} />
      <TaskFormDialog open={open} onOpenChange={() => setOpen(false)} />
    </div>
  )
}
export default page
