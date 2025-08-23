'use client'
import FormDialog from "./FormDialog";
import EventForm from "./EventForm";

function TaskFormDialog({ open, onOpenChange }: { open: boolean, onOpenChange: () => void }) {
  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      tabs={[
        {
          title: "Task",
          value: "task",
          content: <div></div>,
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

export default TaskFormDialog;
