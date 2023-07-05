"use client";
import { getNotesRequest } from "@/services/note.service";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Notes = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotesRequest,
  });
  return (
    <div>
      {isLoading ? "Loading" : <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default Notes;
