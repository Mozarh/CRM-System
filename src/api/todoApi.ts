import type {
  FilterStatus,
  MetaResponse,
  Todo,
  TodoInfo,
  TodoRequest,
} from '../types/todo.ts';
import axios from  'axios';

const API_URL = 'https://easydev.club/api/v1';

const instance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
})

export async function getTodos(
  status?: FilterStatus
): Promise<MetaResponse<Todo, TodoInfo>> {
  const response = await instance.get<MetaResponse<Todo, TodoInfo>>(
    `${API_URL}/todos`,
    {
      params: status && status !== "all" ? {filter: status}: undefined,
    }
  )
  return response.data
}

export async function addTodo(data: TodoRequest): Promise<Todo> {
  const response = await instance.post<Todo>(`/todos`, data)
  return response.data
}


export async function updateTodo(id: number, data: TodoRequest): Promise<Todo> {
  const response = await instance.put<Todo>(`/todos/${id}`, data)
  return response.data
}

export async function deleteTodo(id: number): Promise<void> {
  await instance.delete(`/todos/${id}`);
}
