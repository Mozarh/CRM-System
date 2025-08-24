import React, { useEffect, useState } from 'react';
import { TodoForm } from '../components/TodoForm/TodoForm.tsx';
import { TaskTabs } from '../components/TaskTabs/TaskTabs.tsx';
import type { FilterStatus, Todo, TodoInfo } from '../types/todo.ts';
import { getTodos } from '../api/todoApi.ts';
import { TodoList } from '../components/TodoList/TodoList.tsx';
import { Card, Typography } from 'antd';

const { Title } = Typography;

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

  useEffect(() => {
    const interval = setInterval(() => {
      fetchTodos(activeTab);
    }, 5000)

    return () => clearInterval(interval)
  }, [activeTab]);

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
    </Card>
  );
};
