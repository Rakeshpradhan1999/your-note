import { NoteCreationRequest } from "@/lib/validators/note";

export const createNoteRequest = async (note: NoteCreationRequest) => {
  const response = await fetch("/api/note", {
    method: "POST",
    body: JSON.stringify(note),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};
export const getNotesRequest = async () => {
  const response = await fetch("/api/note");
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};
