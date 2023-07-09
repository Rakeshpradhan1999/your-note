import { NoteCreationRequest, NoteUpdateRequest } from "@/lib/validators/note";

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

export const updateNoteRequest = async (note: NoteUpdateRequest) => {
  const { id, ...rest } = note;
  const response = await fetch(`/api/note/${id}`, {
    method: "PUT",
    body: JSON.stringify({ ...rest }),
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
export const getNoteRequest = async (id: string) => {
  const response = await fetch(`/api/note/${id}`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};
export const deleteNoteRequest = async (id: string) => {
  const response = await fetch(`/api/note/${id}`, { method: "DELETE" });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};
