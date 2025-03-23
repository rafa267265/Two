// src/app/page.tsx
'use client';

import React, { useState } from 'react';
import TodoList from '@/components/TodoList';

export default function Home() {
  const [todos, setTodos] = useState<{ id: number; text: string; completed: boolean }[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [nextId, setNextId] = useState(1);

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: nextId, text: newTodo, completed: false }]);
      setNewTodo('');
      setNextId(nextId + 1);
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="max-w-3xl w-full">
        <h1 className="text-4xl font-bold mb-8 text-center">Todo App</h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-1 p-2 border border-gray-300 rounded-l-md"
          />
          <button onClick={addTodo} className="bg-indigo-600 text-white p-2 rounded-r-md">
            Add
          </button>
        </div>
        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      </div>
    </main>
  );
}