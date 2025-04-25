import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema({
  action: { type: String, required: true }, // 'create', 'update', 'delete'
  noteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Note', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  changes: { type: String },  // Description of what changed (can be optional for 'create' or 'delete')
  timestamp: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model('ActivityLog', activityLogSchema);
