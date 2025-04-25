// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { Note, Activity } from '../utils/types';
// import axiosInstance from '../components/axiosInstance';

// interface NotesContextType {
//   notes: Note[];
//   activities: Activity[];
//   currentNote: Note | null;
//   selectedNoteId: string | null;
//   loading: boolean;
//   error: string | null;
//   fetchActivities: any
//   handleNoteSelect: (id: string) => void;
//   handleNewNote: () => Promise<void>;
//   handleSaveNote: () => Promise<void>;
// }

// const NotesContext = createContext<NotesContextType | undefined>(undefined);

// export const NotesProvider: React.FC = ({ children }) => {
//   const [notes, setNotes] = useState<Note[]>([]);
//   const [activities, setActivities] = useState<Activity[]>([]);
//   const [currentNote, setCurrentNote] = useState<Note | null>(null);
//   const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchNotes = async () => {
//       try {
//         const response = await axiosInstance.get('notes/user', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         });
//         setNotes(response.data);
//         setCurrentNote(response.data[0] || null);
//         setSelectedNoteId(response.data[0]?._id || null);
//       } catch (error) {
//         setError('Error fetching notes');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNotes();
//   }, []);  // This effect runs only once when the component is mounted

//   const handleNoteSelect = (id: string) => {
//     setSelectedNoteId(id);
//     const selectedNote = notes.find((note) => note._id === id);
//     setCurrentNote(selectedNote || null);
//   };

//   const handleNewNote = async () => {
//     try {
//       const response = await axiosInstance.post(
//         'notes',
//         {
//           title: `New Note`,
//           content: '',
//           status: 'open',
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         }
//       );

//       setNotes((prevNotes) => [...prevNotes, response.data]);
//       setCurrentNote(response.data);
//     } catch (error) {
//       setError('Error creating new note');
//     }
//   };

//   const handleSaveNote = async () => {
//     try {
//       if (currentNote) {
//         const response = await axiosInstance.put(
//           `notes/${currentNote._id}`,
//           {
//             title: currentNote.title,
//             content: currentNote.content,
//             status: currentNote.status,
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem('token')}`,
//             },
//           }
//         );

//         setNotes((prevNotes) =>
//           prevNotes.map((note) =>
//             note._id === currentNote._id ? { ...note, ...response.data } : note
//           )
//         );


//       }
//     } catch (error) {
//       setError('Error saving note');
//     }
//   };


//   const fetchActivities = async () => {
//     try {
//       const response = await axiosInstance.get('notes/activity/logs', {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       setActivities(response.data);
//     } catch (error) {
//       setError('Error fetching activity logs');
//     }
//   };
  
//   useEffect(() => {
//     fetchActivities();
//   }, []);
//   return (
//     <NotesContext.Provider
//       value={{
//         notes,
//         activities,
//         currentNote,
//         selectedNoteId,
//         loading,
//         error,
//         handleNoteSelect,
//         handleNewNote,
//         handleSaveNote,
//         fetchActivities
//       }}
//     >
//       {children}
//     </NotesContext.Provider>
//   );
// };

// export const useNotesContext = () => {
//   const context = useContext(NotesContext);
//   if (!context) {
//     throw new Error('useNotesContext must be used within a NotesProvider');
//   }
//   return context;
// };



import React, { createContext, useContext, useState, useEffect } from 'react';
import { Note, Activity } from '../utils/types';
import axiosInstance from '../components/axiosInstance';

interface NotesContextType {
  notes: Note[];
  activities: Activity[];
  currentNote: Note | null;
  selectedNoteId: string | null;
  loading: boolean;
  error: string | null;
  fetchActivities: () => Promise<void>;
  handleNoteSelect: (id: string) => void;
  handleNewNote: () => Promise<void>;
  handleSaveNote: () => Promise<void>;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider: React.FC = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axiosInstance.get('notes/user', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setNotes(response.data);
        setCurrentNote(response.data[0] || null);
        setSelectedNoteId(response.data[0]?._id || null);
      } catch (error) {
        setError('Error fetching notes');
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);  // This effect runs only once when the component is mounted

  const handleNoteSelect = (id: string) => {
    setSelectedNoteId(id);
    const selectedNote = notes.find((note) => note._id === id);
    setCurrentNote(selectedNote || null);
  };

  const fetchActivities = async () => {
    try {
      const response = await axiosInstance.get('notes/activity/logs', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setActivities(response.data);
    } catch (error) {
      setError('Error fetching activity logs');
    }
  };

  const handleNewNote = async () => {
    try {
      const response = await axiosInstance.post(
        'notes',
        {
          title: `New Note`,
          content: '',
          status: 'open',
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setNotes((prevNotes) => [...prevNotes, response.data]);
      setCurrentNote(response.data);
      
      // Fetch updated activity logs after creating a new note
      await fetchActivities();
    } catch (error) {
      setError('Error creating new note');
    }
  };

  const handleSaveNote = async () => {
    try {
      if (currentNote) {
        // Store the original note for comparison
        const originalNote = notes.find(note => note._id === currentNote._id);
        
        const response = await axiosInstance.put(
          `notes/${currentNote._id}`,
          {
            title: currentNote.title,
            content: currentNote.content,
            status: currentNote.status,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note._id === currentNote._id ? { ...note, ...response.data } : note
          )
        );

        // After successfully saving the note, fetch updated activity logs
        await fetchActivities();
      }
    } catch (error) {
      setError('Error saving note');
    }
  };
  
  

  const handleDeleteNote = async (id: string) => {
    try {
      await axiosInstance.delete(`notes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      // Update the notes state by filtering out the deleted note
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));

      // If the deleted note was the current note, select another note
      if (selectedNoteId === id) {
        const remainingNotes = notes.filter((note) => note._id !== id);
        if (remainingNotes.length > 0) {
          setCurrentNote(remainingNotes[0]);
          setSelectedNoteId(remainingNotes[0]._id);
        } else {
          setCurrentNote(null);
          setSelectedNoteId(null);
        }
      }

      // Fetch updated activity logs after deleting the note
      await fetchActivities();
    } catch (error) {
      setError('Error deleting note');
    }
  };
  
  useEffect(() => {
    fetchActivities();
  }, []);



  return (
    <NotesContext.Provider
      value={{
        notes,
        activities,
        currentNote,
        selectedNoteId,
        loading,
        error,
        handleNoteSelect,
        handleNewNote,
        handleSaveNote,
        fetchActivities,
        handleDeleteNote
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotesContext = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotesContext must be used within a NotesProvider');
  }
  return context;
};