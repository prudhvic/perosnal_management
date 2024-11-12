import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export default function NoteEditor({ activeNote, onCancel }) {
  const { dispatch } = useApp();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (activeNote) {
      setTitle(activeNote.title);
      setContent(activeNote.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [activeNote]);

  const handleSave = (e) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      if (activeNote) {
        dispatch({
          type: 'UPDATE_NOTE',
          payload: { id: activeNote.id, title, content }
        });
      } else {
        dispatch({
          type: 'ADD_NOTE',
          payload: { title, content }
        });
      }
      handleCancel();
    }
  };

  const handleCancel = () => {
    setTitle('');
    setContent('');
    onCancel();
  };

  return (
    <form onSubmit={handleSave} className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note title"
        className="w-full p-2 border dark:border-gray-700 rounded-lg
          bg-white dark:bg-gray-800 
          text-gray-900 dark:text-white
          placeholder-gray-500 dark:placeholder-gray-400"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Note content"
        className="w-full p-2 border dark:border-gray-700 rounded-lg h-48
          bg-white dark:bg-gray-800
          text-gray-900 dark:text-white
          placeholder-gray-500 dark:placeholder-gray-400"
      />
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 border dark:border-gray-700 rounded-lg
            hover:bg-gray-50 dark:hover:bg-gray-700
            text-gray-700 dark:text-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg
            hover:bg-blue-600 dark:hover:bg-blue-700"
        >
          {activeNote ? 'Update' : 'Save'} Note
        </button>
      </div>
    </form>
  );
}
