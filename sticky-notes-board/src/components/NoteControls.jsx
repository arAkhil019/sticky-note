import React from 'react';

const NoteControls = ({ addNote, clearAllNotes }) => {
  return (
    <div className="board-controls">
      <button 
        className="add-note-btn" 
        onClick={addNote}
        title="Add new note"
      >
        +
      </button>
      <button 
        className="clear-all-btn" 
        onClick={clearAllNotes}
        title="Delete all notes"
      >
        🗑️
      </button>
    </div>
  );
};

export default NoteControls;