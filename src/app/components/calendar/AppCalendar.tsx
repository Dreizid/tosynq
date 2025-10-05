"use client";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useLiveQuery } from "dexie-react-hooks";
import { db, Task } from "../../lib/db/dexie";
import { useRef, useMemo, useLayoutEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import { CalendarApi } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import EventComponent from "@/app/components/calendar/EventComponent";
import { useCalendar } from "../../context/calendar-context";
import { TaskType, SourceType } from "@/app/lib/db/dexie";
import { useResizeObserver } from "@/app/hooks/useResizeObserver";

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

function mapTasks(task: Task[], enabled: TaskType[]) {
  return task
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
    }));
}

export default function AppCalendar({ date, range }: AppCalendarProps) {
  const { enabled } = useCalendar();
  const calendarItems = useLiveQuery(() => db.task.toArray());
  const finalTaskList = useMemo(
    () => mapTasks(calendarItems ?? [], enabled),
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
