import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useCalendar } from "../../context/calendar-context";
import { View } from "../calendar/AppCalendar";

function ListSelector() {
  const { enabled, toggleSource } = useCalendar()
  return (
    <div className="grid gap-2 mx-3">
      <div className="flex items-center gap-1">
        <Checkbox id="events" checked={enabled.includes("events")} onCheckedChange={() => toggleSource("events")} />
        <Label htmlFor="events">Events</Label>
      </div>
      <div className="flex items-center gap-1">
        <Checkbox id="task" checked={enabled.includes("task")} onCheckedChange={() => toggleSource("task")} />
        <Label htmlFor="task" >Task</Label>
      </div>
      {
        // <div className="flex items-center gap-1">
        //   <Switch id="time-view" onCheckedChange={(v) => {
        //     setView(v ? view.replace("day", "time") as View : view.replace("time", "day") as View )
        //   }} />
        //   <Label htmlFor="time-view">Time view</Label>
        // </div>
      }
    </div>
  )
}

export default ListSelector;
