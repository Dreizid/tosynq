"use client"
import { useState } from "react";
import { EventApi } from "@fullcalendar/core";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Portal } from "@radix-ui/react-popover";
import EventForm from "./EventForm";

function EventComponent({ event }: { event: EventApi }) {
  const [finished, setFinished] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(true)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className={`${event.extendedProps.className} flex flex-row gap-2 p-1`} onClick={() => setOpen(true)}>
          <Checkbox id="item" checked={finished} onCheckedChange={(value) => setFinished(!!value)} />
          <Label className={`${finished ? "line-through" : ""}`}>{event.title}</Label>
        </div></PopoverTrigger>
      <Portal>
        <PopoverContent className="w-full">
          <EventForm eventId={event.extendedProps.dbId} title={event.title} description={event.extendedProps.description} from={event?.start ?? undefined} to={event?.end ?? undefined} />
        </PopoverContent>
      </Portal>
    </Popover>
  )
}

export default EventComponent;
