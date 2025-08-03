import { Calendar } from "@/components/ui/calendar";
import { SidebarGroup, SidebarSeparator } from "@/components/ui/sidebar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AppCalendar() {
  return (
    <SidebarGroup>
      <Calendar />
      <SidebarSeparator />
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="single">Single</SelectItem>
          <SelectItem value="weekly">Weekly</SelectItem>
          <SelectItem value="monthly">Monthly</SelectItem>
        </SelectContent>
      </Select>
    </SidebarGroup>
  )
}

