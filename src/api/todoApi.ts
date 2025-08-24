import type {
  FilterStatus,
  MetaResponse,
  Todo,
  TodoInfo,
  TodoRequest,
} from '../types/todo.ts';
import axios from  'axios';

const API_URL = 'https://easydev.club/api/v1';

export async function getTodos(
  status?: FilterStatus
): Promise<MetaResponse<Todo, TodoInfo>> {
  const response = await axios.get<MetaResponse<Todo, TodoInfo>>(
    `${API_URL}/todos`,
    {
      params: status && status !== "all" ? {filter: status}: undefined,
    }
  )
  return response.data
}

export async function addTodo(data: TodoRequest): Promise<Todo> {
  const response = await axios.post<Todo>(`${API_URL}/todos`, data)
  return response.data
}


export async function updateTodo(id: number, data: TodoRequest): Promise<Todo> {
  const response = await axios.put<Todo>(`${API_URL}/todos/${id}`, data)
  return response.data
}

export async function deleteTodo(id: number): Promise<{ success: boolean }> {
  await axios.delete(`${API_URL}/todos/${id}`);
  return { success: true };
}
