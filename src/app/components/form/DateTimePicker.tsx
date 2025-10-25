"use client";
import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Calendar as CalendarIcon, Clock } from "lucide-react";

/**
 * Properties for DateTimePicker
 */
interface DateTimePickerProps {
  /** The initial date object to set on the calendar, passing undefined will show `Select a date` instead. */
  initialDate: Date | undefined;
  /** The callback to update the initial date object. */
  onSelect: (date: Date | undefined) => void;
  /** The label to display above the calendar drop down. */
  label: string;
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
export function DateTimePicker({
  initialDate,
  onSelect,
  label,
}: DateTimePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-2">
      <Label className="w-auto inline pointer-events-none select-none">
        {label}
      </Label>
      <Popover open={open} onOpenChange={setOpen} modal={true}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="justify-between font-normal">
            <div className="flex items-center">
              <CalendarIcon className="mr-1 text-muted-foreground" />
              {initialDate ? initialDate.toLocaleString() : "Select date"}
            </div>
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="center">
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
            footer={
              <TimeInput
                initialDate={initialDate}
                onSelect={onSelect}
                label=""
              />
            }
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

function TimeInput({ initialDate, onSelect, label }: DateTimePickerProps) {
  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="time-picker" className="px-1">
        {label}
      </Label>
      <InputGroup>
        <InputGroupAddon>
          <Clock />
        </InputGroupAddon>
        <InputGroupInput
          type="time"
          id="time-picker"
          step="1"
          value={dateToTimeString(initialDate)}
          onChange={(e) => {
            onSelect(setTimeOnDate(e.target.value, initialDate));
          }}
        />
      </InputGroup>
    </div>
  );
}
