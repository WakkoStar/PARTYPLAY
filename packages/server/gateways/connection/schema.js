import mongoose from 'mongoose';

const userRoom = new mongoose.Schema({
  name: String,
  code: String,
  socketId: String,
  isActive: { type: Boolean, default: true },
  isHost: { type: Boolean, default: false },
});

export default mongoose.model('userRoom', userRoom);
