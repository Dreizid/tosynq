"use client"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Calendar, momentLocalizer, View, Views, ViewsProps } from 'react-big-calendar'
import moment from "moment"

interface AppCalendarProps {
  date: Date
  view: View
}
const localizer = momentLocalizer(moment)

export default function AppCalendar({ date, view }: AppCalendarProps) {
  return (
    <div className="h-[60vh] w-[60vw]">
      <Calendar
        date={date}
        view={view}
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        showMultiDayTimes
        toolbar={false}
      />
    </div>
  )
}


