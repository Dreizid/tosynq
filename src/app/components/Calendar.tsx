"use client"
import dayjs from "dayjs"
import localeData from "dayjs/plugin/localeData"
import { useEffect, useState } from "react"
import DayBox from "./DayBox"

function Calendar() {
  dayjs.extend(localeData)
  const weekdays = dayjs.weekdays()
  const months = dayjs.months()

  const [month, setMonth] = useState(dayjs().month())
  const [year, setYear] = useState(dayjs().year())
  const baseMonth = dayjs().month(month).year(year)
  const startOfMonthOffset = baseMonth.startOf("month").day()
  const numOfDays = baseMonth.endOf("month").date() + startOfMonthOffset

  const changeMonth = (offset: number) => {
    const updatedMonth = month + offset
    const wrappedMonth = (updatedMonth + 12) % 12
    const yearOffset = Math.floor(updatedMonth / 12)
    setMonth(wrappedMonth)
    setYear(year + yearOffset)
  }
  const dateComponents = []

  for (let currDay = 0; currDay < numOfDays; currDay++) {
    const currentDate = dayjs(baseMonth.startOf("month")).subtract(startOfMonthOffset - currDay, "day")
    dateComponents.push(
      <DayBox
        day={currentDate}
        key={currDay}
      />
    )
  }

  return (
    <div>
      <div className="bg-slate-600">
        <button
          onMouseUp={() => { changeMonth(-1) }}
        >{"<-"}</button>
        {months[month]}
        {year}
        <button
          onMouseUp={() => { changeMonth(1) }}
        >{"->"}</button>
      </div>
      <div>
        <div className="grid grid-cols-7">
          {weekdays.map((day) => (
            <div key={weekdays.indexOf(day)}>{day}</div>
          ))}</div>
        <div className="grid grid-cols-7">
          {dateComponents}
        </div>
      </div>
    </div>
  )
}

export default Calendar
