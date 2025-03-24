import React, { useState, useEffect } from 'react';
import StickyNote from './StickyNote';
import NoteControls from './NoteControls';
import useLocalStorage from '../hooks/useLocalStorage';
import '../styles/Board.css';

const Board = () => {
    const [notes, setNotes] = useLocalStorage('stickyNotes', []);
    
    const clearAllNotes = () => {
        if (window.confirm('Are you sure you want to delete all notes?')) {
            setNotes([]);
        }
    };

    const addNote = () => {
        // Calculate position for new note
        const noteWidth = 220; // Note width + padding
        const noteHeight = 220; // Note height + padding
        
        let newPosition = { x: 50, y: 50 }; // Default starting position
        
        if (notes.length > 0) {
            // Get the last note's position
            const lastNote = notes[notes.length - 1];
            
            // Place new note to the right of the last note
            newPosition.x = lastNote.position.x + noteWidth;
            newPosition.y = lastNote.position.y;
            
            // If it would go off the right edge, move to next row
            const maxWidth = window.innerWidth - noteWidth - 50;
            if (newPosition.x > maxWidth) {
                newPosition.x = 50; // Reset to left
                newPosition.y = lastNote.position.y + noteHeight; // Move down
            }
        }
        
        const newNote = {
            id: Date.now(),
            content: '',
            color: '#FFEB3B', // Default to yellow
            position: newPosition
        };
        
        setNotes([...notes, newNote]);
    };

    const deleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    const updateNote = (id, updatedNote) => {
        setNotes(notes.map(note => (note.id === id ? updatedNote : note)));
    };

    return (
        <div className="board">
            <NoteControls 
                addNote={addNote} 
                clearAllNotes={clearAllNotes} 
            />
            {notes.map(note => (
                <StickyNote
                    key={note.id}
                    note={note}
                    deleteNote={deleteNote}
                    updateNote={updateNote}
                />
            ))}
        </div>
    );
};

export default Board;