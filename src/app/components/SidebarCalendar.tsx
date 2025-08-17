"use client"
import { useMemo } from "react";
import { Calendar } from "@/components/ui/calendar";
import { SidebarGroup, SidebarSeparator } from "@/components/ui/sidebar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DateRange, Modifiers, rangeIncludesDate, DayPickerProps } from "react-day-picker"
import { endOfWeek, startOfWeek } from "date-fns";
import { useCalendar } from "../context/calendar-context";
import { View } from "@/app/components/AppCalendar";

export default function SidebarCalendar() {
  /* TO DO:
  Add accent colors for current day in calendar 
  */
  const { date, view, setDate, setView } = useCalendar()

  const modifiers = useMemo(() => {
    switch (view) {
      case "dayGridDay":
        return {
          selected: date,
        }
      case "dayGridWeek":
        const selectedWeek: DateRange = { from: startOfWeek(date), to: endOfWeek(date) }
        return {
          selected: selectedWeek,
          range_start: selectedWeek?.from,
          range_end: selectedWeek?.to,
        };
      case "dayGridMonth":
        return {
        };
      default:
        return {
        };
    }
  }, [view, date]);

  const classNameMap: Record<View, DayPickerProps["classNames"]> = {
    "dayGridMonth": {
      selected: "outline-none"
    },
    "dayGridWeek": {
      selected: "[&>button]:rounded-[0]",
      range_start: "[&>button]:rounded-e-[0]",
      range_end: "[&>button]:rounded-s-[0]",
    },
    "dayGridDay": {

      selected: "outline-none"
    },
  }

  const onViewClick = (
    clickedDate: Date,
  ) => {
    setDate(clickedDate)
  }

  return (
    <SidebarGroup >
      <Calendar
        className="[&_[role=gridcell].bg-accent]:bg-background [&_[role=gridcell].bg-accent]:text-secondary-foreground [&_[role=gridcell].bg-accent]:w-full block p-0 bg-sidebar-background [&_[role=gridcell]>button]:outline-none [&_[role=gridcell]>button]:ring-0"
        classNames={classNameMap[view]}
        modifiers={modifiers}
        onDayClick={(day) => onViewClick(day)}
      />
      <SidebarSeparator className="my-4" />
      <Select onValueChange={(value: View) => {
        setView(value)
      }}
        defaultValue={view}>
        <SelectTrigger>
          <SelectValue placeholder="Single" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="dayGridDay">Date</SelectItem>
          <SelectItem value="dayGridWeek">Weekly</SelectItem>
          <SelectItem value="dayGridMonth">Monthly</SelectItem>
        </SelectContent>
      </Select>
    </SidebarGroup >
  )
}

