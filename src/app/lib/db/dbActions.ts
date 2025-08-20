import { db, SourceType } from "@/app/lib/db/dexie"

interface SubmitTaskProps {
  title: string
  from: Date | undefined
  to: Date | undefined
  description: string
  completed: boolean
  createdAt: Date
  source: SourceType
  deleted: boolean
  allDay: boolean
}

export async function addTask({ title, from, to, description, completed, createdAt, source, deleted, allDay }: SubmitTaskProps) {
  try {
    await db.task.add({
      title: title,
      from: from ? from : new Date(),
      to: to ? to : new Date(),
      description: description,
      completed: false,
      createdAt: new Date(),
      source: 'manual',
      deleted: false
    })
  } catch (error) {
    console.log(error)
  }
}

export async function removeTask(id: number) {
  try {
    console.log(id)
    await db.task.delete(id)
  } catch (error) {
    console.log(error)
  }
}
