import {useEffect, useState} from "react";
import {TodoForm} from "./TodoForm.tsx";
import {TodoList} from "./Todo.tsx";
import {TaskTabs} from "./TaskTabs.tsx";
import {EditTodoForm} from "./EditTodoForm.tsx";
import type {FilterStatus, MetaResponse, Todo, TodoInfo} from "../types/todo.ts";

const API_URL = "https://easydev.club/api/v1";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeTab, setActiveTab] = useState<FilterStatus>("all");
  const [counts, setCounts] = useState<TodoInfo>({all:0, completed: 0, inWork: 0 });
  const [editing, setEditing] = useState<number | null>(null);

  const fetchTodos = async (filter: FilterStatus) => {
    const query = filter === "all" ? "" : `?filter=${filter}`;
    const res = await fetch(`${API_URL}/todos${query}`);
    if(!res.ok) return;
    const json: MetaResponse<Todo, TodoInfo> = await res.json();
    setTodos(json.data)
    if(json.info) setCounts(json.info)
  };

  useEffect(()=>{
    fetchTodos(activeTab)
  }, [activeTab]);

  const addTodo = async (title: string) => {
    await fetch(`${API_URL}/todos`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({title, isDone: false}),
    });
    fetchTodos(activeTab)
  };

  const toggleComplete = async (id: number, isDone: boolean ) => {
    await fetch(`${API_URL}/todos/${id}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({isDone: !isDone}),
    });
    fetchTodos(activeTab)
  };

  const deleteTodo = async (id: number) => {
    await fetch(`${API_URL}/todos/${id}`, {
      method: "DELETE",
    });
    fetchTodos(activeTab)
  }

  const editTask = async (title: string, id: number) => {
    await fetch(`${API_URL}/todos/${id}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({title}),
    })
    setEditing(null);
    fetchTodos(activeTab)
  }

  return (
    <div className="app">
      <h1 className='app-header'>Todo List</h1>
      <TodoForm addTodo={addTodo} />
      <TaskTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        countAll={counts.all}
        countDone={counts.completed}
        countInWork={counts.inWork}
      />

      {todos.map((todo) =>
        editing === todo.id ? (
          <EditTodoForm
            key={todo.id}
            editTodo={editTask}
            cancelEdit={() => setEditing(null)}
            task={todo}
          />
        ) : (
          <TodoList
            key={todo.id}
            task={todo}
            toggleComplete={() => toggleComplete(todo.id, todo.isDone)}
            deleteTodo={() => deleteTodo(todo.id)}
            editTodo={() => setEditing(todo.id)}
          />
        )
      )}
    </div>
  )
}