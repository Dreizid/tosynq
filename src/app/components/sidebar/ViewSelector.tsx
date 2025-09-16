import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useCalendar } from "@/app/context/calendar-context";
import { View } from "../calendar/AppCalendar";

function ViewSelector() {
  const { range, setRange } = useCalendar()
  return (
    <ToggleGroup type="single" variant="outline" className="bg-background" value={range} onValueChange={(value: View) => setRange(value)}>
      <ToggleGroupItem value="dayGridDay">Daily</ToggleGroupItem>
      <ToggleGroupItem value="dayGridWeek">Weekly</ToggleGroupItem>
      <ToggleGroupItem value="dayGridMonth">Monthly</ToggleGroupItem>
    </ToggleGroup>
  )
}

export default ViewSelector;
