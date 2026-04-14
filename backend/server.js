require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");

const app = express();

// ✅ Proper CORS (important)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
}));

app.use(express.json());

// Debug route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Route
app.post("/send", async (req, res) => {
  console.log("📩 Incoming request:", req.body);

  const { name, email, company, message } = req.body;

  try {
    const response = await resend.emails.send({
      from: "Anrotex <contact@anrotex.com>",
      to: ["sales@anrotex.com"],
      replyTo: email,
      subject: `New Inquiry from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    console.log("✅ Email sent:", response);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Email error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start server
app.listen(5000, "0.0.0.0", () => {
  console.log("🚀 Server running on http://0.0.0.0:5000");
});
