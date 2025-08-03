"use client"
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { SidebarGroup, SidebarSeparator } from "@/components/ui/sidebar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DateRange, rangeIncludesDate } from "react-day-picker"
import { endOfWeek, startOfWeek } from "date-fns";

export default function AppCalendar() {
  const [selectedWeek, setSelectedWeek] = useState<DateRange | undefined>();
  const defaultRange = "single"
  const [range, setRange] = useState(defaultRange)
  console.log(range)
  return (
    <SidebarGroup>
      <Calendar
        className="[&_[role=gridcell].bg-accent]:bg-sidebar-primary [&_[role=gridcell].bg-accent]:text-sidebar-primary-foreground w-full"
        modifiers={{
          selected: selectedWeek,
          range_start: selectedWeek?.from,
          range_end: selectedWeek?.to,
          range_middle: (date: Date) =>

            selectedWeek
              ? rangeIncludesDate({ from: startOfWeek(date.getDate()), to: endOfWeek(date.getDate()) }, date, true)
              : false,
        }}
        onDayClick={(day, modifiers) => {
          if (modifiers.selected) {
            setSelectedWeek(undefined); // Clear the selection if the day is already selected
            return;
          }
          setSelectedWeek({
            from: startOfWeek(day),

            to: endOfWeek(day),
          });
        }}
        footer={
          selectedWeek &&
          `Week from ${selectedWeek?.from?.toLocaleDateString()} to ${selectedWeek?.to?.toLocaleDateString()}`
        }
      />
      <SidebarSeparator className="my-4" />
      <Select onValueChange={(value) => (setRange(value))}>
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

