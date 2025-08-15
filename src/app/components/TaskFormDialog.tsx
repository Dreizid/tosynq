'use client'
import { useState } from "react";
import { Dialog, DialogHeader, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DateTimePicker } from "./DateTimePicker";

function TaskFormDialog({ open, onOpenChange }: { open: boolean, onOpenChange: () => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a task</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title" className="font-semibold">Title</Label>
              <Input id="title" name="title" placeholder={"Title"} />
            </div>
            <div className="grid gap-2">
              <Label>
                From:
              </Label>
              <DateTimePicker />
              <Label>
                To:
              </Label>
              <DateTimePicker />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description" className="font-semibold">Description</Label>
              <Textarea placeholder="Description" />
            </div>
            <Button>Submit</Button>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default TaskFormDialog;
