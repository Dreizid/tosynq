import { Task } from "../lib/db/dexie"

function TodoItemView({ id, title, description, completed, createdAt, source }: Task) {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  )
}

export default TodoItemView
