import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function ListSelector() {
  return (
    <Select onValueChange={(value) => console.log(value)}>
      <SelectTrigger className="">
        <SelectValue placeholder="Event" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Events or Task</SelectLabel>
          <SelectItem value="event">Event</SelectItem>
          <SelectItem value="task">Task</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default ListSelector;
