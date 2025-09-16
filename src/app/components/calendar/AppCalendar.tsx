"use client";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../lib/db/dexie";
import { useRef, useEffect, useMemo, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { CalendarApi, EventApi } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import EventComponent from "@/app/components/calendar/EventComponent";
import { useCalendar } from "../../context/calendar-context";
import FormDialog from "../form/Dialog";
import EventFormDialog from "../form/FormDialogs";
import EventForm from "../form/EventForm";
import { TaskType, SourceType } from "@/app/lib/db/dexie";
import { EventImpl } from "@fullcalendar/core/internal";

export type View =
  | "dayGridDay"
  | "dayGridWeek"
  | "dayGridMonth"
  | "timeGridDay"
  | "timeGridWeek";

interface AppCalendarProps {
  date: Date;
  range: View;
}

export type EventExtendedProps = {
  dbid: number;
  type: TaskType;
  source: SourceType;
  description: string;
  deleted: boolean;
};

export default function AppCalendar({ date, range }: AppCalendarProps) {
  const { enabled } = useCalendar();
  const [editModal, setEditModal] = useState(false);
  const taskList = useLiveQuery(() => db.task.toArray());
  const task = useMemo(
    () =>
      (taskList ?? [])
        .filter((task) => task.type === "task")
        .map((task) => ({
          title: task.title,
          start: task.from,
          end: task.to,
          allDay: task.allDay,
          backgroundColor: "#c6d2ff",
          textColor: "black",
          extendedProps: {
            dbId: task.id,
            type: task.type,
            source: task.source,
            description: task.description,
            deleted: task.deleted,
          },
        })),
    [taskList],
  );

  const events = useMemo(
    () =>
      (taskList ?? [])
        .filter((task) => task.type === "event")
        .map((task) => ({
          title: task.title,
          start: task.from,
          end: task.to,
          allDay: task.allDay,
          backgroundColor: "#D7C6FF",
          textColor: "black",
          extendedProps: {
            dbId: task.id,
            type: task.type,
            source: task.source,
            description: task.description,
            deleted: task.deleted,
          },
        })),
    [taskList],
  );

  const finalTaskList = [
    ...(enabled.includes("events") ? events : []),
    ...(enabled.includes("task") ? task : []),
  ];

  const calendarRef = useRef<FullCalendar | null>(null);

  useEffect(() => {
    const calendarApi: CalendarApi | undefined = calendarRef.current?.getApi();
    if (calendarApi) {
      setTimeout(() => {
        calendarApi.gotoDate(date);
        calendarApi.changeView(range);
      }, 0);
    }
  }, [date, range]);
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
    <div className="h-full calendar-wrapper" ref={containerRef}>
      <FullCalendar
        eventColor="transparent"
        eventDisplay="block"
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin]}
        events={finalTaskList}
        eventContent={(arg) => <EventComponent event={arg.event} />}
        allDaySlot={true}
        height="100%"
        headerToolbar={false}
        views={{
          dayGridWeek: {
            dayHeaderContent: (arg) => {
              return {
                html: `
									<div class="fc-custom-header">
										<div style="font-weight: normal">${arg.date.toLocaleDateString("en-US", { weekday: "short" })}</div>
										<div class="date">${arg.date.getDate()}</div>
									</div>
								`,
              };
            },
          },
        }}
      />
    </div>
  );
}
