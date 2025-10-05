import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useCalendar } from "../../context/calendar-context";
import { View } from "../calendar/AppCalendar";
import { TaskType } from "@/app/lib/db/dexie";

const sources: { id: string; key: TaskType; label: string }[] = [
  { id: "event", key: "event", label: "Events" },
  { id: "task", key: "task", label: "Task" },
];
function ListSelector() {
  const { enabled, toggleSource } = useCalendar();
  return (
    <div className="grid gap-2 mx-3">
      {sources.map(({ id, key, label }) => (
        <div key={id} className="flex items-center gap-1">
          <Checkbox
            id={id}
            checked={enabled.includes(key)}
            onCheckedChange={() => toggleSource(key)}
          />
          <Label htmlFor={id}>{label}</Label>
        </div>
      ))}
      {
        // <div className="flex items-center gap-1">
        //   <Switch id="time-view" onCheckedChange={(v) => {
        //     setView(v ? view.replace("day", "time") as View : view.replace("time", "day") as View )
        //   }} />
        //   <Label htmlFor="time-view">Time view</Label>
        // </div>
      }
    </div>
  );
}

export default ListSelector;
