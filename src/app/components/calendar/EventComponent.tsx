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
import { Input } from "@/components/ui/input";
import { Portal } from "@radix-ui/react-popover";
import EventForm from "../form/EventForm";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { removeTask } from "../../lib/db/dbActions";

function EventComponent({ event }: { event: EventApi }) {
  const [finished, setFinished] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const { className, dbId, description } = event.extendedProps;
  const { title, start, end } = event;

  const handleDelete = () => removeTask(dbId);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          className={`${className} flex flex-row gap-2 p-1`}
          onClick={() => setOpen(true)}
        >
          <Checkbox
            id="item"
            checked={finished}
            onCheckedChange={(value) => setFinished(!!value)}
          />
          <Label className={`${finished ? "line-through" : ""}`}>
            {event.title}
          </Label>
        </div>
      </PopoverTrigger>
      <Portal>
        <PopoverContent className="w-full">
          <div className="flex">
            <Button
              className="h-4 w-4 bg-transparent ml-auto"
              onClick={handleDelete}
            >
              <TrashIcon className="text-red-700 hover:text-red-100" />
            </Button>
          </div>
          <EventForm
            eventId={dbId}
            title={title}
            description={description}
            from={start ?? undefined}
            to={end ?? undefined}
          />
        </PopoverContent>
      </Portal>
    </Popover>
  );
}
export default EventComponent;
