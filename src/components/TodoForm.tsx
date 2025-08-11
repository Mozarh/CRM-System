import {useState} from "react";
import * as React from "react";

interface TodoFormProps {
  addTodo: (title:string) => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({addTodo}) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("")

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
    addTodo(value.trim());
    setValue("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    validate(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="input-wrapper">
        <input
          className="todo-input"
          type="text"
          value={value}
          required
          placeholder={'What we plan to do?'}
          onChange={handleChange}
        />
        {error && <p className="error-message">{error}</p>}
      </div>
      <button className="button">Add task</button>
    </form>
  )
}