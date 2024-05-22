import { connectDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
  let db = (await connectDB).db("chat");
  let chats = await db.collection("chatting").find({}).toArray();
  return Response.json(chats);
}
