'use client'
import FormDialog from "./FormDialog";
import TaskForm from "./TaskForm";

function TaskFormDialog({ open, onOpenChange }: { open: boolean, onOpenChange: () => void }) {
  return (
    <FormDialog
      title="Add a task"
      open={open}
      onOpenChange={onOpenChange}
    >
      <TaskForm />
    </FormDialog>
  )
}

export default TaskFormDialog;
