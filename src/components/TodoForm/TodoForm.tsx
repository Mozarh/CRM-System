import React, { useState } from 'react';
import { validationTodoTitle } from '../../helpers/validation.ts';
import { addTodo } from '../../api/todoApi.ts';
import {Button, Form, Input, message} from 'antd';

interface TodoFormProps {
  onTaskAdded: () => void;
}

interface TodoFormValues {
  title: string;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onTaskAdded }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm<TodoFormValues>();

  const handleSubmit = async (values: TodoFormValues) => {
    try {
      setLoading(true);
      await addTodo({ title: values.title.trim(), isDone: false });
      form.resetFields()

      if (onTaskAdded) {
        onTaskAdded();
      }
    } catch (error) {
      message.error('Ошибка при добавлении задачи');
      console.error('Ошибка при добавлении задачи:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="inline"
      onFinish={handleSubmit}
      style={{
        marginBottom: 20,
      }}
    >
      <Form.Item<TodoFormValues>
        name="title"
        rules={[
          {
            validator: async (_, value) => {
              const errorMsg = validationTodoTitle(value);
              return errorMsg ? Promise.reject(new Error(errorMsg)) : Promise.resolve();
            }
          }
        ]}
        style={{
          flexGrow: 1,
        }}
      >
        <Input
          placeholder={'What we plan to do?'}
          disabled={loading}
        />
      </Form.Item>

      <Form.Item
        style={{
          marginBottom: 0,
        }}
      >
        <Button type="primary" htmlType="submit" loading={loading}>
          Add task
        </Button>
      </Form.Item>
    </Form>
  );
};
