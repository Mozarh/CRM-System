import {useState} from "react";
import type {Todo} from "../types/todo.ts";
import * as React from "react";

interface EditTodoFormProps {
  editTodo: (title:string, id:number ) => void;
  cancelEdit: () => void;
  task: Todo
}

export const EditTodoForm:React.FC<EditTodoFormProps> = ({editTodo, cancelEdit, task}) => {
  const [value, setValue] = useState<string>(task.title);
  const [error, setError] = useState<string>('');

  const validate = (text: string) => {
    if (text.length < 2) {
      setError('Минимальная длина текста 2 символа')
      return false;
    }
    if (text.length > 64) {
      setError('Максимальная длина текста 64 символа')
      return false;
    }
    setError('')
    return true
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate(value.trim())) return;
    editTodo(value.trim(), task.id);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    validate(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit} className="todo-form" >
      <div className="input-wrapper">
      <input
        className="todo-input"
        type="text"
        value={value}
        required
        placeholder="Changing the task?"
        onChange={handleChange}
      />
      {error && <p className="error-message">{error}</p>}
        </div>
      <button type="submit" className="button">Update</button>
      <button type="submit" className="button" onClick={cancelEdit}>Cancel</button>
    </form>
  )
}