import mongoose from 'mongoose';

const db = mongoose.connection;

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dndSaveData'
);

export default db;
