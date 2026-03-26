import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

// Setup Config
dotenv.config();

// Schema inside script for standalone running
const adminSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});
const ProworkAdmin = mongoose.model("ProworkAdmin", adminSchema);

async function createAdmin() {
    await mongoose.connect(process.env.MONGO_URI);

    const email = "admin@proworktech.com";
    const plainPassword = "Prowork@123";

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);

    const newAdmin = new ProworkAdmin({ email, password: hashedPassword });
    await newAdmin.save();

    console.log("Admin account successfully created!");
    process.exit();
}

createAdmin();
