import mongoose from "mongoose"
const { Schema } = mongoose
const genderEnum = ["M", "F", "N/A"]

const status = ["Approved", "Pending", "Rejected"]
const businessPermit = new Schema({
  fileKey: String,
  createdAt: Date,
})

const hostApproval = new Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
  },
  businessType: String,
  companyName: String,
  brn: String,
  registeredAddress: String,
  photocopyBusinessPermit: {
    type: businessPermit,
    required: false,
  },
  status: {
    type: String,
    enum: status,
    default: "Pending",
  },
  approvedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
    required: false,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  deletedAt: Date,
})

export default mongoose.model("HostApproval", hostApproval)
