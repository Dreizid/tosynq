"use client"
import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DateTimePickerProps {
  initialDate: Date | undefined
  onSelect: (date: Date | undefined) => void
}

const DEFAULT_TIME = "10:30:00"
function parseTimeString(time: string): [number, number, number] {
  return time.split(":").map(Number) as [number, number, number]
}
function dateToTimeString(date: Date): string {
  if (!date || isNaN(date.getTime())) return DEFAULT_TIME
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date)
function setTimeOnDate(time: string, date: Date | undefined): Date | undefined {
  if (!date) return
  const newDate = new Date(date)
  newDate.setHours(...parseTimeString(time))
  return newDate
export function DateTimePicker({ initialDate, onSelect }: DateTimePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [time, setTime] = React.useState<string>(DEFAULT_TIME)

  React.useEffect(() => {
    onSelect(setTimeOnDate(time, initialDate))
  }, [time])
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
                onSelect(setTimeOnDate(time, date as Date))
                setOpen(false)
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
          value={dateToTimeString(initialDate as Date)}
          onChange={(e) => {
            setTime(e.target.value)
          }}
          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
    </div>
  )
}
