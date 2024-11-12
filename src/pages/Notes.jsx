import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import NotesList from '../components/NoteList';
import NoteEditor from '../components/NoteEditor';

export default function Notes() {
  const [activeNote, setActiveNote] = useState(null);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold dark:text-white">Notes</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <NotesList
          onSelectNote={setActiveNote}
          activeNote={activeNote}
        />
        <div className="md:col-span-2">
          <NoteEditor
            activeNote={activeNote}
            onCancel={() => setActiveNote(null)}
          />
        </div>
      </div>
    </div>
  );
}