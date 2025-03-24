import React from 'react';

const colors = [
    '#FFEB3B', // Yellow
    '#FF9800', // Orange
    '#F44336', // Red
    '#E91E63', // Pink
    '#9C27B0', // Purple
    '#3F51B5', // Indigo
    '#2196F3', // Blue
    '#03A9F4', // Light Blue
    '#4CAF50', // Green
    '#8BC34A', // Light Green
    '#CDDC39', // Lime
    '#FFC107', // Amber
];

const ColorPicker = ({ currentColor, onColorChange, show }) => {
    // If show is false, don't render anything
    if (!show) return null;
    
    return (
        <div className="color-picker">
            {colors.map(color => (
                <div
                    key={color}
                    className={`color-option ${currentColor === color ? 'selected' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => onColorChange(color)}
                />
            ))}
        </div>
    );
};

export default ColorPicker;