import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"

const localizer = momentLocalizer(moment)

export function AppCalendar(props: {}) {
  return (
    <div className="h-full">
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  )
}
