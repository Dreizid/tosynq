'use client'
import FloatingActionButton from "@/app/components/FloatingActionButton"
import TaskFormDialog from "@/app/components/TaskFormDialog"
import AppCalendar from "../components/AppCalendar"
import { useCalendar } from "../context/calendar-context"
import { useState } from "react"
import { Plus } from "lucide-react"
import { DateTimePicker } from "../components/DateTimePicker"
function page() {
  const { date, view } = useCalendar()
  const [open, setOpen] = useState(false)
  return (
    <div className="h-full">
      <AppCalendar date={date} view={view} />
      <FloatingActionButton onClick={() => setOpen(true)} icon={Plus} />
      <TaskFormDialog open={open} onOpenChange={() => setOpen(false)} />
    </div>
  )
}
export default page
