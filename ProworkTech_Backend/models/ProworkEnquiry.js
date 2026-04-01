import mongoose from "mongoose";

const proworkEnquirySchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    service: { type: String, required: true },
    project: { type: String, required: true },
    status: { type: String, default: "New" } // Options: New, Read, Replied, Closed
}, { timestamps: true });

const ProworkEnquiry = mongoose.model("ProworkEnquiry", proworkEnquirySchema);

export default ProworkEnquiry;
