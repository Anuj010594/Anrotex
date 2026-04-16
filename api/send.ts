import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false });
  }

  const { name, email, company, message } = req.body;

  try {
    const response = await resend.emails.send({
      from: "Anrotex <contact@anrotex.com>",
      to: ["sales@anrotex.com"],
      replyTo: `Customer <${email}>`,
      subject: `New Inquiry from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    return res.status(200).json({ success: true, response });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
