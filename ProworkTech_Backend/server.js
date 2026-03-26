import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import nodemailer from "nodemailer";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- MONGODB CONNECTION ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch(err => console.error("MongoDB connection error:", err));

// --- MULTER STORAGE ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// --- SERVICE SCHEMA ---
const serviceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    icon: { type: String, required: true }, // Icon name or image URL
    color: { type: String, default: "bg-primary-50 text-primary-600" },
    link: { type: String, default: "/services" }
}, { timestamps: true });

const Service = mongoose.model("Service", serviceSchema);

// --- API ENDPOINTS ---

app.get("/", (req, res) => {
    res.send("Backend running with Image Uploads Support")
})

// Get all services
app.get("/api/services", async (req, res) => {
    try {
        const services = await Service.find().sort({ createdAt: -1 });
        res.status(200).json(services);
    } catch (err) {
        res.status(500).json({ message: "Error fetching services", error: err.message });
    }
});

// Add a new service
app.post("/api/services", upload.single('iconFile'), async (req, res) => {
    try {
        const { title, desc, icon, color, link } = req.body;
        const iconPath = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : icon;

        const newService = new Service({
            title,
            desc,
            icon: iconPath,
            color,
            link
        });

        await newService.save();
        res.status(201).json(newService);
    } catch (err) {
        res.status(400).json({ message: "Error adding service", error: err.message });
    }
});

// Update a service
app.put("/api/services/:id", upload.single('iconFile'), async (req, res) => {
    try {
        const { title, desc, icon, color, link } = req.body;
        const updateData = { title, desc, color, link };

        if (req.file) {
            updateData.icon = `http://localhost:5000/uploads/${req.file.filename}`;
        } else if (icon) {
            updateData.icon = icon;
        }

        const updatedService = await Service.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.status(200).json(updatedService);
    } catch (err) {
        res.status(400).json({ message: "Error updating service" });
    }
});

// Delete a service
app.delete("/api/services/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`DELETE request received for service ID: ${id}`);
        const deletedService = await Service.findByIdAndDelete(id);
        if (!deletedService) {
            console.log("Service not found for deletion");
            return res.status(404).json({ message: "Service not found" });
        }
        console.log("Service deleted successfully");
        res.status(200).json({ message: "Service removed" });
    } catch (err) {
        console.error("Error deleting service:", err);
        res.status(500).json({ message: "Error deleting service", error: err.message });
    }
});

// --- TEAM MEMBER SCHEMA ---
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

// --- API ENDPOINTS ---

app.get("/", (req, res) => {
    res.send("Backend running with Image Uploads Support")
})

// Get all team members
app.get("/api/team", async (req, res) => {
    try {
        const team = await TeamMember.find().sort({ createdAt: -1 });
        res.status(200).json(team);
    } catch (err) {
        res.status(500).json({ message: "Error fetching team members", error: err.message });
    }
});

// Add a new team member with image
app.post("/api/team", upload.single('imageFile'), async (req, res) => {
    try {
        const { name, role, email, bio, status, linkedin, twitter, image } = req.body;
        
        // Use uploaded file path if available, else use provided image URL
        const imagePath = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : image;

        const newMember = new TeamMember({
            name,
            role,
            email,
            bio,
            status,
            image: imagePath,
            social: {
                linkedin: linkedin || "#",
                twitter: twitter || "#",
                mail: `mailto:${email}`
            }
        });

        await newMember.save();
        res.status(201).json(newMember);
    } catch (err) {
        console.error("Error adding member:", err);
        res.status(400).json({ message: "Error adding team member", error: err.message });
    }
});

// Update a team member
app.put("/api/team/:id", upload.single('imageFile'), async (req, res) => {
    try {
        const { name, role, email, bio, status, linkedin, twitter, image } = req.body;
        
        const updateData = {
            name,
            role,
            email,
            bio,
            status,
            social: {
                linkedin: linkedin || "#",
                twitter: twitter || "#",
                mail: `mailto:${email}`
            }
        };

        if (req.file) {
            updateData.image = `http://localhost:5000/uploads/${req.file.filename}`;
        } else if (image) {
            updateData.image = image;
        }

        const updatedMember = await TeamMember.findByIdAndUpdate(
            req.params.id, 
            updateData, 
            { new: true }
        );

        if (!updatedMember) {
            return res.status(404).json({ message: "Member not found" });
        }

        res.status(200).json(updatedMember);
    } catch (err) {
        console.error("Error updating member:", err);
        res.status(400).json({ message: "Error updating team member", error: err.message });
    }
});

// Delete a member
app.delete("/api/team/:id", async (req, res) => {
    try {
        await TeamMember.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Member removed" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting member" });
    }
});

app.post("/api/contact", async (req, res) => {
    try {
        const { name, email, service, project } = req.body;
        if (!name || !email || !service || !project) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
        });
        
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.RECEIVER_EMAIL,
            subject: `New contact Enquiry from ${name}`,
            html: `
            <h2>New Contact Enquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Service:</strong> ${service}</p>
            <p><strong>Project:</strong> ${project}</p>
          `
        });

        return res.status(200).json({ message: "Message sent successfully!" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to send message" });
    }
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`)
})