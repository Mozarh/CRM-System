import {useEffect, useState} from "react";
import {TodoForm} from "./TodoForm.tsx";
import {TodoList} from "./Todo.tsx";
import {TaskTabs} from "./TaskTabs.tsx";
import {EditTodoForm} from "./EditTodoForm.tsx";
import type {FilterStatus, Todo, TodoInfo} from "../types/todo.ts";
import {todoApi} from "../api/todoApi.ts";


export const TodoWrapper = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeTab, setActiveTab] = useState<FilterStatus>("all");
  const [counts, setCounts] = useState<TodoInfo>({all:0, completed: 0, inWork: 0 });
  const [editing, setEditing] = useState<number | null>(null);

  const fetchTodos = async (filter: FilterStatus) => {
    try {
      const res = await todoApi.getTodos(filter);
      setTodos(res.data)
      if(res.info) setCounts(res.info)
    } catch (error) {
      console.error("Ошибка при получении задач", error)
    }
  };

  useEffect(()=>{
    fetchTodos(activeTab)
  }, [activeTab]);

  const addTodo = async (title: string) => {
    try {
      await todoApi.addTodo({title, isDone: false});
      fetchTodos(activeTab)
    } catch (error) {
      console.error("Ошибка при добавлении задачи:", error);
    }
  };

  const toggleComplete = async (id: number, isDone: boolean ) => {
    try {
      await todoApi.updateTodo(id, {isDone: !isDone})
      fetchTodos(activeTab)
    } catch (error) {
      console.error("Ошибка при обновлении задачи:", error);
    }
  }

  const deleteTodo = async (id: number) => {
    try {
      await todoApi.deleteTodo(id)
      fetchTodos(activeTab)
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);
    }
  }

  const editTask = async (title: string, id: number) => {
    try {
      await todoApi.updateTodo(id, {title});
      setEditing(null);
      fetchTodos(activeTab)
    } catch (error) {
      console.error("Ошибка при редактировании задачи:", error);
    }
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