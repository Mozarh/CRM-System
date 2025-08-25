import React, { useState } from 'react';
import { addTodo } from '../../api/todoApi.ts';
import {Form, message} from 'antd';
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
      form.setFieldsValue({ title: "" });
      onTaskAdded()
    } catch (error) {
      message.error('Ошибка при добавлении задачи');
      console.error('Ошибка при добавлении задачи:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TaskTitleForm
      form={form}
      loading={loading}
      onFinish={handleAdded}
      isEditMode={false}
      placeholder="What we plan to do?"
    />
  );
};
