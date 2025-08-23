import React, { useState } from 'react';
import styles from './TodoForm.module.css';
import { validationTodoTitle } from '../../helpers/validation.ts';
import { Button } from '../../ui/Button/Button.tsx';
import { addTodo } from '../../api/todoApi.ts';

interface TodoFormProps {
  onTaskAdded: () => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onTaskAdded }) => {
  const [title, setTitle] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [touched, setTouched] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errorMsg = validationTodoTitle(title);
    if (errorMsg) {
      setError(errorMsg);
      return;
    }
    try {
      setLoading(true);
      await addTodo({ title: title.trim(), isDone: false });
      setTitle('');
      setError('');
      setTouched(false);

      if (onTaskAdded) {
        onTaskAdded();
      }
    } catch (error) {
      alert('Ошибка при добавлении задачи');
      console.error('Ошибка при добавлении задачи:', error);
    } finally {
      setLoading(false);
    }
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
    <form onSubmit={handleSubmit} className={styles.todoForm}>
      <div className={styles.inputWrapper}>
        <input
          className={styles.todoInput}
          type="text"
          value={title}
          required
          placeholder={'What we plan to do?'}
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
      <Button type="submit" variant="primary">
        Add task
      </Button>
    </form>
  );
};
