import express from 'express';
import { createNote, getAllNotes, getUserNotes, updateNoteStatus, deleteNote, updateNote } from '../controllers/noteController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import ActivityLog from '../models/ActivityLog.js';

const router = express.Router();

router.get('/', protect, authorizeRoles('admin', 'user', 'viewer'), getAllNotes);

router.post('/', protect, authorizeRoles('admin', 'user'), createNote);

router.get('/user', protect, authorizeRoles('admin', 'user' , "viewer"), getUserNotes);

router.patch('/:id/status', protect, authorizeRoles('admin', 'user'), updateNoteStatus);

router.delete('/:id', protect, authorizeRoles('admin', 'user'), deleteNote);

router.put('/:id', protect, updateNote);
router.get('/activity/logs', protect, async (req, res) => {
    try {
      const userId = req.user.id; // Assuming the token contains the user's ID
      const activityLogs = await ActivityLog.find({ userId })
        .sort({ timestamp: -1 })  // Sort by timestamp in descending order
        .limit(10)  // Limit to the 10 most recent logs
        .populate('noteId', 'title')  // Optional: Populate noteId to get the note title
        .populate('userId', 'name');  // Optional: Populate userId to get user name
  
      return res.status(200).json(activityLogs);
    } catch (error) {
      console.error('Error fetching activity logs:', error);
      return res.status(500).json({ message: 'Error fetching activity logs' });
    }
  });
export default router;
