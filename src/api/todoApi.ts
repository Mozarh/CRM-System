import type {FilterStatus, MetaResponse, Todo, TodoInfo, TodoRequest} from "../types/todo.ts";

const API_URL = "https://easydev.club/api/v1";

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${API_URL}${url}`, {
      headers: {"Content-Type": "application/json" },
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

export const todoApi ={

  async getTodos(status?: FilterStatus) {
    const query = status && status !== "all" ? `?filter=${status}` : "";
    return await request<MetaResponse<Todo, TodoInfo>>(
      `/todos${query}`,
    )
  },

  async addTodo(data: TodoRequest) {
    return await request<Todo>(`/todos`, {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  async updateTodo(id: number, data: TodoRequest) {
    return await request<Todo>(`/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  },

  async deleteTodo(id: number) {
    await fetch(`${API_URL}/todos/${id}`, {
      method: "DELETE",
    })
    return {success: true}
  },
}
