import * as React from "react";
import type {Todo} from "../types/todo.ts";

interface TodoProps {
  task: Todo;
  toggleComplete: () => void;
  editTodo: () => void;
  deleteTodo: () => void;
}

export const TodoList:React.FC<TodoProps> = ({task, toggleComplete, editTodo, deleteTodo}) => {
  return (
    <div className="todo-item">
      <input
        className="todo-item--checkbox"
        type='checkbox'
        checked={task.isDone}
        onChange={toggleComplete}
      />
      <p className={`todo-item--text ${task.isDone ? "completed" : ""}`}>{task.title}</p>
      <div className="todo-item--action">
        <button className="todo-item--action-button" onClick={editTodo}>✏️</button>
        <button className="todo-item--action-button" onClick={deleteTodo}>🗑</button>
      </div>
    </div>
  )
}