export const generateUniqueId = () => {
    return 'note-' + Math.random().toString(36).substr(2, 9);
};

export const getCurrentDateTime = () => {
    return new Date().toLocaleString();
};

export const isValidNote = (note) => {
    return note && note.content && note.position && note.color;
};