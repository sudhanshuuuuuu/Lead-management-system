import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"] },
  email: { type: String, required: [true, "Email is required"] },
  contact: { 
    type: String, 
    required: [true, "Contact is required"], 
    match: [/^[0-9]{10}$/, "Please enter a valid 10-digit number"] 
  },
  service: { type: String },
  source: { type: String, default: "Website" },
  status: { type: String, enum: ["open", "closed"], default: "open" }, 
  createdAt: { type: Date, default: Date.now },
});

const Lead = mongoose.models.Lead || mongoose.model("Lead", leadSchema);
export default Lead;
