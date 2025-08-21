import { TodoItem } from '../TodoItem/TodoItem.tsx';
import React from 'react';
import type { Todo } from '../../types/todo.ts';

interface TodoListProps {
  todos: Todo[];
  onTaskChanged: () => void;
  onTaskDeleted: () => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onTaskChanged,
  onTaskDeleted,
}) => {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          task={todo}
          onTaskChanged={onTaskChanged}
          onTaskDeleted={onTaskDeleted}
        />
      ))}
    </div>
  );
};
