import { sendEmail } from "@/app/utils/sendEmail";

export async function GET() {
  try {
    await sendEmail({
      to: "iamprince220@gmail.com", 
      subject: "Test Email from Lead Management System",
      text: "Yeh email test ke liye bheja gaya hai."
    });

    return new Response(JSON.stringify({ success: true, message: "Email sent successfully!" }), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
    });
  }
}