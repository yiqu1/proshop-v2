import bcrypt from "bcryptjs";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

// define instance method on User documents, return a Promise of true/false
userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// Mongoose pre-save middleware for hashing passwords before saving a user to the database
userSchema.pre("save", async function (next) {
  // checks if the password field has changed.
  if (!this.isModified("password")) {
    // If the password was not modified, we skip hashing and call next() immediately.
    next();
  }

  // Hash the password
  // Generate a salt with cost factor 10.
  const salt = await bcrypt.genSalt(10);
  // Hash the password with the salt.
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
