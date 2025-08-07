'use client'
import AppCalendar from "../components/AppCalendar"
import { useCalendar } from "../context/calendar-context"
function page() {
  const { date, view, setDate, setView } = useCalendar()
  return (
    <div className="flex flex-row">
      <AppCalendar date={date} view={view} />
    </div>
  )
}
export default page
