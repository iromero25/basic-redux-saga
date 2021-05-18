import { Action } from "redux";
import { Note } from "./actionCreators";
import {
  ADD_NOTE_SAGA_ACTION,
  REMOVE_NOTE_SAGA_ACTION,
  LOAD_NOTES_SAGA_ACTION,
} from "./actionTypes";

// action creators for  actions that are  dispatched  via
// `mapDispatchToProps` and that are listened to by sagas

export interface LoadNotesSagaAction
  extends Action<typeof LOAD_NOTES_SAGA_ACTION> {}

export interface AddNoteSagaAction extends Action<typeof ADD_NOTE_SAGA_ACTION> {
  payload: {
    note: Omit<Note, "id">;
  };
}

export interface RemoveNoteSagaAction
  extends Action<typeof REMOVE_NOTE_SAGA_ACTION> {
  payload: {
    id: Note["id"];
  };
}

export const loadNotesSagaAction = (): LoadNotesSagaAction => ({
  type: LOAD_NOTES_SAGA_ACTION,
});

export const addNoteSagaAction = (note: Omit<Note, "id">): AddNoteSagaAction => ({
  type: ADD_NOTE_SAGA_ACTION,
  payload: { note },
});

export const removeNoteSagaAction = (id: Note["id"]): RemoveNoteSagaAction => ({
  type: REMOVE_NOTE_SAGA_ACTION,
  payload: { id },
});
