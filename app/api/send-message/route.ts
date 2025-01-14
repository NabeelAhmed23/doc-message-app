import { prisma } from "@/lib/db";
import { NextRequest } from "next/server";
import nodeMailer from "nodemailer";

export async function POST(request: NextRequest) {
  const { message } = await request.json();

  if (!message) {
    return Response.json({ error: "Message is required." }, { status: 403 });
  }

  const ipAddress =
    process.env.NODE_ENV === "development"
      ? "127.0.0.1"
      : request.headers.get("x-real-ip");

  if (!ipAddress) {
    return Response.json(
      {
        error:
          "There was error with your location. Please try again with other device.",
      },
      { status: 500 }
    );
  }

  const record = await prisma.message.findMany({
    where: {
      ipAddress,
    },
  });

  if (record) {
    return Response.json(
      { error: "You can only send one message per day." },
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

  try {
    const saveMessagePromise = prisma.message.create({
      data: {
        message,
        ipAddress,
      },
    });

    const emailSendPromise = transporter.sendMail(mailOptions);

    await Promise.all([saveMessagePromise, emailSendPromise]);

    return Response.json({ message: "Message has been sent successfully." });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Something went wrong!" }, { status: 500 });
  }
}
