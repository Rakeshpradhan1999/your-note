"use client";
import { getNotesRequest } from "@/services/note.service";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import EditorRender from "./editor-render";
import NotesSkeleton from "./skelitons/notes-skeliton";
import { Button } from "./ui/button";
import { DeleteIcon, Edit, Trash, Trash2, Trash2Icon } from "lucide-react";
import Link from "next/link";

interface INote {
  title: string;
  _id: string;
  content: string;
}
const Notes = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotesRequest,
  });
  return (
    <div>
      {isLoading ? (
        <NotesSkeleton />
      ) : (
        <div className="grid  sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {data?.data?.map((note: INote) => (
            <Link href={`/dashboard/note/${note._id}`} key={note._id}>
              <Card key={note._id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-xl">{note.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="h-[150px] overflow-y-hidden">
                    <EditorRender content={note.content} />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notes;
