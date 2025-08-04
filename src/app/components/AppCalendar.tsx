"use client"
import { useMemo, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { SidebarGroup, SidebarSeparator } from "@/components/ui/sidebar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DateRange, Modifiers, rangeIncludesDate, DayPickerProps } from "react-day-picker"
import { endOfWeek, startOfWeek } from "date-fns";

type RangeTypes = "single" | "weekly" | "monthly"

export default function AppCalendar() {
  /* TO DO:
  Add accent colors for current day in calendar 
  Fix corner for single selection
  */
  const [selectedWeek, setSelectedWeek] = useState<DateRange | undefined>();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [range, setRange] = useState<RangeTypes>("single")

  const modifiers = useMemo(() => {
    switch (range) {
      case "single":
        if (selectedDate) {
          return { selected: selectedDate };
        }
        break;
      case "weekly":
        return {
          selected: selectedWeek,
          range_start: selectedWeek?.from,
          range_end: selectedWeek?.to,
          range_middle: (date: Date) =>

            selectedWeek
              ? rangeIncludesDate({ from: startOfWeek(date.getDate()), to: endOfWeek(date.getDate()) }, date, true)
              : false,
        }
    }
  }, [range, selectedDate, selectedWeek])

  const onWeeklyClick = (day: Date, modifiers: Modifiers) => {
    if (modifiers.selected) {
      setSelectedWeek(undefined); // Clear the selection if the day is already selected
      return;
    }
    setSelectedWeek({
      from: startOfWeek(day),

      to: endOfWeek(day),
    });
  }

  const onDayClick = (day: Date, modifiers: Modifiers) => {
    if (modifiers.selected) {
      setSelectedDate(undefined);
    } else {
      setSelectedDate(day);
    }
  }
  return (
    <SidebarGroup >
      <Calendar
        className="[&_[role=gridcell].bg-accent]:bg-background [&_[role=gridcell].bg-accent]:text-secondary-foreground [&_[role=gridcell].bg-accent]:w-full block p-0"
        classNames={{
          selected: "[&>button]:rounded-[0]",
          range_start: "[&>button]:rounded-e-[0]",
          range_end: "[&>button]:rounded-s-[0]"
        }}
        modifiers={modifiers}
        onDayClick={(day, modifiers) => {
          switch (range) {
            case "single":
              onDayClick(day, modifiers)
              break;
            case "weekly":
              onWeeklyClick(day, modifiers)
              break;
          }
        }}
      />
      <SidebarSeparator className="my-4" />
      <Select onValueChange={(value: RangeTypes) => (setRange(value))}>
        <SelectTrigger>
          <SelectValue placeholder="Range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="single">Single</SelectItem>
          <SelectItem value="weekly">Weekly</SelectItem>
          <SelectItem value="monthly">Monthly</SelectItem>
        </SelectContent>
      </Select>
    </SidebarGroup>
  )
}

