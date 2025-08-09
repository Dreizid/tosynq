"use client"
import { useMemo, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { SidebarGroup, SidebarSeparator } from "@/components/ui/sidebar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DateRange, Modifiers, rangeIncludesDate, DayPickerProps, Matcher } from "react-day-picker"
import { endOfWeek, startOfWeek } from "date-fns";
import { useCalendar } from "../context/calendar-context";
import { View } from "react-big-calendar";

export default function SidebarCalendar() {
  /* TO DO:
  Add accent colors for current day in calendar 
  */
  const [selectedWeek, setSelectedWeek] = useState<DateRange | undefined>();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedMonth, setSelectedMonth] = useState<Date | undefined>()

  const { date, view, setDate, setView } = useCalendar()

  const modifiers = useMemo(() => {
    switch (view) {
      case "day":
        if (selectedDate) {
          return {
            selected: selectedDate,
          };
        }
        break;
      case "week":
        return {
          selected: selectedWeek,
          range_start: selectedWeek?.from,
          range_end: selectedWeek?.to,
          range_middle: (day: Date) =>
            selectedWeek
              ? rangeIncludesDate(selectedWeek, day, true)
              : false,
        };
      case "month":
        return {
        };
      case "work_week":
        return {
        };
      case "agenda":
        return {
        };
      default:
        return {
        };
    }
  }, [view, selectedDate, selectedWeek, selectedMonth]);

  const classNameMap: Record<View, DayPickerProps["classNames"]> = {
    "month": {},
    "week": {
      selected: "[&>button]:rounded-[0]",
      range_start: "[&>button]:rounded-e-[0]",
      range_end: "[&>button]:rounded-s-[0]",
    },
    "work_week": {},
    "day": {},
    "agenda": {}
  }

  const onViewClick = <T extends Date | DateRange>(
    view: View,
    clickedDate: Date,
    modifiers: Modifiers,
    setter: (value: T | undefined) => void,
    newDate: () => T
  ) => {
    setView(view)
    setDate(clickedDate)
    if (modifiers.selected) {
      setter(undefined)
    } else {
      setter(newDate())
    }
  }

  const viewMap: Record<View, (day: Date, modifiers: Modifiers) => void> = {
    "month": (day, modifiers) => onViewClick("month", day, modifiers, setSelectedMonth, () => day),
    "week": (day, modifiers) => onViewClick("week", day, modifiers, setSelectedWeek, () => ({
      from: startOfWeek(day),
      to: endOfWeek(day)
    })),
    "work_week": (day, modifiers) => onViewClick("work_week", day, modifiers, setSelectedMonth, () => day),
    "day": (day, modifiers) => onViewClick("day", day, modifiers, setSelectedDate, () => day),
    "agenda": (day, modifiers) => onViewClick("agenda", day, modifiers, setSelectedMonth, () => day),
  }


  return (
    <SidebarGroup >
      <Calendar
        className="[&_[role=gridcell].bg-accent]:bg-background [&_[role=gridcell].bg-accent]:text-secondary-foreground [&_[role=gridcell].bg-accent]:w-full block p-0 bg-sidebar-primary-foreground"
        classNames={classNameMap[view]}
        modifiers={modifiers}
        onDayClick={(day, modifiers) => viewMap[view](day, modifiers)}
      />
      <SidebarSeparator className="my-4" />
      <Select onValueChange={(value: View) => {
        setView(value)
      }}
        defaultValue="day">
        <SelectTrigger>
          <SelectValue placeholder="Single" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="day">Single</SelectItem>
          <SelectItem value="week">Weekly</SelectItem>
          <SelectItem value="month">Monthly</SelectItem>
        </SelectContent>
      </Select>
    </SidebarGroup >
  )
}

