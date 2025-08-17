"use client"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DateTimePicker } from "@/app/components/DateTimePicker";
import { db } from "@/app/lib/db/dexie";
import { useState } from "react";

function TaskForm() {
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState("")
  const [from, setFrom] = useState<Date | undefined>(undefined)
  const [to, setTo] = useState<Date | undefined>(undefined)

  async function submitTask() {
    console.log("adding")
    try {
      const id = await db.task.add({
        title: title,
        from: from ? from : new Date(),
        to: to ? to : new Date(),
        description: description,
        completed: false,
        createdAt: new Date(),
        source: 'manual',
        deleted: false
      })
      console.log(id)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      submitTask()
    }}>
      <div className="grid gap-4">
        <div className="grid gap-3">
          <Label htmlFor="title" className="font-semibold">Title</Label>
          <Input
            id="title"
            name="title"
            placeholder={"Title"}
            autoFocus={false}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="description" className="font-semibold">Description</Label>
          <Textarea placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="grid gap-2">
          <Label>
            From:
          </Label>
          <DateTimePicker date={from} onSelect={setFrom} />
          <Label>
            To:
          </Label>
          <DateTimePicker date={to} onSelect={setTo} />
        </div>
        <Button type="button" onClick={submitTask}>Submit</Button>
      </div>
    </form>
  )
}

export default TaskForm;
