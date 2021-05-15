import React from "react";
import { Note, removeNote } from "../redux/actions";

interface Props {
  note: Note;
  removeNote: typeof removeNote;
}

const Note: React.FC<Props> = ({note, removeNote}) => (
  <>
    <b>{note.title}</b>
    <button onClick={() => removeNote(note.id)} style={{ marginLeft: 5 }}>
      x
    </button>
    <br />
    <span>{note.content}</span>
    <br />
    <span>{`tag: ${note.tag}`}</span>
  </>
);

export default Note;
