import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  isPhoneVerified: {
    type: Boolean,
    default: false,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  avatar: {
    type: String,
    default: '',
  },
  birthdate: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    default: 'other',
  },
  phone: {
    type: String,
    trim: true,
  },
  isLocked: {
    type: Boolean,
    default: false,
  },
  is_user: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model('User', userSchema);
