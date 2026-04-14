require("dotenv").config();
const nodemailer = require("nodemailer");

async function test() {
  const transporter = nodemailer.createTransport({
    host: "smtp.titan.email",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.verify();
    console.log("✅ SMTP WORKING");
  } catch (err) {
    console.error("❌ SMTP FAILED:", err.message);
  }
}

test();
