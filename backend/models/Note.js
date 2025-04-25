import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  title: { type: String, required: false },
  content: { type: String, required: false },  // Will store the rich text
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['open', 'completed'], default: 'open' },  // Note status
}, { timestamps: true });

export default mongoose.model('Note', noteSchema);
