import type {TodoFormValues} from "../../types/todo.ts";
import {Button, Form, type FormInstance, Input, Space} from "antd";
import {validationTodoTitle} from "../../helpers/validation.ts";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";
import React from "react";

interface TaskTitleFormProps {
  form?: FormInstance<TodoFormValues>;
  initialValue?: string;
  loading: boolean;
  onFinish: (value: TodoFormValues) => void;
  onCancel?: () => void;
  isEditMode?: boolean;
  placeholder?: string;
}

export const TaskTitleForm: React.FC<TaskTitleFormProps> = ({
  initialValue = "",
  loading,
  form,
  onFinish,
  onCancel,
  isEditMode = false,
  placeholder,
}) => {
  const [ internalForm ] = Form.useForm<TodoFormValues>();

  return (
    <Form
      form={ form ?? internalForm }
      layout="inline"
      onFinish={onFinish}
      initialValues={{ title: initialValue }}
      style={{ width: '100%', marginBottom: 10 }}
    >
      <Form.Item
        name="title"
        rules={[
          {
            validator: async (_:unknown, value: string) => {
              const errorMsg = validationTodoTitle(value);
              return errorMsg ? Promise.reject(new Error(errorMsg)) : Promise.resolve();
            }
          }
        ]}
        style={{ flexGrow: 1, marginBottom: 0 }}
      >
        <Input
          placeholder={placeholder}
          disabled={loading}
        />
      </Form.Item>

      <Form.Item>
        <Space>
          <Button
            htmlType="submit"
            loading={loading}
            icon={ isEditMode ? <CheckOutlined /> : undefined }
            type={ isEditMode ? "default" : "primary" }
          >
            { isEditMode ? "" : "Add Task" }
          </Button>
          {isEditMode && onCancel && (
            <Button
              disabled={loading}
              icon={<CloseOutlined />}
              onClick={onCancel}
              style={{color: 'red'}}
            />
          )}
        </Space>
      </Form.Item>
    </Form>
  )
}
