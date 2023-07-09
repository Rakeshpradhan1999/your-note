"use client";
import Edior from "@/components/editor";
import GoBack from "@/components/go-back";
import NoteSkeleton from "@/components/skelitons/note-skeliton";
import NotesSkeleton from "@/components/skelitons/notes-skeliton";
import { getNoteRequest } from "@/services/note.service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";

const Note = () => {
  const { id } = useParams();
  //   console.log(id);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["note", id],
    queryFn: () => getNoteRequest(id),
  });
  //   console.log(data);
  return (
    <div>
      <GoBack />
      {isLoading ? (
        <NoteSkeleton />
      ) : (
        data?.ok && <Edior refetch={refetch} {...data.data} />
      )}
    </div>
  );
};

export default Note;
