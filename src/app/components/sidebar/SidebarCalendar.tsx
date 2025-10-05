"use client";
import { View } from "@/app/components/calendar/AppCalendar";
import { Calendar } from "@/components/ui/calendar";
import { SidebarGroup } from "@/components/ui/sidebar";
import { endOfWeek, startOfWeek } from "date-fns";
import { useMemo } from "react";
import { DateRange, DayPickerProps } from "react-day-picker";
import { useCalendar } from "@/app/context/calendar-context";

export default function SidebarCalendar() {
  /* TO DO:
  Add accent colors for current day in calendar 
  */
  const { date, range, setDate, setRange } = useCalendar();

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
        onDayClick={(day) => onViewClick(day)}
      />
    </SidebarGroup>
  );
}
