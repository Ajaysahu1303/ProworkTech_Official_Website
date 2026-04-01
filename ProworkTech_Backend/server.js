import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import nodemailer from "nodemailer";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from 'url';
import TeamMember from "./models/TeamMember.js";
import ProworkAdmin from "./models/ProworkAdmin.js";
import Service from "./models/Service.js";
import ProworkEnquiry from "./models/ProworkEnquiry.js";
import Testimonial from "./models/Testimonial.js";
import Client from "./models/Client.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===== SECURITY: Server Session ID =====
// This unique ID is generated on EVERY server start.
// It's embedded in JWT tokens — when server restarts, the ID changes,
// making ALL previously issued tokens invalid (forces re-login).
const SERVER_SESSION_ID = crypto.randomBytes(16).toString('hex');
console.log(`🔐 Server Session ID generated: ${SERVER_SESSION_ID.slice(0, 8)}...`);

const app = express();

// ===== SECURITY: CORS - Only allow your frontend origins =====
const allowedOrigins = [
    "http://localhost:5173",  // Admin panel
    "http://localhost:2000",  // Frontend
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, Postman in dev)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
}));

// ===== SECURITY: Limit request body size =====
app.use(express.json({ limit: "1mb" }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ===== SECURITY: Rate limiting on login =====
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,  // 15 minute window
    max: 5,                     // Max 5 login attempts per window
    message: { message: "Too many login attempts. Please try again after 15 minutes." },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true // Only count failed attempts
});

// ===== SECURITY: General API rate limit =====
const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,  // 1 minute window
    max: 100,                   // 100 requests per minute
    message: { message: "Too many requests. Please slow down." }
});

app.use("/api/", apiLimiter);

// ===== SECURITY: Track failed login attempts in-memory =====
const failedAttempts = new Map(); // email -> { count, lockedUntil }
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION = 30 * 60 * 1000; // 30 minutes lockout

function checkAccountLock(email) {
    const record = failedAttempts.get(email);
    if (!record) return false;
    
    if (record.lockedUntil && Date.now() < record.lockedUntil) {
        const minutesLeft = Math.ceil((record.lockedUntil - Date.now()) / 60000);
        return minutesLeft;
    }
    
    // Lock expired, reset
    if (record.lockedUntil && Date.now() >= record.lockedUntil) {
        failedAttempts.delete(email);
        return false;
    }
    
    return false;
}

function recordFailedAttempt(email) {
    const record = failedAttempts.get(email) || { count: 0, lockedUntil: null };
    record.count += 1;
    
    if (record.count >= MAX_FAILED_ATTEMPTS) {
        record.lockedUntil = Date.now() + LOCKOUT_DURATION;
        console.warn(`⚠️ Account locked: ${email} — too many failed login attempts`);
    }
    
    failedAttempts.set(email, record);
}

function clearFailedAttempts(email) {
    failedAttempts.delete(email);
}

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

// ===== SECURITY: JWT Middleware with proper error handling =====
const verifyAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access Denied. No token provided.", code: "NO_TOKEN" });
    }

    const token = authHeader.split(" ")[1];

    if (!token || token === "null" || token === "undefined") {
        return res.status(401).json({ message: "Access Denied. Invalid token format.", code: "INVALID_FORMAT" });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        // Check if token was issued during THIS server session
        if (verified.serverSession !== SERVER_SESSION_ID) {
            return res.status(401).json({ 
                message: "Session invalidated. Server was restarted. Please login again.", 
                code: "TOKEN_EXPIRED" 
            });
        }

        req.admin = verified;
        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Session expired. Please login again.", code: "TOKEN_EXPIRED" });
        }
        return res.status(403).json({ message: "Invalid or tampered token.", code: "INVALID_TOKEN" });
    }
};


// --- API ENDPOINTS ---

app.get("/", (req, res) => {
    res.send("Backend running with Image Uploads Support")
})

// Get all services (public — for frontend website)
app.get("/api/services", async (req, res) => {
    try {
        const services = await Service.find().sort({ createdAt: -1 });
        res.status(200).json(services);
    } catch (err) {
        res.status(500).json({ message: "Error fetching services", error: err.message });
    }
});

