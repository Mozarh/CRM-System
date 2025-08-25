import type {TodoFormValues} from "../../types/todo.ts";
import {TaskTitleForm} from "../TaskTitleForm/TaskTitleForm.tsx";

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
      onFinish={onSave}
      onCancel={onCancel}
      isEditMode={true}
      placeholder="Changing the task?"
    />
  )
}