import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  name: {
    type: String, required: true, trim: true
  },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, trim: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);
export default User; // Export the User model for use in other parts of the application
// export { userSchema }; // Export the schema if needed for further customization or validation
// export { User }; // Export the User model for use in other parts of the application