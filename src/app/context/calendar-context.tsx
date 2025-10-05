"use client";
import { createContext, useState, useContext } from "react";
import { View } from "@/app/components/calendar/AppCalendar";
import { TaskType } from "../lib/db/dexie";

type CalendarContextType = {
  range: View;
  date: Date;
  enabled: TaskType[];
  setRange: (view: View) => void;
  setDate: (date: Date) => void;
  toggleSource: (src: TaskType) => void;
};
const CalendarContext = createContext<CalendarContextType | null>(null);

export const useCalendar = () => {
  const ctx = useContext(CalendarContext);
  if (!ctx) throw new Error("useCalendar must be used within CalendarProvider");
  return ctx;
};

export const CalendarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [range, setRange] = useState<View>("dayGridDay");
  const [date, setDate] = useState<Date>(new Date());
  const [enabled, setEnabled] = useState<TaskType[]>(["event", "task"]);

  const toggleSource = (src: TaskType) => {
    setEnabled((prev) =>
      prev.includes(src) ? prev.filter((s) => s !== src) : [...prev, src],
    );
  };
  return (
    <CalendarContext.Provider
      value={{ range, date, enabled, setRange, setDate, toggleSource }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
