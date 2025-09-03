import React, { useState } from 'react';
import { addTodo } from '../../api/todoApi.ts';
import {Button, Form, message} from 'antd';
import type {TodoFormValues} from "../../types/todo.ts";
import {TaskTitleForm} from "../TaskTitleForm/TaskTitleForm.tsx";

interface TodoFormProps {
  onTaskAdded: () => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onTaskAdded }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm<TodoFormValues>();

  const handleAdded = async (values: TodoFormValues) => {
    try {
      setLoading(true);
      await addTodo({ title: values.title.trim(), isDone: false });
      form.resetFields();
      onTaskAdded()
    } catch {
      message.error('Ошибка при добавлении задачи');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <TaskTitleForm
        form={form}
        onFinish={handleAdded}
        placeholder="What we plan to do?"
      />
        <Button
          loading={loading}
          type="primary"
          onClick={()=>form.submit()}
        >
          Add Task
        </Button>
    </div>
  );
};
