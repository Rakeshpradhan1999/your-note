// import {  } from "next/server";
import { type NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import NoteModel from "@/models/NoteModel";
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const session = await getAuthSession();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Not Authorized" }), 401;
    }
    await connectToDatabase();

    const { title, content } = body;

    await new NoteModel({
      title,
      content: JSON.stringify(content),
      userId: session.user.id,
    }).save();

    return NextResponse.json({ message: "success", data: {}, ok: true });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error?.message }), 500;
  }
};
export const GET = async (req: NextRequest) => {
  try {
    const session = await getAuthSession();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Not Authorized" }), 401;
    }
    await connectToDatabase();
    const notes = await NoteModel.find({ userId: session.user.id }).sort({
      createdAt: -1,
    });

    return NextResponse.json({ message: "success", data: notes, ok: true });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error?.message }), 500;
  }
};
