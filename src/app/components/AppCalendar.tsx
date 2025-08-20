"use client"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { useLiveQuery } from "dexie-react-hooks"
import { db } from "../lib/db/dexie"
import { useRef, useEffect, useMemo } from "react"
import FullCalendar from "@fullcalendar/react"
import { CalendarApi, EventApi } from "@fullcalendar/core"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import { removeTask } from "../lib/db/dbActions"

export type View = "dayGridDay" | "dayGridWeek" | "dayGridMonth"

interface AppCalendarProps {
  date: Date
  view: View
}

export default function AppCalendar({ date, view }: AppCalendarProps) {
  const task = useLiveQuery(() => db.task.toArray())
  const events = useMemo(() => task?.map((task) => ({
    title: task.title,
    allDay: true,
    start: task.from,
    // end: task.to,
    backgroundColor: 'slate-900',
    extendedProps: {
      dbId: task.id,
      source: task.source,
      description: task.description,
      deleted: task.deleted
    }
  })), [task])
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
        events={events}
        eventClassNames="bg-slate-300 hover:!bg-slate-900"
        allDaySlot={false}
        eventContent={Event}
        height="100%"
        headerToolbar={false}
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

