"use client"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from "moment"

const localizer = momentLocalizer(moment)

export default function AppCalendar(props: {}) {
  const events = [
    {
      start: new Date(),
      end: new Date(),
      title: "Sample Event",
    },
  ];
  return (
    <div className="h-full">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  )
}


