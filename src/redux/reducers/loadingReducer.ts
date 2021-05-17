import {
  ADD_NOTE,
  REMOVE_NOTE,
  SET_ALL_NOTES,
  SET_LOADING,
  AddNoteAction,
  RemoveNoteAction,
  SetAllNotesAction,
  SetLoadingAction,
} from "../actions";

export const loadingReducer = (
  loading = false,
  action: AddNoteAction | RemoveNoteAction | SetLoadingAction | SetAllNotesAction
) => {
  switch (action.type) {
    case SET_LOADING:
      return true;

    case ADD_NOTE:
    case REMOVE_NOTE:
    case SET_ALL_NOTES:
      return false;

    default:
      return loading;
  }
};
