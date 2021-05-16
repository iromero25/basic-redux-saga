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
      return [...notes, { ...action.payload.note }];

    case REMOVE_NOTE:
      const { id } = action.payload;
      return notes.filter(note => note.id !== id);

    default:
      return notes;
  }
};

export default notesReducer;
