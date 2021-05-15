import { Action } from "redux";
import {
  ADD_NOTE,
  FILTER_NOTE,
  REMOVE_NOTE,
  SET_ALL_NOTES,
  SET_LOADING,
} from "./actionTypes";

export type Note = { id: number; title: string; content: string; tag: string };
export type NoteId = { id: number };
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
  payload: Omit<Note, "id">;
}

export interface FilterNoteAction extends Action<typeof FILTER_NOTE> {
  payload: Tag;
}

export interface RemoveNoteAction extends Action<typeof REMOVE_NOTE> {
  payload: NoteId;
}

export interface SetLoadingAction extends Action<typeof SET_LOADING> {}

export const setAllNotes = (notes: Note[]): SetAllNotesAction => ({
  type: SET_ALL_NOTES,
  payload: {
    notes,
  },
});

export const addNote = (
  title: string,
  content: string,
  tag: TagValues
): AddNoteAction => ({
  type: ADD_NOTE,
  payload: {
    title,
    content,
    tag,
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