// Add a new service
app.post("/api/services", verifyAdmin, upload.single('iconFile'), async (req, res) => {
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
app.put("/api/services/:id", verifyAdmin, upload.single('iconFile'), async (req, res) => {
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
app.delete("/api/services/:id", verifyAdmin, async (req, res) => {
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


// Get all team members (public — for frontend website)
app.get("/api/team", async (req, res) => {
    try {
        const team = await TeamMember.find().sort({ createdAt: -1 });
        res.status(200).json(team);
    } catch (err) {
        res.status(500).json({ message: "Error fetching team members", error: err.message });
    }
});

// Add a new team member with image
app.post("/api/team", verifyAdmin, upload.single('imageFile'), async (req, res) => {
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
app.put("/api/team/:id", verifyAdmin, upload.single('imageFile'), async (req, res) => {
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
app.delete("/api/team/:id", verifyAdmin, async (req, res) => {
    try {
        await TeamMember.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Member removed" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting member" });
    }
});

// ===== ADMIN AUTH ROUTES =====

// Verify token validity
app.get("/api/admin/verify", verifyAdmin, (req, res) => {
    res.status(200).json({ valid: true, admin: { email: req.admin.email } });
});

// ===== SECURITY: Hardened Admin Login =====
app.post("/api/admin/login", loginLimiter, async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate inputs exist
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        // Normalize email
        const normalizedEmail = email.trim().toLowerCase();

        // Check if account is locked
        const lockMinutes = checkAccountLock(normalizedEmail);
        if (lockMinutes) {
            return res.status(429).json({ 
                message: `Account temporarily locked due to too many failed attempts. Try again in ${lockMinutes} minutes.` 
            });
        }

        // Find admin by email
        const admin = await ProworkAdmin.findOne({ email: normalizedEmail });

        // SECURITY: Use same generic message for both "not found" and "wrong password"
        // This prevents email enumeration attacks
        if (!admin) {
            recordFailedAttempt(normalizedEmail);
            // Add artificial delay to prevent timing attacks
            await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500));
            return res.status(401).json({ message: "Invalid email or password." });
        }

        // Check password match
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            recordFailedAttempt(normalizedEmail);
            return res.status(401).json({ message: "Invalid email or password." });
        }

        // Successful login — clear failed attempts
        clearFailedAttempts(normalizedEmail);

        // Generate JWT token with server session binding
        const token = jwt.sign(
            { id: admin._id, email: admin.email, serverSession: SERVER_SESSION_ID },
            process.env.JWT_SECRET,
            { expiresIn: '4h' }  // 4 hours — more secure than 1 day
        );

        console.log(`✅ Admin login successful: ${admin.email}`);
        res.status(200).json({ token, message: "Logged in successfully" });

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});

// Update Admin Password
app.put("/api/admin/password", verifyAdmin, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: "Current and new passwords are required." });
        }

        if (newPassword.length < 8) {
            return res.status(400).json({ message: "New password must be at least 8 characters long." });
        }

        // Use the ID from the verified token
        const adminId = req.admin.id;
        const admin = await ProworkAdmin.findById(adminId);

        if (!admin) {
            return res.status(404).json({ message: "Admin account not found." });
        }

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect current password." });
        }

        // Hash and update new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        admin.password = hashedPassword;
        await admin.save();

        console.log(`✅ Admin password updated for: ${admin.email}`);
        
        // Return success message. The frontend can decide whether to log out or keep session.
        res.status(200).json({ message: "Password updated successfully." });

    } catch (err) {
        console.error("Change password error:", err);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});

// Contact & Enquiries

