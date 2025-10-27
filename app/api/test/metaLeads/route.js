import connectDb from "@/db/connectDb";
import Lead from "@/models/Lead";

export async function GET() {
  await connectDb();

  try {
    const res = await fetch("https://dummyjson.com/users");
    const data = await res.json();

    
    const dummyLeads = data.users.slice(0, 5).map((user) => ({
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      contact: generateRandomPhone(),
      service: "Web Development",
      source: "Google Ads",
    }));

    await Lead.insertMany(dummyLeads);

    return new Response(JSON.stringify({ success: true, leads: dummyLeads }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}

function generateRandomPhone() {
  return Math.floor(6000000000 + Math.random() * 4000000000).toString();
}
