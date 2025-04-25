import { useNotesContext } from "../context/NotesContext";
import Sidebar from "./Sidebar";
import ActivityLog from "./Activitylog";
import "./NotesApp.css";
import NoteEditor from "./Notebook_edit/Noteeditor";

export default function NotesApp() {
  const { notes, currentNote, activities, loading, error } = useNotesContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="notes-app-container">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="main-content">
        {currentNote && (
          <NoteEditor note={currentNote} onSave={() => {}} />
        )}
        <ActivityLog activities={activities} />
      </div>
    </div>
  );
}
