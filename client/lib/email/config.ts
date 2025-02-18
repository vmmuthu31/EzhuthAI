import nodemailer from "nodemailer";

// Email configuration and transporter setup
export const emailConfig = {
  from: process.env.EMAIL_USER as string,
  adminEmail: "ezhuthaiinfo@gmail.com",
};

// Create reusable transporter object using SMTP transport
export const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("Email configuration is missing");
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};
