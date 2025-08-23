'use client'
import FormDialog from "./FormDialog";
import TaskForm from "@/app/components/TaskForm"
import EventForm from "./EventForm";

function EventFormDialog({ open, onOpenChange }: { open: boolean, onOpenChange: () => void }) {
  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      tabs={[
        {
          title: "Task",
          value: "task",
          content: <TaskForm />,
          contentTitle: "Add a task"
        },
        {
          title: "Event",
          value: "event",
          content: <EventForm />,
          contentTitle: "Add an event"
        }
      ]}
      defaultTab="event"
    />
  )
}

export default EventFormDialog;