app.post("/api/contact", async (req, res) => {
    try {
        const { name, email, service, project } = req.body;
        if (!name || !email || !service || !project) {
            return res.status(400).json({ message: "All fields are required" });
        }
        
        // 1. Save to Database
        const newEnquiry = new ProworkEnquiry({ name, email, service, project });
        await newEnquiry.save();

        // 2. Send Email via Nodemailer
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
            <p><strong>Project Details:</strong> ${project}</p>
          `
        });

        return res.status(200).json({ message: "Message sent successfully!" });

    } catch (err) {
        console.error("Contact Form Error:", err);
        return res.status(500).json({ message: "Failed to send message" });
    }
});

// Admin Routes for Enquiries
app.get("/api/enquiries", verifyAdmin, async (req, res) => {
    try {
        const enquiries = await ProworkEnquiry.find().sort({ createdAt: -1 });
        res.status(200).json(enquiries);
    } catch (err) {
        res.status(500).json({ message: "Error fetching enquiries", error: err.message });
    }
});

app.put("/api/enquiries/:id", verifyAdmin, async (req, res) => {
    try {
        const { status } = req.body;
        const updatedEnquiry = await ProworkEnquiry.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        res.status(200).json(updatedEnquiry);
    } catch (err) {
        res.status(400).json({ message: "Error updating enquiry status" });
    }
});

app.get("/api/stats", verifyAdmin, async (req, res) => {
    try {
        const teamCount = await TeamMember.countDocuments();
        const serviceCount = await Service.countDocuments();
        const enquiryCount = await ProworkEnquiry.countDocuments();
        const recentEnquiries = await ProworkEnquiry.find().sort({ createdAt: -1 }).limit(4);
        
        res.status(200).json({
            teamCount,
            serviceCount,
            enquiryCount,
            recentEnquiries
        });
    } catch (err) {
        console.error("Stats fetch error:", err);
        res.status(500).json({ message: "Error fetching stats" });
    }
});

// ===== TESTIMONIALS API =====
// Public: Get only approved testimonials
app.get("/api/testimonials", async (req, res) => {
    try {
        const testimonials = await Testimonial.find({ isApproved: true }).sort({ createdAt: -1 });
        res.status(200).json(testimonials);
    } catch (err) {
        res.status(500).json({ message: "Error fetching testimonials" });
    }
});

// Admin: Get ALL testimonials
app.get("/api/admin/testimonials", verifyAdmin, async (req, res) => {
    try {
        const testimonials = await Testimonial.find().sort({ createdAt: -1 });
        res.status(200).json(testimonials);
    } catch (err) {
        res.status(500).json({ message: "Error fetching testimonials" });
    }
});

// Public: Submit a new testimonial (defaults to unapproved)
app.post("/api/testimonials/submit", upload.single('avatarFile'), async (req, res) => {
    try {
        const { name, role, text, rating } = req.body;
        const avatarPath = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
        const newTestimonial = new Testimonial({ name, role, text, rating: rating || 5, avatar: avatarPath, isApproved: false });
        await newTestimonial.save();
        res.status(201).json({ message: "Testimonial submitted successfully for review", data: newTestimonial });
    } catch (err) {
        res.status(400).json({ message: "Error submitting testimonial", error: err.message });
    }
});

// Admin: Add a new testimonial (approved by default)
app.post("/api/testimonials", verifyAdmin, upload.single('avatarFile'), async (req, res) => {
    try {
        const { name, role, text, rating, avatar, isApproved } = req.body;
        const avatarPath = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : (avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`);
        
        let approved = true;
        if (isApproved !== undefined) {
             approved = isApproved === 'true' || isApproved === true;
        }
        
        const newTestimonial = new Testimonial({ name, role, text, rating, avatar: avatarPath, isApproved: approved });
        await newTestimonial.save();
        res.status(201).json(newTestimonial);
    } catch (err) {
        res.status(400).json({ message: "Error adding testimonial", error: err.message });
    }
});

// Admin: Update a testimonial (including approval status)
app.put("/api/testimonials/:id", verifyAdmin, upload.single('avatarFile'), async (req, res) => {
    try {
        const { name, role, text, rating, avatar, isApproved } = req.body;
        const updateData = { name, role, text, rating };
        
        if (isApproved !== undefined) {
             updateData.isApproved = isApproved === 'true' || isApproved === true;
        }

        if (req.file) {
            updateData.avatar = `http://localhost:5000/uploads/${req.file.filename}`;
        } else if (avatar) {
            updateData.avatar = avatar;
        }

        const updatedTestimonial = await Testimonial.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.status(200).json(updatedTestimonial);
    } catch (err) {
        res.status(400).json({ message: "Error updating testimonial" });
    }
});

app.delete("/api/testimonials/:id", verifyAdmin, async (req, res) => {
    try {
        await Testimonial.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Testimonial deleted" });
    } catch (err) {
        res.status(400).json({ message: "Error deleting testimonial" });
    }
});

// ===== CLIENTS API =====
app.get("/api/clients", async (req, res) => {
    try {
        const clients = await Client.find().sort({ createdAt: -1 });
        res.status(200).json(clients);
    } catch (err) {
        res.status(500).json({ message: "Error fetching clients" });
    }
});

app.post("/api/clients", verifyAdmin, upload.single('logoFile'), async (req, res) => {
    try {
        const { name, logo } = req.body;
        const logoPath = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : logo;
        const newClient = new Client({ name, logo: logoPath });
        await newClient.save();
        res.status(201).json(newClient);
    } catch (err) {
        res.status(400).json({ message: "Error adding client" });
    }
});

app.put("/api/clients/:id", verifyAdmin, upload.single('logoFile'), async (req, res) => {
    try {
        const { name, logo } = req.body;
        const updateData = { name };
        if (req.file) {
            updateData.logo = `http://localhost:5000/uploads/${req.file.filename}`;
        } else if (logo) {
            updateData.logo = logo;
        }
        const updatedClient = await Client.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.status(200).json(updatedClient);
    } catch (err) {
        res.status(400).json({ message: "Error updating client" });
    }
});

app.delete("/api/clients/:id", verifyAdmin, async (req, res) => {
    try {
        await Client.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Client deleted" });
    } catch (err) {
        res.status(400).json({ message: "Error deleting client" });
    }
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`)
})