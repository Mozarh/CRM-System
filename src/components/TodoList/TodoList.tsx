import { TodoItem } from '../TodoItem/TodoItem.tsx';
import React from 'react';
import type { Todo } from '../../types/todo.ts';

interface TodoListProps {
  todos: Todo[];
  editingId: number | null;
  toggleComplete: (id: number, isDone: boolean) => void;
  deleteTodo: (id: number) => void;
  startEdit: (id: number) => void;
  cancelEdit: () => void;
  saveEdit: (title: string, id: number) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  editingId,
  toggleComplete,
  deleteTodo,
  startEdit,
  cancelEdit,
  saveEdit,
}) => {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          task={todo}
          toggleComplete={() => toggleComplete(todo.id, todo.isDone)}
          deleteTodo={() => deleteTodo(todo.id)}
          startEdit={() => startEdit(todo.id)}
          cancelEdit={cancelEdit}
          saveEdit={saveEdit}
          isEditing={editingId === todo.id}
        />
      ))}
    </div>
  );
};
