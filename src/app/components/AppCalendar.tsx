"use client"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Calendar, momentLocalizer, View, Views, ViewsProps } from 'react-big-calendar'
import moment from "moment"
import { useLiveQuery } from "dexie-react-hooks"
import { db } from "../lib/db/dexie"

interface AppCalendarProps {
  date: Date
  view: View
}
const localizer = momentLocalizer(moment)

export default function AppCalendar({ date, view }: AppCalendarProps) {
  const task = useLiveQuery(() => db.task.toArray())
  const events = task?.map((task) => ({
    title: task.title,
    start: task.from,
    end: task.to,
  }))
  console.log(events)
  return (
    <div className="w-full h-full">
      <Calendar
        className="[&_.rbc-header]:my-2 [&_.rbc-header]:outline-t-none h-full w-full"
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
        events={events}
        components={{
          event: (event) => <div><input type="checkbox" />{event.title}</div>
        }}
      />
    </div>
  )
}


