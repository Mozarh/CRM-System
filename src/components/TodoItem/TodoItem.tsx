import React, { useState } from 'react';
import type { TodoTypes, TodoFormValues } from '../../types/todoTypes.ts';
import {deleteTodo, updateTodo} from "../../api/todoApi.ts";
import {Button, Checkbox, message, Space} from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {EditTodoItem} from "../EditTodoItem/EditTodoItem.tsx";

interface TodoProps {
  task: TodoTypes;
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
    } catch {
      message.error('Ошибка при обновлении задачи');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteTodo(task.id);
      onTaskDeleted();
    } catch {
      message.error('Ошибка при удалении задачи');
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
    } catch {
      message.error('Ошибка при редактировании задачи');
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
        <Button icon={<DeleteOutlined />} onClick={handleDelete} danger />
      </Space>
    </>
  );
}
)
