"use client";
import { View } from "@/app/components/calendar/AppCalendar";
import { Calendar } from "@/components/ui/calendar";
import { SidebarGroup } from "@/components/ui/sidebar";
import { endOfWeek, startOfWeek } from "date-fns";
import { useMemo, useState } from "react";
import { DateRange, DayPickerProps } from "react-day-picker";
import { useCalendar } from "@/app/context/calendar-context";

/**
 * Returns a Date object representing the last day of the given month.
 * @param month - A Date object for the last day of the mmonth
 */
function getLastDayOfMonth(month: Date): Date {
  const lastDay = new Date(month.getFullYear(), month.getMonth() + 1, 0);
  return lastDay;
}
export default function SidebarCalendar() {
  /* TO DO:
  Add accent colors for current day in calendar 
  */
  const { date, range, setDate, setRange } = useCalendar();
  const [intendedDate, setIntendedDate] = useState<number>(date.getDate());

  const modifiers = useMemo(() => {
    switch (range) {
      case "dayGridDay":
        return {
          selected: date,
        };
      case "dayGridWeek":
        const selectedWeek: DateRange = {
          from: startOfWeek(date),
          to: endOfWeek(date),
        };
        return {
          selected: selectedWeek,
          range_start: selectedWeek?.from,
          range_end: selectedWeek?.to,
        };
      case "dayGridMonth":
        return {};
      default:
        return {};
    }
  }, [range, date]);

  const classNameMap: Record<View, DayPickerProps["classNames"]> = {
    dayGridMonth: {
      selected: "outline-none",
    },
    dayGridWeek: {
      selected: "[&>button]:rounded-[0]",
      range_start: "[&>button]:rounded-e-[0]",
      range_end: "[&>button]:rounded-s-[0]",
    },
    dayGridDay: {
      selected: "outline-none",
    },
    timeGridDay: {},
    timeGridWeek: {},
  };

  const onViewClick = (clickedDate: Date) => {
    setDate(clickedDate);
  };

  return (
    <SidebarGroup>
      <Calendar
        className="[&_[role=gridcell].bg-accent]:bg-background [&_[role=gridcell].bg-accent]:text-secondary-foreground [&_[role=gridcell].bg-accent]:w-full block p-0 bg-sidebar-background [&_[role=gridcell]>button]:outline-none [&_[role=gridcell]>button]:ring-0"
        classNames={classNameMap[range]}
        modifiers={modifiers}
        onDayClick={(day) => {
          setIntendedDate(day.getDate());
          onViewClick(day);
        }}
        onMonthChange={(month) => {
          const newDate = new Date(
            month.getFullYear(),
            month.getMonth(),
            Math.min(getLastDayOfMonth(month).getDate(), intendedDate),
          );
          onViewClick(newDate);
        }}
      />
    </SidebarGroup>
  );
}
