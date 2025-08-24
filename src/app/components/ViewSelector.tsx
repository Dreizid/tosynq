import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useCalendar } from "@/app/context/calendar-context";
import { View } from "./AppCalendar";

function ViewSelector() {
  const { setView } = useCalendar()
  return (
    <ToggleGroup type="single" variant="outline" className="bg-background" onValueChange={(value: View) => setView(value)}>
      <ToggleGroupItem value="dayGridDay">Daily</ToggleGroupItem>
      <ToggleGroupItem value="dayGridWeek">Weekly</ToggleGroupItem>
      <ToggleGroupItem value="dayGridMonth">Monthly</ToggleGroupItem>
    </ToggleGroup>
  )
}

export default ViewSelector;
