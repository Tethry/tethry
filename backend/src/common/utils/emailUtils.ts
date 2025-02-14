import nodemailer, { SentMessageInfo } from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

interface MailOptions {
  email: string;
  subject: string;
  html: string;
}

export const sendEmail = ({ email, subject, html }: MailOptions): boolean => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      html: html,
    };

    transporter.sendMail(mailOptions, (error, info: SentMessageInfo) => {
      if (error) {
        console.log("Error:", error);
        return false;
      } else {
        console.log("Mail Sent Successfully:", info);
        return true;
      }
    });

    return true;
  } catch (error) {
    console.log("Error:", error);
    return false;
  }
};


export const maskEmail = (email: string): string => {
  // Validate the email format using a simple regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.error("Invalid email format");
    return email; // Return the original email if invalid
  }

  // Split the email into local and domain parts
  const [localPart, domainPart] = email.split("@");

  // Mask the local part, keeping the first character and the last character
  const maskedLocalPart =
    localPart.length > 2
      ? `${localPart[0]}${"*".repeat(localPart.length - 2)}${
          localPart[localPart.length - 1]
        }`
      : `${localPart[0]}${"*".repeat(localPart.length - 1)}`;

  // Return the masked email
  return `${maskedLocalPart}@${domainPart}`;
};
