import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';
import TodoList from './pages/TodoList';
import Notes from './pages/Notes';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <Navbar />
            <main className="max-w-7xl mx-auto p-4">
              <Routes>
                <Route path="/" element={<TodoList />} />
                <Route path="/notes" element={<Notes />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </AppProvider>
    </ThemeProvider>
  );
}