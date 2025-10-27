import connectDb from "@/db/connectDb";
export async function GET(){
    await connectDb();
    return new Response(JSON.stringify({messege:"api is working"}))
}