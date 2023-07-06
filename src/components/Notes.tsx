"use client";
import { getNotesRequest } from "@/services/note.service";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import EditorRender from "./editor-render";
import NotesSkeleton from "./skelitons/notes-skeliton";

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
        <div className="grid grid-cols-4 gap-6 mt-10">
          {data?.data?.map((note: INote) => (
            <Card key={note._id}>
              <CardHeader>
                <CardTitle className="text-xl">{note.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-h-[150px] overflow-y-hidden">
                  <EditorRender content={note.content} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notes;
