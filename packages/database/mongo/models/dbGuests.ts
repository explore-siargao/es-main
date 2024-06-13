import mongoose from "mongoose"
const { Schema } = mongoose
const genderEnum = ["M", "F", "N/A"]

const governmentId = new Schema({
  fileKey: String,
  type: String,
  createdAt: Date,
})

const guests = new Schema({
  firstName: String,
  middleName: {
    type: String,
    required: false,
  },
  lastName: String,
  language: String,
  currency: String,
  gender: {
    type: String,
    enum: genderEnum,
    required: false,
  },
  phone: String,
  cellPhone: String,
  governmentId: {
    type: [governmentId],
    required: false,
  },
  country: String,
  address: {
    type: mongoose.Schema.ObjectId,
    ref: "Addresses",
  },
  emergencyContacts: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "emergencyContacts",
    },
  ],
  birthDate: {
    type: Date,
    required: false,
  },
  documentType: {
    type: String,
    required: false,
  },
  documentNumber: {
    type: String,
    required: false,
  },
  documentIssueDate: {
    type: Date,
    required: false,
  },
  documentIssuingCountry: {
    type: String,
    required: false,
  },
  documentExpirationDate: {
    type: Date,
    required: false,
  },
  companyTaxId: {
    type: Number,
    required: false,
  },
  companyName: {
    type: String,
    required: false,
  },
  confirm: {
    type: String,
    required: false,
  },
  profile: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  deletedAt: Date,
})

export default mongoose.model("Guests", guests)
