import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Backend running")
})

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

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})