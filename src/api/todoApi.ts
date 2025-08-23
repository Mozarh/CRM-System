import type {
  FilterStatus,
  MetaResponse,
  Todo,
  TodoInfo,
  TodoRequest,
} from '../types/todo.ts';

const API_URL = 'https://easydev.club/api/v1';

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${API_URL}${url}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getTodos(
  status?: FilterStatus
): Promise<MetaResponse<Todo, TodoInfo>> {
  const params = new URLSearchParams();
  if (status && status !== 'all') {
    params.append('filter', status);
  }
  const query = params.toString();
  return await request<MetaResponse<Todo, TodoInfo>>(
    `/todos${query ? `?${query}` : ''}`
  );
}

export async function addTodo(data: TodoRequest): Promise<Todo> {
  return await request<Todo>(`/todos`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateTodo(id: number, data: TodoRequest): Promise<Todo> {
  return await request<Todo>(`/todos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteTodo(id: number): Promise<{ success: boolean }> {
  await fetch(`${API_URL}/todos/${id}`, {
    method: 'DELETE',
  });
  return { success: true };
}
