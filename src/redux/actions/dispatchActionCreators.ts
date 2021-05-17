import { Action } from "redux";
import { Note } from "./actionCreators";
import {
  ADD_NOTE_DISPATCH,
  REMOVE_NOTE_DISPATCH,
  LOAD_NOTES_DISPATCH,
} from "./actionTypes";

// action creators for  actions that are  dispatched  via
// `mapDispatchToProps` and that are listened to by sagas

export interface DispatchLoadNotesAction
  extends Action<typeof LOAD_NOTES_DISPATCH> {}

export interface DispatchAddNoteAction extends Action<typeof ADD_NOTE_DISPATCH> {
  payload: {
    note: Omit<Note, "id">;
  };
}

export interface DispatchRemoveNoteAction
  extends Action<typeof REMOVE_NOTE_DISPATCH> {
  payload: {
    id: Note["id"];
  };
}

export const dispatchLoadNotes = (): DispatchLoadNotesAction => ({
  type: LOAD_NOTES_DISPATCH,
});

export const dispatchAddNote = (note: Omit<Note, "id">): DispatchAddNoteAction => ({
  type: ADD_NOTE_DISPATCH,
  payload: { note },
});

export const dispatchRemoveNote = (id: Note["id"]): DispatchRemoveNoteAction => ({
  type: REMOVE_NOTE_DISPATCH,
  payload: { id },
});
