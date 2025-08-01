import dayjs from "dayjs"
import WeeklyDayBox from "./WeeklyDayBox"

export default function WeeklyCalendar({ }) {

  const startOfWeek = dayjs().startOf("week")

  const week = Array.from({ length: 7 },
    (_, i) =>
      startOfWeek.add(i, "day")
  )

  console.log(week.map(d => (
    d.format("dddd, MMMM D")
  )))
  console.log(startOfWeek.month())
  return (
    <div className="grid grid-cols-7 rounded-lg bg-neutral-200 h-full p-4 m-4">
      {week.map(date => (
        <WeeklyDayBox key={date.toISOString()} date={date.toISOString()} />
      ))}
    </div>
  )
}

