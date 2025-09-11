import { db, SourceType, TaskType } from "@/app/lib/db/dexie"

interface SubmitTaskProps {
  title: string
  from: Date | undefined
  to: Date | undefined
  description: string | undefined
  type: TaskType
  completed: boolean
  createdAt: Date
  source: SourceType
  deleted: boolean
  allDay: boolean
}

interface EditTaskProps extends SubmitTaskProps {
  id: number
}

export async function addTask({ title, from, to, description, type, completed, createdAt, source, deleted, allDay }: SubmitTaskProps) {
  try {
    await db.task.add({
      title: title,
      from: from ? from : new Date(),
      to: to ? to : new Date(),
      description: description,
      type: type,
      completed: completed,
      createdAt: new Date(),
      source: 'manual',
      deleted: deleted,
      allDay: allDay,
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

export async function updateTask({ id, title, from, to, description, type, completed, createdAt, source, deleted, allDay }: EditTaskProps) {
  try {
    await db.task.update(
      id,
      {
        title: title,
        from: from ? from : new Date(),
        to: to ? to : new Date(),
        description: description,
        type: type,
        completed: completed,
        createdAt: new Date(),
        source: 'manual',
        deleted: deleted,
        allDay: allDay,
      }
    )
  } catch (error) {
    console.log(error)
  }
}
