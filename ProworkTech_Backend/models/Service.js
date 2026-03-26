import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    icon: { type: String, required: true }, // Icon name or image URL
    color: { type: String, default: "bg-primary-50 text-primary-600" },
    link: { type: String, default: "/services" }
}, { timestamps: true });

const Service = mongoose.model("Service", serviceSchema);

export default Service;