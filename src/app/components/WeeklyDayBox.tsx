import dayjs, { Dayjs } from "dayjs"

export interface WeeklyDayBoxProps {
  date: string
}

export default function WeeklyDayBox({ date }: WeeklyDayBoxProps) {
  const parsedDate = dayjs(date)
  return (
    <div className="flex flex-col rounded-lg items-center justify-center shadow-md mx-2 p-2">
      <h2>{parsedDate.format("D")}</h2>
      <h3>{parsedDate.format("dddd")}</h3>
    </div>
  )
}

