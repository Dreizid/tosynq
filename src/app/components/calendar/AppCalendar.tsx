"use client";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../lib/db/dexie";
import { useRef, useEffect, useMemo, useState, useLayoutEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import { CalendarApi } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import EventComponent from "@/app/components/calendar/EventComponent";
import { useCalendar } from "../../context/calendar-context";
import { TaskType, SourceType } from "@/app/lib/db/dexie";

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
  dbId: number;
  type: TaskType;
  source: SourceType;
  description: string;
  deleted: boolean;
};

// Subject to testing
/**
 * A custom hook that fire's the `callback` when the `ref` changes.
 *
 * @param ref - A React ref object to watch.
 * @param callback - A function to call whenever the `ref.current` value changes.
 */
function useResizeObserver<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  callback: () => void,
) {
  useEffect(() => {
    if (!ref.current) return;
    const resizeObserver = new ResizeObserver(callback);
    resizeObserver.observe(ref.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, [ref, callback]);
}

export default function AppCalendar({ date, range }: AppCalendarProps) {
  const { enabled } = useCalendar();
  const calendarItems = useLiveQuery(() => db.task.toArray());
  const finalTaskList = useMemo(
    () =>
      (calendarItems ?? [])
        .filter((item) => enabled.includes(item.type))
        .map((item) => ({
          title: item.title,
          start: item.from,
          end: item.to,
          allDay: item.allDay,
          backgroundColor: "#D7C6FF",
          textColor: "black",
          extendedProps: {
            dbId: item.id,
            type: item.type,
            source: item.source,
            description: item.description,
            deleted: item.deleted,
          },
        })),
    [calendarItems, enabled],
  );

  const calendarRef = useRef<FullCalendar | null>(null);

  useLayoutEffect(() => {
    const calendarApi: CalendarApi | undefined = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.gotoDate(date);
      calendarApi.changeView(range);
    }
  }, [date, range]);
  const containerRef = useRef<HTMLDivElement>(null);

  useResizeObserver(containerRef, () =>
    calendarRef.current?.getApi().updateSize(),
  );

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
            dayHeaderContent: (arg) => (
              <div className="fc-custom-header">
                <div className="font-normal">
                  {arg.date.toLocaleDateString("en-US", { weekday: "short" })}
                </div>
                <div className="date">{arg.date.getDate()}</div>
              </div>
            ),
          },
        }}
      />
    </div>
  );
}
