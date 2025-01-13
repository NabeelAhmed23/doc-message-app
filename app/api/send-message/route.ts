import { NextResponse } from "next/server";
import nodeMailer from "nodemailer";

export async function POST(request: Request) {
  const { message } = await request.json();
  console.log(request.headers.get("x-real-ip"));

  if (!message) {
    return NextResponse.json(
      {
        error: "Message is required. ip = " + request.headers.get("x-real-ip"),
      },
      { status: 403 }
    );
  }

  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const emailUser = {
    email: ["nabeelahmed.0823@gmail.com", "innoxent.mirza007@gmail.com"],
    subject: "Testing",
    message,
  };

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: emailUser.email,
    subject: emailUser.subject,
    text: emailUser.message,
  };

  await transporter.sendMail(mailOptions);

  return Response.json({ message: "Message has been sent successfully." });
}
