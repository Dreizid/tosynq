'use client'
import { createContext, useState, useContext } from "react";
import { View } from "react-big-calendar";

type CalendarContextType = {
  view: View
  date: Date
  setView: (view: View) => void
  setDate: (date: Date) => void
}

const CalendarContext = createContext<CalendarContextType | null>(null)

export const useCalendar = () => {
  const ctx = useContext(CalendarContext)
  if (!ctx) throw new Error('useCalendar must be used within CalendarProvider')
  return ctx
}

export const CalendarProvider = ({ children }: { children: React.ReactNode }) => {
  const [view, setView] = useState<View>("day")
  const [date, setDate] = useState<Date>(new Date())


  return (
    <CalendarContext.Provider value={{ view, date, setView, setDate }}>
      {children}
    </CalendarContext.Provider>
  )

}
