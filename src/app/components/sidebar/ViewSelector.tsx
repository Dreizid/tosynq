import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useCalendar } from "@/app/context/calendar-context";
import { View } from "@/app/components/calendar/AppCalendar";

const views: { value: View; label: string }[] = [
  { value: "dayGridDay", label: "Daily" },
  { value: "dayGridWeek", label: "Weekly" },
  { value: "dayGridMonth", label: "Monthly" },
];
function ViewSelector() {
  const { range, setRange } = useCalendar();
  return (
    <ToggleGroup
      type="single"
      variant="outline"
      className="bg-background"
      value={range}
      onValueChange={(value: View) => setRange(value)}
    >
      {views.map(({ value, label }) => (
        <ToggleGroupItem key={value} value={value}>
          {label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

export default ViewSelector;
