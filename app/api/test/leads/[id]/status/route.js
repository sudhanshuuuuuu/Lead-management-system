import Lead from "@/models/Lead";
import connectDB from "@/db/connectDb";

connectDB();

export async function PUT(req, { params }) {
  try {
    
    const { id } = await params; // ab sahi

    const { status } = await req.json();

    if (!["open", "closed"].includes(status)) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid status" }),
        { status: 400 }
      );
    }
    const lead = await Lead.findByIdAndUpdate(
      id, 
      { status },
      { new: true }
    );

    if (!lead) {
      return new Response(
        JSON.stringify({ success: false, message: "Lead not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Status updated", lead }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Error in PUT /leads/[id]/status:", err);
    return new Response(
      JSON.stringify({ success: false, message: "Server error" }),
      { status: 500 }
    );
  }
}
