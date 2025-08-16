import { DialogHeader, Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ReactNode } from "react";
interface FormDialogProps {
  title: string,
  open: boolean,
  onOpenChange: () => void,
  children: ReactNode
}

function FormDialog({ title, open, onOpenChange, children }: FormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default FormDialog;
