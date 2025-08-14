import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // required text field
    email: { type: String, required: true, unique: true, lowercase: true }, // required, must be unique(no duplicate emails), automatically lowercased
    password: { type: String, required: true }, // required text field. Stored hashed (not plain text)
    role: { type: String, enum: ["user", "admin"], default: "user" } // role can only be user or admin, defaults to user
  },
  { timestamps: true } // automatically adds createdAt and updatedAt fields to each user record
);

// Hash password before save. This ensures no plain text passwords are ever stored in the database.
userSchema.pre("save", async function (next) { // runs before any user is saved (pre("save") hook)
  if (!this.isModified("password")) return next(); // if the password hasn't been changed, it skips hashing
  // If the password is new or modified, it generates a salt (bcrypt.genSalt(10)). Hashes the password (bcrypt.hash(this.password, salt)). Replaces the plain password with the hashed one
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default mongoose.model("User", userSchema); // This creates a User model based on the schema, which you can use throughout your app: User.create({...}) → create a user, User.findOne({ email }) → find a user, User.findById(id) → find by ID.
