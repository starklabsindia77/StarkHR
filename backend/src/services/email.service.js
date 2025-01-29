import nodemailer from 'nodemailer';

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, // SMTP username
        pass: process.env.SMTP_PASS, // SMTP password
      },
    });
  }

  async sendPasswordReset(email, resetToken) {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_FROM, // sender address
      to: email, // list of receivers
      subject: 'Password Reset Request', // Subject line
      html: `<p>Hello,</p><p>You can reset your password by clicking the link below:</p><p><a href="${resetUrl}">${resetUrl}</a></p>`, // HTML body
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw new Error('Failed to send password reset email');
    }
  }

  async sendWelcome(email, name, password, loginUrl) {
    const mailOptions = {
      from: process.env.EMAIL_FROM, // sender address
      to: email, // recipient's email
      subject: 'Welcome to Our Service!', // Subject line
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2>Welcome to Our Service, ${name}!</h2>
          <p>We're thrilled to have you on board. Below are your login details to get started:</p>
          <ul>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Password:</strong> ${password}</li>
          </ul>
          <p>You can log in using the following link:</p>
          <a href="${loginUrl}" style="display: inline-block; background-color: #007BFF; color: #fff; padding: 10px 15px; text-decoration: none; border-radius: 5px;">Log in to your account</a>
          <p>If you have any questions or need assistance, feel free to contact our support team.</p>
          <p>Welcome aboard!</p>
          <p>Best regards,<br>The Team</p>
        </div>
      `,
    };
  
    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Welcome email sent successfully to:', email);
    } catch (error) {
      console.error('Error sending welcome email:', error);
      throw new Error('Failed to send welcome email');
    }
  }
}

export default new EmailService();
