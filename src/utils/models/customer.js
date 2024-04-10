import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  organizationName: String,
  yourName: String,
  contactPhoneNumber: Number,
  email: String,
  role: String,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
