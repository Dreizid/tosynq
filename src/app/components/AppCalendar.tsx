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
    <div className="bg-slate-900 w-full h-full">
      <Calendar
        className="[&_.rbc-header]:my-2 h-full w-full"
        style={{ height: "100%" }}
        date={date}
        view={view}
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        showMultiDayTimes
        toolbar={false}
        step={60}
        timeslots={1}
      />
    </div>
  )
}


