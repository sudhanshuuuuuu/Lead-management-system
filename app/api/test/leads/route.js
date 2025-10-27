import connectDb from "@/db/connectDb";
import Lead from "@/models/Lead";
import { sendEmail } from "@/app/utils/sendEmail";

export async function GET() {
  try {
    await connectDb();
    const leads = await Lead.find().sort({ createdAt: -1 }); // latest first
    return new Response(JSON.stringify({ success: true, leads }), { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/test/leads:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}

export async function POST(request) {
  await connectDb();
  try {
    const body = await request.json();
    const { name, contact, email, service, source } = body;

    const newLead = new Lead({
      name,
      contact,
      email,
      service,
      source,
      status: "open",
    });

    const savedLead = await newLead.save();

    
    await sendEmail({
      to: "iamprince220@gmail.com",
      lead: savedLead, 
    });

    return new Response(
      JSON.stringify({ success: true, lead: savedLead }),
      { status: 201 }
    );
  } catch (err) {
    console.error("Error in POST /api/test/leads:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500 }
    );
  }
}
