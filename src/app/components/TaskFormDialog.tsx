'use client'
import { Dialog, DialogContent } from "@/components/ui/dialog";
import FormDialog from "./FormDialog";
import TaskForm from "./TaskForm";

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
          content: <TaskForm />,
          contentTitle: "Add an event"
        }
      ]}
      defaultTab="event"
    />
  )
}

export default TaskFormDialog;
