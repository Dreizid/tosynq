'use client'
import FloatingActionButton from "@/app/components/FloatingActionButton"
import TaskFormDialog from "@/app/components/EventFormDialog"
import AppCalendar from "../components/AppCalendar"
import { useCalendar } from "../context/calendar-context"
import { useState } from "react"
import { Plus } from "lucide-react"
function page() {
  const { date, range } = useCalendar()
  const [open, setOpen] = useState(false)
  return (
    <div className="h-full p-4">
      <AppCalendar date={date} range={range} />
      <FloatingActionButton onClick={() => setOpen(true)} icon={Plus} />
      <TaskFormDialog open={open} onOpenChange={() => setOpen(false)} />
    </div>
  )
}
export default page
