"use server";

import { sendEmail } from "@/app/utils/sendEmail";

export async function GET() {
  try {
    await sendEmail({
      to: "iamprince220@gmail.com", 
      lead: {
        name: "Test Lead",
        email: "test@example.com",
        contact: "9999999999",
        service: "Testing Service",
        source: "Manual Trigger",
      },
    });

    return Response.json({ success: true, message: "✅ Test email sent!" });
  } catch (err) {
    console.error("Email error:", err);
    return Response.json({ success: false, error: err.message });
  }
}
