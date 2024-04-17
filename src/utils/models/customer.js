// customer.js (or wherever your Mongoose schema is defined)
import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  organizationName: String,
  yourName: String,
  contactPhoneNumber: Number,
  email: String,
  role: String,
  submissionTime: String
});

const Customer = mongoose.models.Customer || mongoose.model("Customer", customerSchema);

export default Customer;
