import {
  ADD_NOTE,
  REMOVE_NOTE,
  SetAllNotesAction,
  AddNoteAction,
  RemoveNoteAction,
  Note,
  SET_ALL_NOTES,
} from "../actions";

const notesReducer = (
  notes: Note[] = [],
  action: SetAllNotesAction | AddNoteAction | RemoveNoteAction
) => {
  switch (action.type) {
    case SET_ALL_NOTES:
      return [...action.payload.notes];
    case ADD_NOTE:
      const lastNote = notes.length > 0 ? notes[notes.length - 1] : notes[0];
      const lastNoteId = lastNote ? lastNote.id : 0;
      return [...notes, { ...action.payload, id: lastNoteId + 1 }];

    case REMOVE_NOTE:
      const { id } = action.payload;
      return notes.filter(note => note.id !== id);

    default:
      return notes;
  }
};

export default notesReducer;
