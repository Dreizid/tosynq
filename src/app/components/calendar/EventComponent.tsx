"use client";
import { useState } from "react";
import { EventApi } from "@fullcalendar/core";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverArrow, Portal } from "@radix-ui/react-popover";
import EventForm from "../form/EventForm";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { removeTask } from "../../lib/db/dbActions";
import EventOverview from "./EventOverview";

function EventComponent({ event }: { event: EventApi }) {
  const [finished, setFinished] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const { className = "", dbId, description } = event.extendedProps;
  const { title, start, end } = event;

  const handleDelete = async () => {
    await removeTask(dbId);
    setOpen(false);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          className={`${className} flex flex-row gap-2 p-1`}
          onClick={() => setOpen(true)}
        >
          <Checkbox
            id={`item-${dbId}`}
            checked={finished}
            onCheckedChange={(value) => setFinished(!!value)}
          />
          <Label className={`${finished ? "line-through" : ""}`}>{title}</Label>
        </div>
      </PopoverTrigger>
      <Portal>
        <PopoverContent className="w-full">
          <EventOverview
            eventName={title}
            fromDate={start}
            toDate={end}
            description={description}
          />
        </PopoverContent>
      </Portal>
    </Popover>
  );
}
export default EventComponent;
