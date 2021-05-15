import {
  SET_ALL_NOTES,
  SET_LOADING,
  SetAllNotesAction,
  SetLoadingAction,
} from "../actions";

export const loadingReducer = (
  loading = false,
  action: SetLoadingAction | SetAllNotesAction
) => {
  console.log("loading reducer", action);
  switch (action.type) {
    case SET_LOADING:
      return true;
    case SET_ALL_NOTES:
      return false;
    default:
      return loading;
  }
};
