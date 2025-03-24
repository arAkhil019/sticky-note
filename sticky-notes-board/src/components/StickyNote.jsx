import React, { useState } from 'react';
import ColorPicker from './ColorPicker';
import '../styles/StickyNote.css';

const StickyNote = ({ note, deleteNote, updateNote }) => {
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const handleDelete = () => deleteNote(note.id);
    const handleContentChange = (e) => updateNote(note.id, { ...note, content: e.target.value });
    const handleColorChange = (color) => { updateNote(note.id, { ...note, color }); setShowColorPicker(false); };
    const handleDragStart = () => setIsDragging(true);
    const handleDragEnd = (e) => {
        setIsDragging(false);
        updateNote(note.id, { 
            ...note, 
            position: { x: note.position.x + e.clientX - e.startX, y: note.position.y + e.clientY - e.startY }
        });
    };

    return (
        <div className="sticky-note" style={{ backgroundColor: note.color, left: note.position.x, top: note.position.y, cursor: isDragging ? 'grabbing' : 'grab' }} draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="note-header">
                <div className="note-controls">
                    <button className="note-btn" onClick={() => setShowColorPicker(!showColorPicker)} title="Change color">🎨</button>
                    <button className="note-btn" onClick={handleDelete} title="Delete note">✖️</button>
                </div>
            </div>
            <textarea className="note-content" value={note.content} onChange={handleContentChange} placeholder="Write your note here..." onClick={(e) => e.stopPropagation()} />
            <ColorPicker currentColor={note.color} onColorChange={handleColorChange} show={showColorPicker} />
        </div>
    );
};

export default StickyNote;