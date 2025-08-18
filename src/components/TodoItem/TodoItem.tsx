import React, { useState } from 'react';
import type { Todo } from '../../types/todo.ts';
import PenSvg from '../../../public/pen.svg';
import TrashSvg from '../../../public/trash.svg';
import UpdateSvg from '../../../public/update.svg';
import CancelSvg from '../../../public/cancel.svg';
import styles from './TodoItem.module.css';
import { validationTodoTitle } from '../../helpers/validation.ts';
import { ButtonIcon } from '../../ui/ButtonIcon/ButtonIcon.tsx';

interface TodoProps {
  task: Todo;
  toggleComplete: () => void;
  deleteTodo: () => void;
  startEdit: () => void;
  cancelEdit: () => void;
  saveEdit: (title: string, id: number) => void;
  isEditing: boolean;
}

export const TodoItem: React.FC<TodoProps> = ({
  task,
  toggleComplete,
  deleteTodo,
  startEdit,
  cancelEdit,
  saveEdit,
  isEditing,
}) => {
  const [title, setTitle] = useState<string>(task.title);
  const [error, setError] = useState<string>('');
  const [touched, setTouched] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errorMsg = validationTodoTitle(title);
    if (errorMsg) {
      setError(errorMsg);
      return;
    }
    saveEdit(title.trim(), task.id);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (touched) {
      setError(validationTodoTitle(e.target.value));
    }
  };

  const handleBlur = () => {
    setTouched(true);
    setError(validationTodoTitle(title));
  };

  return (
    <>
      {isEditing ? (
        <form onSubmit={handleSubmit} className={styles.todoForm}>
          <div className={styles.inputWrapper}>
            <input
              className={styles.todoInput}
              type="text"
              value={title}
              required
              placeholder="Changing the task?"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <div className={styles.errorWrapper}>
              <p
                className={`${styles.errorMessage} ${error ? styles.errorVisible : ''}`}
              >
                {error}
              </p>
            </div>
          </div>
          <ButtonIcon
            icon={UpdateSvg}
            alt="Update task"
            size={30}
            type="submit"
          />
          <ButtonIcon
            icon={CancelSvg}
            alt="Cancel"
            size={30}
            type="button"
            onClick={cancelEdit}
          />
        </form>
      ) : (
        <div className={styles.todoItem}>
          <input
            className={styles.todoCheckbox}
            type="checkbox"
            checked={task.isDone}
            onChange={toggleComplete}
          />
          <p
            className={`${styles.todoText} ${task.isDone ? styles.completed : ''}`}
          >
            {task.title}
          </p>
          <div className={styles.todoAction}>
            <ButtonIcon
              onClick={startEdit}
              alt="Edit a task"
              icon={PenSvg}
              size={25}
            />
            <ButtonIcon
              onClick={deleteTodo}
              alt="Delete a task"
              icon={TrashSvg}
              size={25}
            />
          </div>
        </div>
      )}
    </>
  );
};
