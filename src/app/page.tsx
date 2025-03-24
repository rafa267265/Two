'use client';

import React, { useState, useEffect } from 'react';
import TodoList from '@/components/TodoList';
import { db } from '@/lib/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';

interface TodoType {
  id: string;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'todos'), (snapshot) => {
      const todoList: TodoType[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        text: doc.data().text,
        completed: doc.data().completed,
      }));
      setTodos(todoList);
    });

    return () => unsubscribe(); // Clean up the listener
  }, []);

  const addTodo = async () => {
    if (newTodo.trim()) {
      await addDoc(collection(db, 'todos'), { text: newTodo, completed: false });
      setNewTodo('');
    }
  };

  const toggleTodo = async (id: string) => {
    const todoDoc = doc(db, 'todos', id);
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      await updateDoc(todoDoc, { completed: !todo.completed });
    }
  };

  const deleteTodo = async (id: string) => {
    const todoDoc = doc(db, 'todos', id);
    await deleteDoc(todoDoc);
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