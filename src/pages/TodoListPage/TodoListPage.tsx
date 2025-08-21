import React, { useEffect, useState } from 'react';
import { TodoForm } from '../../components/TodoForm/TodoForm.tsx';
import { TaskTabs } from '../../components/TaskTabs/TaskTabs.tsx';
import type { FilterStatus, Todo, TodoInfo } from '../../types/todo.ts';
import { getTodos } from '../../api/todoApi.ts';
import { TodoList } from '../../components/TodoList/TodoList.tsx';
import styles from './TodoListPage.module.css';

export const TodoListPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeTab, setActiveTab] = useState<FilterStatus>('all');
  const [counts, setCounts] = useState<TodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0,
  });

  const fetchTodos = async (filter: FilterStatus) => {
    try {
      const res = await getTodos(filter);
      setTodos(res.data);
      if (res.info) {
        setCounts(res.info);
      }
    } catch (error) {
      alert('Ошибка при получении задач');
      console.error('Ошибка при получении задач', error);
    }
  };

  useEffect(() => {
    fetchTodos(activeTab);
  }, [activeTab]);

  return (
    <div className={styles.app}>
      <h1 className={styles.appHeader}>Todo List</h1>
      <TodoForm onTaskAdded={() => fetchTodos(activeTab)} />
      <TaskTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        countAll={counts.all}
        countDone={counts.completed}
        countInWork={counts.inWork}
      />
      <TodoList
        todos={todos}
        onTaskChanged={()=> fetchTodos(activeTab)}
        onTaskDeleted={()=> fetchTodos(activeTab)}
      />
    </div>
  );
};
