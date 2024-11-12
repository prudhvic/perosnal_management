import React from 'react';
import { useApp } from '../context/AppContext';

export default function NotesList({ onSelectNote, activeNote }) {
  const { state, dispatch } = useApp();

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Notes List
      </h3>
      {state.notes.map(note => (
        <div
          key={note.id}
          className={`border dark:border-gray-700 p-3 rounded-lg cursor-pointer
            hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors
            ${activeNote?.id === note.id ? 'bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700' : ''}
          `}
          onClick={() => onSelectNote(note)}
        >
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-gray-900 dark:text-white">{note.title}</h4>
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch({ type: 'DELETE_NOTE', payload: note.id });
                if (activeNote?.id === note.id) {
                  onSelectNote(null);
                }
              }}
              className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-1"
            >
              <DeleteIcon />
            </button>
          </div>
        </div>
      ))}
      {state.notes.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400 text-center py-4">
          No notes yet
        </p>
      )}
    </div>
  );
}