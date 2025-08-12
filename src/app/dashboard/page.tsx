'use client'
import AppCalendar from "../components/AppCalendar"
import { useCalendar } from "../context/calendar-context"
function page() {
  const { date, view } = useCalendar()
  return (
    <div className="h-full">
      <AppCalendar date={date} view={view} />
    </div>
  )
}
export default page
