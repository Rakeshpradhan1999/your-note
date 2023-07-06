import { getAuthSession } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import NoteModel from "@/models/NoteModel";
import { NextResponse, type NextRequest } from "next/server";

export const DELETE = async (req: NextRequest) => {
    // const noteId = req.query

    try {
      const session = await getAuthSession();
  
      if (!session?.user?.id) {
        return NextResponse.json({ error: "Not Authorized" }), 401;
      }
      await connectToDatabase();
      await NoteModel.findOneAndDelete({ _id: session.user.id });
      return NextResponse.json({ message: "success", data: {}, ok: true });
    } catch (error: any) {
      console.log(error);
      return NextResponse.json({ error: error?.message }), 500;
    }
  };