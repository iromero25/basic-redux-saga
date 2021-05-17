import { Action } from "redux";
import {
  ADD_NOTE,
  FILTER_NOTE,
  REMOVE_NOTE,
  SET_ALL_NOTES,
  SET_LOADING,
} from "./actionTypes";

export type Note = { id: number; title: string; content: string; tag: string };
export type Tag = { tag: TagValues };
export type Loading = { loading: boolean };

export enum TagValues {
  showAll = "Show All",
  normal = "Normal",
  archived = "Archived",
  priority = "Priority",
}

export interface SetAllNotesAction extends Action<typeof SET_ALL_NOTES> {
  payload: {
    notes: Note[];
  };
}

export interface AddNoteAction extends Action<typeof ADD_NOTE> {
  payload: {
    note: Note;
  };
}

export interface FilterNoteAction extends Action<typeof FILTER_NOTE> {
  payload: Tag;
}

export interface RemoveNoteAction extends Action<typeof REMOVE_NOTE> {
  payload: { id: Note["id"] };
}

export interface SetLoadingAction extends Action<typeof SET_LOADING> {}

export const setAllNotes = (notes: Note[]): SetAllNotesAction => ({
  type: SET_ALL_NOTES,
  payload: {
    notes,
  },
});

export const addNote = (note: Note): AddNoteAction => ({
  type: ADD_NOTE,
  payload: {
    note,
  },
});

export const removeNote = (id: number): RemoveNoteAction => ({
  type: REMOVE_NOTE,
  payload: { id },
});

export const updateVisibility = (tag: TagValues): FilterNoteAction => ({
  type: FILTER_NOTE,
  payload: {
    tag,
  },
});

export const setLoading = (): SetLoadingAction => ({
  type: SET_LOADING,
});
