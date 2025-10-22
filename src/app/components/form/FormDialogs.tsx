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
  return (
    <ContentDialog open={open} onOpenChange={onOpenChange} title="Add an event">
      <EventForm />
    </ContentDialog>
  );
}

export default FormDialog;
