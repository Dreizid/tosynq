"use client";
import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

/**
 * Properties for DateTimePicker
 */
interface DateTimePickerProps {
  /** The initial date object to set on the calendar, passing undefined will show `Select a date` instead. */
  initialDate: Date | undefined;
  /** The callback to update the initial date object. */
  onSelect: (date: Date | undefined) => void;
}

const DEFAULT_TIME = "10:30:00";
/**
 * Parse a time string in "HH:mm:ss" format into [hour, minute, second].
 * Assumes 24-hour format with zero-padded values.
 * Does not support "HH:mm" or 12-hour formats.
 * @param `time` - String in 24-hour format, zero-padded.
 * @return Tuple [hour, minute, second].
 */
function parseTimeString(time: string): [number, number, number] {
  return time.split(":").map(Number) as [number, number, number];
}

/**
 * Safely extract the time string from a `Date` object.
 * @param `date` - Date object to extract the time from.
 * @return string - Time string formatted in "HH:mm"
 */
function dateToTimeString(date: Date | undefined): string {
  if (!date || isNaN(date.getTime())) return DEFAULT_TIME;
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

/**
 * Safely sets the time on the given Date object.
 * @param time - String representation of time in "HH:mm:ss" format.
 * @param date - Date | undefined object where to set the time.
 * @return Date - Date with the time set.
 * @return undefined - Returns undefined when the date given is undefined.
 */
function setTimeOnDate(time: string, date: Date | undefined): Date | undefined {
  if (!date) {
    const newDate = new Date();
    newDate.setHours(...parseTimeString(time));
    return newDate;
  }
  const newDate = new Date(date);
  newDate.setHours(...parseTimeString(time));
  return newDate;
}

/**
 * DateTimePicker
 *
 * Provides a component that has a calendar modal and a time picker.
 */
export function DateTimePicker({ initialDate, onSelect }: DateTimePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-3">
        <Label htmlFor="date-picker" className="px-1">
          Date
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker"
              className="w-32 justify-between font-normal"
            >
              {initialDate ? initialDate.toLocaleDateString() : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={initialDate}
              captionLayout="dropdown"
              onSelect={(date) => {
                onSelect(
                  setTimeOnDate(dateToTimeString(initialDate), date as Date),
                );
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="time-picker" className="px-1">
          Time
        </Label>
        <Input
          type="time"
          id="time-picker"
          step="1"
          value={dateToTimeString(initialDate)}
          onChange={(e) => {
            onSelect(setTimeOnDate(e.target.value, initialDate));
          }}
          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
    </div>
  );
}
