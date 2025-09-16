'use client'
import { createContext, useState, useContext } from "react";
import { View } from "@/app/components/AppCalendar";

type CalendarContextType = {
  range: View
  date: Date
  enabled: Source[]
  setRange: (view: View) => void
  setDate: (date: Date) => void
  toggleSource: (src: Source) => void
}

type Source = "events" | "task"
const CalendarContext = createContext<CalendarContextType | null>(null)

export const useCalendar = () => {
  const ctx = useContext(CalendarContext)
  if (!ctx) throw new Error('useCalendar must be used within CalendarProvider')
  return ctx
}

export const CalendarProvider = ({ children }: { children: React.ReactNode }) => {
  const [range, setRange] = useState<View>("dayGridDay")
  const [date, setDate] = useState<Date>(new Date())
  const [enabled, setEnabled] = useState<Source[]>(["events", "task"])

  const toggleSource = (src: Source) => {
    setEnabled(prev =>
      prev.includes(src) ? prev.filter(s => s !== src) : [...prev, src]
    )
  }
  return (
    <CalendarContext.Provider value={{ range, date, enabled, setRange, setDate, toggleSource }}>
      {children}
    </CalendarContext.Provider>
  )

}
