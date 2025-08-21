import React, { useState } from 'react';
import type { Todo } from '../../types/todo.ts';
import PenSvg from '../../../public/pen.svg';
import TrashSvg from '../../../public/trash.svg';
import UpdateSvg from '../../../public/update.svg';
import CancelSvg from '../../../public/cancel.svg';
import styles from './TodoItem.module.css';
import { validationTodoTitle } from '../../helpers/validation.ts';
import { ButtonIcon } from '../../ui/ButtonIcon/ButtonIcon.tsx';
import {deleteTodo, updateTodo} from "../../api/todoApi.ts";

interface TodoProps {
  task: Todo;
  onTaskChanged: () => void;
  onTaskDeleted: () => void;
}

export const TodoItem: React.FC<TodoProps> = ({
  task,
  onTaskChanged,
  onTaskDeleted,
}) => {
  const [title, setTitle] = useState<string>(task.title);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string>('');
  const [touched, setTouched] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleToggleComplete = async () => {
    try {
      setLoading(true);
      await updateTodo(task.id, { isDone: !task.isDone });
      onTaskChanged()
    } catch (error) {
      alert('Ошибка при обновлении задачи');
      console.error('Ошибка при обновлении задачи:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteTodo(task.id);
      onTaskDeleted();
    } catch (error) {
      alert('Ошибка при удалении задачи');
      console.error('Ошибка при удалении задачи:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const errorMsg = validationTodoTitle(title)
    if (errorMsg) {
      setError(errorMsg);
      return;
    }
    try {
      setLoading(true);
      await updateTodo(task.id, { title: title.trim() });
      setIsEditing(false);
      onTaskChanged()
    } catch (error) {
      alert('Ошибка при редактировании задачи');
      console.error('Ошибка при редактировании задачи:', error);
    } finally {
      setLoading(false);
    }
  }

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
        <form onSubmit={handleSave} className={styles.todoForm}>
          <div className={styles.inputWrapper}>
            <input
              className={styles.todoInput}
              type="text"
              value={title}
              required
              placeholder="Changing the task?"
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={loading}
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
            onClick={() => setIsEditing(false)}
          />
        </form>
      ) : (
        <div className={styles.todoItem}>
          <input
            className={styles.todoCheckbox}
            type="checkbox"
            checked={task.isDone}
            onChange={handleToggleComplete}
            disabled={loading}
          />
          <p
            className={`${styles.todoText} ${task.isDone ? styles.completed : ''}`}
          >
            {task.title}
          </p>
          <div className={styles.todoAction}>
            <ButtonIcon
              onClick={()=> setIsEditing(true)}
              alt="Edit a task"
              icon={PenSvg}
              size={25}
            />
            <ButtonIcon
              onClick={handleDelete}
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
