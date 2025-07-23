import { Dayjs } from "dayjs"
import { Task } from "../lib/db/dexie"

export interface DayBoxProps {
  day: Dayjs
  task?: Task
}
function DayBox({ day, task }: DayBoxProps) {
  return (
    <div className="aspect-square">
      <h1>{day.date()}</h1>

    </div>
  )
}

export default DayBox
