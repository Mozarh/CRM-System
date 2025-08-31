import type {TodoFormValues} from "../../types/todo.ts";
import {TaskTitleForm} from "../TaskTitleForm/TaskTitleForm.tsx";
import {Button, Space} from "antd";
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
  return (
    <TaskTitleForm
      initialValue={initialTitle}
      loading={loading}
      onSubmit={onSave}
      placeholder="Changing the task?"
    >
      <Space>
        <Button htmlType="submit" loading={loading} type="primary" icon={<CheckOutlined />}/>
        <Button onClick={onCancel} disabled={loading} icon={<CloseOutlined />} />
      </Space>
    </TaskTitleForm>


  )
}