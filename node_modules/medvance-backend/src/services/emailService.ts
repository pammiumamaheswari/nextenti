import nodemailer from 'nodemailer';
import { ENV } from '../config/env.js';

export class EmailService {
  private static transporter = nodemailer.createTransport({
    host: ENV.SMTP_HOST,
    port: ENV.SMTP_PORT,
    auth: {
      user: ENV.SMTP_USER,
      pass: ENV.SMTP_PASS
    }
  });

  public static async sendEmail(to: string, subject: string, htmlContent: string): Promise<boolean> {
    try {
      if (!ENV.SMTP_USER) {
        console.log(`[EmailService (Simulation)] To: ${to} | Subject: "${subject}"`);
        return true;
      }
      await this.transporter.sendMail({
        from: ENV.EMAIL_FROM,
        to,
        subject,
        html: htmlContent
      });
      return true;
    } catch (error) {
      console.error('[EmailService Error]', error);
      return false;
    }
  }

  public static getTemplate(type: string, data: Record<string, any>): string {
    const brandHeader = `
      <div style="font-family: Arial, sans-serif; background-color: #F8FAFC; padding: 24px; color: #102A43;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #E2E8F0; overflow: hidden;">
          <div style="background-color: #102A43; padding: 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 22px; letter-spacing: 0.5px;">MedVance <span style="color: #38BDF8;">AI</span></h1>
            <p style="color: #DFF7F2; margin: 4px 0 0 0; font-size: 13px;">Healthcare Career & Talent Marketplace</p>
          </div>
          <div style="padding: 30px;">
    `;

    const brandFooter = `
          </div>
          <div style="background: #F1F5F9; padding: 16px; text-align: center; font-size: 12px; color: #64748B;">
            &copy; 2026 MedVance AI Platform. All healthcare careers protected.<br/>
            Security & HIPAA-Compliant Architecture.
          </div>
        </div>
      </div>
    `;

    switch (type) {
      case 'WELCOME':
        return `${brandHeader}
          <h2>Welcome to MedVance AI, ${data.name}!</h2>
          <p>Your intelligent healthcare career ecosystem account is ready. Connect directly with premier hospitals, verify your medical council credentials, and let AI matching elevate your practice.</p>
          <div style="margin: 25px 0; text-align: center;">
            <a href="${data.url || '#'}" style="background-color: #0F766E; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Complete Your Profile</a>
          </div>
        ${brandFooter}`;

      case 'APPLICATION_STATUS':
        return `${brandHeader}
          <h2>Application Status Update</h2>
          <p>Dear ${data.candidateName},</p>
          <p>Your application for <strong>${data.jobTitle}</strong> at <strong>${data.organizationName}</strong> has been updated to:</p>
          <div style="background: #DFF7F2; padding: 14px; border-left: 4px solid #0F766E; font-weight: bold; font-size: 16px; color: #0F766E; margin: 15px 0;">
            Status: ${data.status}
          </div>
          <p>Visit your dashboard to view recruiter feedback or schedule next steps.</p>
        ${brandFooter}`;

      case 'INTERVIEW_SCHEDULED':
        return `${brandHeader}
          <h2>Interview Scheduled!</h2>
          <p>Dear ${data.candidateName},</p>
          <p><strong>${data.organizationName}</strong> has scheduled a clinical interview for <strong>${data.jobTitle}</strong>.</p>
          <ul style="background: #F8FAFC; padding: 15px 30px; border-radius: 6px;">
            <li><strong>Date:</strong> ${data.date}</li>
            <li><strong>Time:</strong> ${data.startTime} - ${data.endTime}</li>
            <li><strong>Type:</strong> ${data.type}</li>
            ${data.meetingLink ? `<li><strong>Meeting Link:</strong> <a href="${data.meetingLink}">${data.meetingLink}</a></li>` : ''}
          </ul>
        ${brandFooter}`;

      default:
        return `${brandHeader}<h2>Notification from MedVance AI</h2><p>${data.message || ''}</p>${brandFooter}`;
    }
  }
}
