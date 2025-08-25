import React, { useState } from 'react';
import type {Todo, TodoFormValues} from '../../types/todo.ts';
import {deleteTodo, updateTodo} from "../../api/todoApi.ts";
import {Button, Checkbox, message, Space} from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {EditTodoItem} from "../EditTodoItem/EditTodoItem.tsx";

interface TodoProps {
  task: Todo;
  onTaskChanged: () => void;
  onTaskDeleted: () => void;
}

export const TodoItem: React.FC<TodoProps> = React.memo(({
  task,
  onTaskChanged,
  onTaskDeleted,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleToggleComplete = async () => {
    try {
      setLoading(true);
      await updateTodo(task.id, { isDone: !task.isDone });
      onTaskChanged()
    } catch (error) {
      message.error('Ошибка при обновлении задачи');
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
      message.error('Ошибка при удалении задачи');
      console.error('Ошибка при удалении задачи:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (values: TodoFormValues) => {
    try {
      setLoading(true);
      await updateTodo(task.id, { title: values.title.trim() });
      setIsEditing(false);
      onTaskChanged()
    } catch (error) {
      message.error('Ошибка при редактировании задачи');
      console.error('Ошибка при редактировании задачи:', error);
    } finally {
      setLoading(false);
    }
  }

  if (isEditing) {
    return (
      <EditTodoItem
        initialTitle={task.title}
        loading={loading}
        onCancel={() => setIsEditing(false)}
        onSave={handleSave}
      />

    )
  }

  return (
        <>
          <Checkbox
            checked={task.isDone}
            onChange={handleToggleComplete}
            disabled={loading}
          />
          <p
            style={{
              flex: 1,
              margin: "0 10px",
              fontSize: 16,
              textDecoration: task.isDone ? "line-through": "none",
              cursor: task.isDone ? "pointer" : "default" ,
              color: task.isDone ? "darkblue" : "inherit",
            }}
          >
            {task.title}
          </p>
          <Space>
            <Button icon={<EditOutlined />} onClick={() => setIsEditing(true)} />
            <Button icon={<DeleteOutlined />} onClick={handleDelete} style={{color: 'red'}} />
          </Space>
        </>
  )
}
)
