import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

function ViewSelector() {
  return (
    <ToggleGroup type="single" variant="outline" className="bg-background ml-auto" onValueChange={(value) => console.log(value)}>
      <ToggleGroupItem value="dayGridDay">Daily</ToggleGroupItem>
      <ToggleGroupItem value="dayGridWeek">Weekly</ToggleGroupItem>
      <ToggleGroupItem value="dayGridMonth">Monthly</ToggleGroupItem>
    </ToggleGroup>
  )
}

export default ViewSelector;
