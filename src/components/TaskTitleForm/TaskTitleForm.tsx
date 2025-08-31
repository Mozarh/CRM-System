import type {TodoFormValues} from "../../types/todo.ts";
import { Form, type FormInstance, Input} from "antd";
import React from "react";

interface TaskTitleFormProps {
  form?: FormInstance<TodoFormValues>;
  initialValue?: string;
  loading?: boolean;
  placeholder?: string;
  onSubmit: (value: TodoFormValues) => void;
  children?: React.ReactNode;
}

export const TaskTitleForm: React.FC<TaskTitleFormProps> = ({
  initialValue = "",
  loading,
  form,
  onSubmit,
  placeholder,
  children,
}) => {
  const [ internalForm ] = Form.useForm<TodoFormValues>();

  return (
    <Form
      form={ form ?? internalForm }
      layout="inline"
      onFinish={onSubmit}
      initialValues={{ title: initialValue }}
      style={{ width: '100%', marginBottom: 10 }}
    >
      <Form.Item
        name="title"
        rules={[
          {required: true, message: "This field is required"},
          {min: 2, message: "The minimum text length is 2 characters"},
          {max: 64, message: "The maximum text length is 64 characters"},
        ]}
        style={{ flexGrow: 1, marginBottom: 0 }}
      >
        <Input
          placeholder={placeholder}
          disabled={loading}
        />
      </Form.Item>

      {children && <Form.Item>{children}</Form.Item>}
    </Form>
  )
}
