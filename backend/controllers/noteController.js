import Note from '../models/Note.js';
import User from '../models/User.js';
import { logActivity } from '../utils/activityLogger.js';

// Create a new note
export const createNote = async (req, res) => {
  const { title, content } = req.body;

  try {
    const note = new Note({
      title,
      content,
      createdBy: req.user._id,
    });

    await note.save();
    await logActivity('create', note._id, req.user._id);
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Error creating note', error: error.message });
  }
};

// Get all notes (admin and user can access)
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().populate('createdBy', 'name email');
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notes', error: error.message });
  }
};

// Get notes for specific user
export const getUserNotes = async (req, res) => {
  try {
    const notes = await Note.find({ createdBy: req.user._id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user notes', error: error.message });
  }
};

// Update the note status (admin and user can update their own notes)
export const updateNoteStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });

    // Check if the user is allowed to update this note
    if (note.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'You are not authorized to update this note' });
    }

    note.status = status;
    await note.save();
    await logActivity('update', note._id, req.user._id, changes);

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: 'Error updating note', error: error.message });
  }
};

// Delete a note (admin and user can delete their own notes)
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });

    // Check if the user is allowed to delete this note
    if (note.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'You are not authorized to delete this note' });
    }

    await note.remove();
    await logActivity('delete', note._id, req.user._id, 'Note deleted');
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting note', error: error.message });
  }
};



export const updateNote = async (req, res) => {
  const { title, content } = req.body;

  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });

    if (note.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'You are not authorized to edit this note' });
    }

    const changes = `Title changed to: ${title}, Content changed to: ${content.substring(0, 50)}...`;

    note.title = title || note.title;
    note.content = content || note.content;
    await note.save();

    await logActivity('update', note._id, req.user._id, changes);

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: 'Error updating note', error: error.message });
  }
};
