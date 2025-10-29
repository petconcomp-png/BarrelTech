import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  const { name, email, course } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"BarrelTech Registration" <${process.env.EMAIL_USER}>`,
    to: "barreltech4@gmail.com",
    subject: "New Course Registration",
    html: `
      <h2>New Registration</h2>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Course:</b> ${course}</p>
    `,
  });

  res.status(200).json({ message: "Email sent successfully!" });
}
