import {
  ADD_NOTE,
  SET_ALL_NOTES,
  SET_LOADING,
  AddNoteAction,
  SetAllNotesAction,
  SetLoadingAction,
} from "../actions";

export const loadingReducer = (
  loading = false,
  action: AddNoteAction | SetLoadingAction | SetAllNotesAction
) => {
  console.log("loading reducer", action);
  switch (action.type) {
    case SET_LOADING:
      return true;

    case ADD_NOTE:
    case SET_ALL_NOTES:
      return false;

    default:
      return loading;
  }
};
