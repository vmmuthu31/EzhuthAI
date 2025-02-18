interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

export const adminNotificationTemplate = ({
  name,
  email,
  subject,
  message,
  timestamp,
}: EmailData) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #f8f9fa; padding: 20px; border-radius: 5px; }
    .content { margin: 20px 0; }
    .footer { font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Contact Form Submission</h2>
      <p>Received on: ${timestamp}</p>
    </div>
    <div class="content">
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${message}</p>
    </div>
    <div class="footer">
      <p>This is an automated message from EzhuthAI Contact System</p>
    </div>
  </div>
</body>
</html>
`;

export const userAutoReplyTemplate = ({
  name,
  subject,
  message,
}: EmailData) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #f8f9fa; padding: 20px; border-radius: 5px; }
    .content { margin: 20px 0; }
    .footer { font-size: 12px; color: #666; }
    .social-links { margin-top: 20px; }
    .social-links a { margin-right: 10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Hello ${name},</h2>
    </div>
    <div class="content">
      <p>Thank you for reaching out to EzhuthAI. We have received your message and will get back to you shortly.</p>
      <p>Here's a copy of your message:</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${message}</p>
    </div>
    <div class="social-links">
      <p>Follow us on social media:</p>
      <a href="https://twitter.com/ezhuthai">Twitter</a>
    </div>
    <div class="footer">
      <p>Best regards,</p>
      <p>The EzhuthAI Team</p>
      <small>This is an automated response. Please do not reply to this email.</small>
    </div>
  </div>
</body>
</html>
`;
