import { createTransporter, emailConfig } from "./config";
import { adminNotificationTemplate, userAutoReplyTemplate } from "./templates";
import { rateLimit } from "../utils/rate-limit";

interface SendEmailParams {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export class EmailService {
  private static limiter = rateLimit({
    interval: 3600000, // 1 hour
    maxRequests: 50, // max 50 emails per hour
  });

  private static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private static sanitizeInput(input: string): string {
    return input
      .trim()
      .replace(/[<>]/g, "") // Remove potential HTML tags
      .slice(0, 1000); // Limit length
  }

  public static async sendContactFormEmails({
    name,
    email,
    subject,
    message,
  }: SendEmailParams): Promise<void> {
    try {
      // Rate limiting check
      await this.limiter.check();

      // Input validation
      if (!this.validateEmail(email)) {
        throw new Error("Invalid email address");
      }

      // Sanitize inputs
      const sanitizedName = this.sanitizeInput(name);
      const sanitizedSubject = this.sanitizeInput(subject);
      const sanitizedMessage = this.sanitizeInput(message);

      const timestamp = new Date().toISOString();
      const transporter = createTransporter();

      // Common email data
      const emailData = {
        name: sanitizedName,
        email,
        subject: sanitizedSubject,
        message: sanitizedMessage,
        timestamp,
      };

      // Send admin notification
      await transporter.sendMail({
        from: emailConfig.from,
        to: emailConfig.adminEmail,
        cc: "mvairamuthu2003@gmail.com",
        subject: `New Contact Form Submission: ${sanitizedSubject}`,
        html: adminNotificationTemplate(emailData),
      });

      // Send user auto-reply
      await transporter.sendMail({
        from: emailConfig.from,
        to: email,
        subject: "Thank you for contacting EzhuthAI",
        html: userAutoReplyTemplate(emailData),
      });
    } catch (error) {
      console.error("Email service error:", error);
      throw error;
    }
  }
}
