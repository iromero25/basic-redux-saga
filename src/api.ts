import { Note } from "./redux/actions";

// change this to handle baseURl when in heroku
const baseURl = "http://localhost:3000/";

export const getAllNotesAPI = async () => {
  try {
    const result = await fetch(baseURl + "api/notes");
    return await result.json();
  } catch (e) {
    return console.error(e);
  }
};

export const addNoteAPI = async (note: Omit<Note, "id">) => {
  const response = await fetch(baseURl + "api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  return response.json();
};

export const removeNoteAPI = async (id: Note["id"]) => {
  try {
    const response = await fetch(baseURl + `api/notes/${id}`, { method: "DELETE" });
    return response.json();
  } catch (e) {
    return console.error(e);
  }
};
