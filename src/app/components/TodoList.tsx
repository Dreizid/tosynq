import { useLiveQuery } from "dexie-react-hooks"
import TodoItemView from "./TodoItemView"
import { db } from "../lib/db/dexie"

function TodoList() {
  const todolist = useLiveQuery(() => db.task.toArray());

  return (
    <ul>
      {todolist?.map((task) => (
        <TodoItemView
          title={task.title}
          description={task.description}
          completed={task.completed}
          createdAt={task.createdAt}
          source={task.source}
        />
      ))}
    </ul>
  )
}

export default TodoList
