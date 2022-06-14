import mongoose from 'mongoose';

export interface User extends mongoose.Document {
  id: string;
  name: string;
  username: string;
  email: string;
  address: string;
  phone: number;
}

export const UserSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  address: String,
  phone: Number,
});
