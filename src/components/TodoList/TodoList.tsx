import { TodoItem } from '../TodoItem/TodoItem.tsx';
import React from 'react';
import type { Todo } from '../../types/todo.ts';
import {List} from "antd";

interface TodoListProps {
  todos: Todo[];
  onTaskChanged: () => void;
  onTaskDeleted: () => void;
}

export const TodoList: React.FC<TodoListProps> = React.memo(({
  todos,
  onTaskChanged,
  onTaskDeleted,
}) => {
  return (
    <List
      dataSource={todos}
      renderItem={(todo) => (
        <List.Item key={todo.id}>
          <TodoItem
            task={todo}
            onTaskChanged={onTaskChanged}
            onTaskDeleted={onTaskDeleted}
          />
        </List.Item>
      )}
    />
  );
})
