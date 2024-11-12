import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function TodoList() {
  const { state, dispatch } = useApp();
  const [newTodo, setNewTodo] = useState('');

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('todoId', id.toString());
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    const todoId = parseInt(e.dataTransfer.getData('todoId'));
    dispatch({ type: 'MOVE_TODO', payload: { id: todoId, status } });
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      dispatch({ type: 'ADD_TODO', payload: newTodo });
      setNewTodo('');
    }
  };

  const getTodosByStatus = (status) => {
    return state.todos.filter(todo => todo.status === status);
  };

  return (
    <div className="p-4">
      <form onSubmit={addTodo} className="mb-6">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="w-full p-2 border rounded-lg"
          placeholder="Add new todo..."
        />
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['todo', 'inProgress', 'done'].map((status) => (
          <div
            key={status}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, status)}
            className="border rounded-lg p-4"
          >
            <h3 className="text-lg font-semibold mb-4 capitalize dark:text-white">{status}</h3>
            {getTodosByStatus(status).map((todo) => (
              <div
                key={todo.id}
                draggable
                onDragStart={(e) => handleDragStart(e, todo.id)}
                className="bg-white p-3 rounded shadow mb-2 cursor-move"
              >
                <div className="flex justify-between items-center">
                  <span>{todo.text}</span>
                  <button
                    onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}