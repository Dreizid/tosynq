"use client"
import { useState } from "react";
import { EventApi } from "@fullcalendar/core";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label"

function EventComponent({ event }: { event: EventApi }) {
  const [finished, setFinished] = useState<boolean>(false)
  return (
    <div className={`${event.extendedProps.className} flex flex-row gap-2`}>
      <Checkbox id="item" checked={finished} onCheckedChange={(value) => setFinished(!!value)} />
      <Label className={`${finished ? "line-through" : ""}`}>{event.title}</Label>
    </div>
  )
}

export default EventComponent;
