"use client"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { useLiveQuery } from "dexie-react-hooks"
import { db } from "../lib/db/dexie"
import { useRef, useEffect, useMemo, useState } from "react"
import FullCalendar from "@fullcalendar/react"
import { CalendarApi, EventApi } from "@fullcalendar/core"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"

export type View = "dayGridDay" | "dayGridWeek" | "dayGridMonth"

interface AppCalendarProps {
  date: Date
  view: View
}

export default function AppCalendar({ date, view }: AppCalendarProps) {
  const [list, setList] = useState()
  const taskList = useLiveQuery(() => db.task.toArray())
  const task = useMemo(() => taskList?.filter(task => task.type === "task").map((task) => ({
    title: task.title,
    start: task.from,
    end: task.to,
    backgroundcolor: 'slate-900',
    allDay: task.allDay,
    extendedProps: {
      dbid: task.id,
      type: task.type,
      source: task.source,
      description: task.description,
      deleted: task.deleted
    }
  })), [taskList])

  const events = useMemo(() => taskList?.filter(task => task.type === "event").map((task) => ({
    title: task.title,
    start: task.from,
    end: task.to,
    backgroundColor: 'slate-900',
    allDay: task.allDay,
    extendedProps: {
      dbid: task.id,
      type: task.type,
      source: task.source,
      description: task.description,
      deleted: task.deleted
    }
  })), [taskList])


  const calendarRef = useRef<FullCalendar | null>(null);

  useEffect(() => {
    const calendarApi: CalendarApi | undefined = calendarRef.current?.getApi();
    if (calendarApi) {
      setTimeout(() => {
        calendarApi.gotoDate(date);
        calendarApi.changeView(view);
      }, 0)
    }
  }, [date, view]);
  const containerRef = useRef(null);

  useEffect(() => {
    const calendarApi = calendarRef.current?.getApi();

    const resizeObserver = new ResizeObserver(() => {
      calendarApi?.updateSize();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }

    };
  }, []);

  return (
    <div className="h-full" ref={containerRef}>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView={view}
        events={[...(task || []), ...(events || [])]}
        eventClassNames="bg-slate-300 hover:!bg-slate-900"
        allDaySlot={false}
        eventContent={Event}
        height="100%"
        headerToolbar={false}
        eventClick={(event) => console.log(event.event.start)}
      />
    </div>
  );
};

function Event({ timeText, event }: { timeText: string, event: EventApi }) {
  return (
    <div className="">
      <h1 className="">
        {event.title} - {timeText}
      </h1>
    </div>
  )
}

