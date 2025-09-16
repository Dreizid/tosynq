"use client";
import ContentDialog from "@/app/components/form/ContentDialog";
import TaskForm from "@/app/components/form/TaskForm";
import EventForm from "./EventForm";

function FormDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: () => void;
}) {
  const tabs = [
    {
      label: "Task",
      value: "task",
      content: <TaskForm />,
      contentTitle: "Add a task",
    },
    {
      label: "Event",
      value: "event",
      content: <EventForm />,
      contentTitle: "Add an event",
    },
  ];
  return (
    <ContentDialog
      open={open}
      onOpenChange={onOpenChange}
      tabs={[...tabs]}
      defaultTab="event"
    />
  );
}

export default FormDialog;
