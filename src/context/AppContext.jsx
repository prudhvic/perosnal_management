import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AppContext = createContext();

const initialState = {
  todos: [],
  notes: []
};

function loadFromLocalStorage() {
  try {
    const data = localStorage.getItem('personalManager');
    return data ? JSON.parse(data) : initialState;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return initialState;
  }
}

function saveToLocalStorage(state) {
  try {
    localStorage.setItem('personalManager', JSON.stringify(state));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

function appReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, { id: Date.now(), text: action.payload, status: 'todo' }]
      };
    case 'MOVE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? { ...todo, status: action.payload.status } : todo
        )
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    case 'ADD_NOTE':
      return {
        ...state,
        notes: [...state.notes, { id: Date.now(), title: action.payload.title, content: action.payload.content }]
      };
    case 'UPDATE_NOTE':
      return {
        ...state,
        notes: state.notes.map(note =>
          note.id === action.payload.id ? { ...note, ...action.payload } : note
        )
      };
    case 'DELETE_NOTE':
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== action.payload)
      };
    default:
      return state;
  }
}
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState, loadFromLocalStorage);

  useEffect(() => {
    saveToLocalStorage(state);
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}