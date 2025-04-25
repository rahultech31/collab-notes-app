import { useNotesContext } from "../context/NotesContext";
import "./Sidebar.css";

export default function Sidebar() {
  const { 
    notes, 
    handleNoteSelect, 
    handleNewNote, 
    handleDeleteNote, 
    selectedNoteId 
  } = useNotesContext();

  // Prevent click propagation when clicking the delete button
  const handleDeleteClick = (e, noteId) => {
    e.stopPropagation();
    handleDeleteNote(noteId);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-title">Collaborative Notes App</h1>
      </div>
      <div className="sidebar-controls">
        <button onClick={handleNewNote} className="sidebar-button">
          New Note
        </button>
      </div>
      <div className="sidebar-notes-list">
        <ul>
          {notes.map((note) => (
            <li
              key={note._id}
              className={`sidebar-note-item ${note._id === selectedNoteId ? "selected" : ""}`}
              onClick={() => handleNoteSelect(note._id)}
            >
              <div className="note-item-content">
                <div className="note-title">{note.title}</div>
                <div className="note-createdAt">
                  {new Date(note.createdAt).toLocaleString()}
                </div>
                <div className="note-status">{note.status}</div>
              </div>
              <button 
                className="delete-note-button"
                onClick={(e) => handleDeleteClick(e, note._id)}
                aria-label="Delete note"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                  <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}