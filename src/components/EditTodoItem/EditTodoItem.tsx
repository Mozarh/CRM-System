import type {TodoFormValues} from "../../types/todo.ts";
import {TaskTitleForm} from "../TaskTitleForm/TaskTitleForm.tsx";
import {Button, Space, Form} from "antd";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";

interface EdiTodoItemProps {
  initialTitle: string;
  loading: boolean;
  onCancel: () => void;
  onSave: (values: TodoFormValues) => void;
}

export const EditTodoItem: React.FC<EdiTodoItemProps> = ({
  initialTitle,
  loading,
  onCancel,
  onSave,
}) => {
  const [form] = Form.useForm<TodoFormValues>()

  return (
    <>
      <TaskTitleForm
        form={form}
        initialValue={initialTitle}
        loading={loading}
        onFinish={onSave}
        placeholder="Changing the task?"
      />
        <Space>
          <Button loading={loading} type="primary" icon={<CheckOutlined />} onClick={()=> form.submit()}/>
          <Button onClick={onCancel} disabled={loading} icon={<CloseOutlined />} />
        </Space>
    </>
  )
}