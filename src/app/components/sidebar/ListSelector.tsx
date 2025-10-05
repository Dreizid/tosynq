import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useCalendar } from "@/app/context/calendar-context";
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
    </div>
  );
}

export default ListSelector;
