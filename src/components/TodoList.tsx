// src/components/TodoList.tsx
import React from 'react';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: { id: string; text: string; completed: boolean }[]; // Change id type to string
  onToggle: (id: string) => void; // Change id type to string
  onDelete: (id: string) => void; // Change id type to string
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete }) => {
  return (
    <ul className="mt-4">
      {todos.map((todo) => (
        <TodoItem key={todo.id} {...todo} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
};

export default TodoList;