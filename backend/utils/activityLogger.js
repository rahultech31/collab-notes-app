import ActivityLog from '../models/ActivityLog.js';

/**
 * Function to log activity in ActivityLog collection.
 * @param {String} action - The action (create, update, delete, etc.)
 * @param {ObjectId} noteId - The ID of the note being modified
 * @param {ObjectId} userId - The ID of the user performing the action
 * @param {String} changes - Optional description of the changes (for update)
 */
export const logActivity = async (action, noteId, userId, changes = null) => {
  try {
    const activityLog = new ActivityLog({
      action,
      noteId,
      userId,
      changes,
      timestamp: new Date(),
    });

    await activityLog.save();
  } catch (error) {
    console.error('Error logging activity:', error.message);
  }
};
