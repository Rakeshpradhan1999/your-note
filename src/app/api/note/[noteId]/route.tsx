import { getAuthSession } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import NoteModel from "@/models/NoteModel";
import { NextResponse, type NextRequest } from "next/server";
interface INoteParam {
  params: { noteId: string };
}
export const DELETE = async (req: NextRequest, { params }: INoteParam) => {
  try {
    if (!params.noteId)
      return NextResponse.json({ error: "Missing Note ID" }), 401;

    const session = await getAuthSession();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Not Authorized" }), 401;
    }
    await connectToDatabase();
    await NoteModel.findOneAndDelete({ _id: params.noteId });
    return NextResponse.json({ message: "success", data: {}, ok: true });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error?.message }), 500;
  }
};
export const PUT = async (req: NextRequest, { params }: INoteParam) => {
  const body = await req.json();
  try {
    if (!params.noteId)
      return NextResponse.json({ error: "Missing Note ID" }), 401;

    const session = await getAuthSession();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Not Authorized" }), 401;
    }
    await connectToDatabase();
    await NoteModel.findOneAndUpdate({ _id: params.noteId }, body);
    return NextResponse.json({ message: "success", data: {}, ok: true });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error?.message }), 500;
  }
};
export const GET = async (req: Request, { params }: INoteParam) => {
  try {
    // console.log(params);
    if (!params.noteId)
      return NextResponse.json({ error: "Missing Note ID" }), 401;
    const session = await getAuthSession();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Not Authorized" }), 401;
    }
    await connectToDatabase();
    const note = await NoteModel.findOne({ _id: params.noteId });
    // console.log(note);
    return NextResponse.json({ message: "success", data: note, ok: true });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error?.message }), 500;
  }
};
