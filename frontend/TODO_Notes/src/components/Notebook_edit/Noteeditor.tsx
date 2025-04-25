import React, { useEffect, useState } from 'react';
import { useNotesContext } from '../../context/NotesContext';
import './NoteEditor.css'; // Make sure to create custom styles for better design

const NoteEditor: React.FC = () => {
  const {
    currentNote,  // The current note
    handleSaveNote,  // Function to save the note
  } = useNotesContext();

  const [title, setTitle] = useState(currentNote?.title || '');
  const [content, setContent] = useState(currentNote?.content || '');
  const [lastSaved, setLastSaved] = useState<string>('');
  
  useEffect(() => {
    // Sync local state with the current note when it changes
    if (currentNote) {
      setTitle(currentNote.title);
      setContent(currentNote.content);
    }
  }, [currentNote]);

  // Auto-save content every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (content !== currentNote?.content) {
        handleSave();
        setLastSaved(new Date().toLocaleTimeString());
      }
    }, 10000); // 10 seconds interval

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [content, currentNote]);

  const handleSave = async () => {
    // Trigger save when the user clicks the save button
    if (currentNote) {
      currentNote.title = title;
      currentNote.content = content;
    }
    await handleSaveNote();
    setLastSaved(new Date().toLocaleTimeString()); // Update last saved time
  };

  if (!currentNote) {
    return <div className="note-editor-container">No note selected</div>;
  }

  return (
    <div className="note-editor-container">
      <div className="note-editor-header">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note Title"
          className="note-editor-title-input"
        />
        <div className="note-editor-header-actions">
          <button className="note-editor-save-button" onClick={handleSave}>
            Save Now
          </button>
          <span className="note-editor-last-saved">
            Last saved: {lastSaved}
          </span>
        </div>
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start typing your note here..."
        className="note-editor-textarea"
      />

      <div className="note-editor-footer">
        <p>Auto-saving every 10 seconds...</p>
      </div>
    </div>
  );
};

export default NoteEditor;
