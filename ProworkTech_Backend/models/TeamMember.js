import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    image: { type: String, required: true },
    email: { type: String },
    bio: { type: String },
    status: { type: String, default: "Active" },
    social: {
        linkedin: { type: String, default: "#" },
        twitter: { type: String, default: "#" },
        mail: { type: String, default: "#" }
    }
}, { timestamps: true });

const TeamMember = mongoose.model("TeamMember", teamMemberSchema);

export default TeamMember;