import React from "react";
import { ReduxProps as AllNotesProps } from "./AllNotes";
import { Note } from "../redux/actions";

interface Props {
  note: Note;
  removeNote: AllNotesProps["removeNote"];
  removeNoteSagaAction: AllNotesProps["removeNoteSagaAction"];
}

const NoteComponent: React.FC<Props> = ({
  note,
  removeNote,
  removeNoteSagaAction,
}) => (
  <>
    <b>{note.title}</b>
    <button
      onClick={() => {
        // Optimistic delete! Remove  the note from the store (synchronously) straight
        // away while also dispatching the asynchronous delete of the note from the db,
        // hoping the op will be executed successfully at a later time.
        removeNote(note.id);
        removeNoteSagaAction(note.id);
      }}
      style={{ marginLeft: 5 }}
    >
      x
    </button>
    <br />
    <span>{note.content}</span>
    <br />
    <span>{`tag: ${note.tag}`}</span>
  </>
);

export default NoteComponent;
