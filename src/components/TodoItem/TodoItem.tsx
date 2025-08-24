import React, { useState } from 'react';
import type { Todo } from '../../types/todo.ts';
import { validationTodoTitle } from '../../helpers/validation.ts';
import {deleteTodo, updateTodo} from "../../api/todoApi.ts";
import {Button, Checkbox, Form, Input, message, Space} from "antd";
import {  CheckOutlined, CloseOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface TodoProps {
  task: Todo;
  onTaskChanged: () => void;
  onTaskDeleted: () => void;
}

interface TodoFormValues {
  title: string;
}

export const TodoItem: React.FC<TodoProps> = ({
  task,
  onTaskChanged,
  onTaskDeleted,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm<TodoFormValues>();

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
      <Form
        form={form}
        layout="inline"
        onFinish={handleSave}
        initialValues={{ title: task.title }}
        style={{ width: '100%', marginBottom: 10 }}
      >
        <Form.Item
          name="title"
          rules={[
            {
              validator: async (_, value) => {
                const errorMsg = validationTodoTitle(value);
                return errorMsg ? Promise.reject(new Error(errorMsg)) : Promise.resolve();
              }
            }
          ]}
          style={{ flexGrow: 1, marginBottom: 0 }}
        >
          <Input
            placeholder="Changing the task?"
            disabled={loading}
          />
        </Form.Item>
        <Space>
          <Button htmlType="submit" loading={loading} icon={<CheckOutlined />} />
          <Button
            type="default"
            disabled={loading}
            icon={<CloseOutlined />}
            onClick={() => setIsEditing(false)}
            style={{color: 'red'}}
          />
        </Space>
      </Form>
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
  );
};
