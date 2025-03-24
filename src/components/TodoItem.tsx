// src/components/TodoItem.tsx
import React from 'react';

interface TodoItemProps {
  id: string; // Change id type to string
  text: string;
  completed: boolean;
  onToggle: (id: string) => void; // Change id type to string
  onDelete: (id: string) => void; // Change id type to string
}

const TodoItem: React.FC<TodoItemProps> = ({ id, text, completed, onToggle, onDelete }) => {
  return (
    <li className="flex items-center justify-between py-2 border-b border-gray-200">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(id)}
          className="mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <span className={`flex-1 ${completed ? 'line-through text-gray-500' : 'text-gray-200'}`}>{text}</span>
      </div>
      <button onClick={() => onDelete(id)} className="text-red-500 hover:text-red-700">
        Delete
      </button>
    </li>
  );
};

export default TodoItem;