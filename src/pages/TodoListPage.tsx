import React, { useCallback, useEffect, useState } from 'react';
import { TodoForm } from '../components/TodoForm/TodoForm.tsx';
import { TaskTabs } from '../components/TaskTabs/TaskTabs.tsx';
import type { FilterStatus, Todo, TodoInfo } from '../types/todo.ts';
import { getTodos } from '../api/todoApi.ts';
import { TodoList } from '../components/TodoList/TodoList.tsx';
import {Card, message, Typography} from 'antd';

const { Title } = Typography;

export const TodoListPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeTab, setActiveTab] = useState<FilterStatus>('all');
  const [counts, setCounts] = useState<TodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0,
  });

  const fetchTodos = useCallback(async () => {
    try {
      const res = await getTodos(activeTab);
      setTodos(res.data);
      if (res.info) {
        setCounts(res.info);
      }
    } catch {
      message.error('Ошибка при получении задач');
    }
  }, [])

  const handleTaskUpdate = fetchTodos

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);


  useEffect(() => {
    const interval = setInterval(fetchTodos, 5000);
    return () => clearInterval(interval);
  }, [fetchTodos]);

  return (
    <Card
      style={{
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: 20,
        width: 500,
        padding: 20,
      }}
    >
      <Title
        style={{
          textAlign: "center",
          fontSize: "50px"
      }}
      >
        Todo List
      </Title>
      <TodoForm onTaskAdded={handleTaskUpdate} />
      <TaskTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        countAll={counts.all}
        countDone={counts.completed}
        countInWork={counts.inWork}
      />
      <TodoList
        todos={todos}
        onTaskChanged={handleTaskUpdate}
        onTaskDeleted={handleTaskUpdate}
      />
    </Card>
  );
};
