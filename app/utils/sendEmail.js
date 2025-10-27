"use server";
import nodemailer from "nodemailer";

export const sendEmail = async ({ to, lead }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const htmlContent = `
    <div style="font-family: Arial, sans-serif; background:#f4f4f4; padding:20px;">
      <div style="max-width:600px; margin: auto; background:white; border-radius:12px; overflow:hidden; box-shadow:0 4px 15px rgba(0,0,0,0.1);">
        <div style="background: linear-gradient(90deg, #4f46e5, #6366f1); padding:20px; color:white; text-align:center;">
          <h2 style="margin:0;">📩 New Lead Added</h2>
        </div>
        <div style="padding:20px; color:#333;">
          <p>Hello Admin,</p>
          <p>A new lead has been submitted. Here are the details:</p>
          <table style="width:100%; border-collapse: collapse; margin-top:10px;">
            <tr>
              <th style="text-align:left; padding:8px; border-bottom:1px solid #ddd;">Name</th>
              <td style="padding:8px; border-bottom:1px solid #ddd;">${lead.name}</td>
            </tr>
            <tr>
              <th style="text-align:left; padding:8px; border-bottom:1px solid #ddd;">Email</th>
              <td style="padding:8px; border-bottom:1px solid #ddd;">${lead.email}</td>
            </tr>
            <tr>
              <th style="text-align:left; padding:8px; border-bottom:1px solid #ddd;">Contact</th>
              <td style="padding:8px; border-bottom:1px solid #ddd;">${lead.contact}</td>
            </tr>
            <tr>
              <th style="text-align:left; padding:8px; border-bottom:1px solid #ddd;">Service</th>
              <td style="padding:8px; border-bottom:1px solid #ddd;">${lead.service}</td>
            </tr>
            <tr>
              <th style="text-align:left; padding:8px;">Source</th>
              <td style="padding:8px;">${lead.source}</td>
            </tr>
          </table>
          <p style="margin-top:20px; font-size:12px; color:#555;">This is an automated notification from your Lead Management System.</p>
        </div>
      </div>
    </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: "📩 New Lead Notification",
      html: htmlContent,
    });

    console.log("Email sent successfully to", to);
  } catch (err) {
    console.error("Email sending error:", err);
  }
};
