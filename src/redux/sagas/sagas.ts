import { put, call, takeEvery } from "redux-saga/effects";
import { getAllNotes, addNote as addNoteApi } from "../../api";
import {
  ADD_NOTE_DISPATCH,
  LOAD_ALL_NOTES,
  AddNoteAction,
  addNote,
  setAllNotes,
  setLoading,
  Note,
  DispatchAddNoteAction,
} from "../actions";

// remember this is a generator, and it cannot be an arrow function
function* loadAllNotes() {
  yield put(setLoading());
  const storedNotes: Note[] = yield call(getAllNotes);
  yield put(setAllNotes(storedNotes));
}

function* addNoteSaga(action: DispatchAddNoteAction) { // can we infer typing this part?
  // check how to type this
  yield put(setLoading());
  const addedNote: Note = yield call(addNoteApi, action.payload.note);
  yield put(addNote(addedNote));
}

export default function* allSagas() {
  yield takeEvery(LOAD_ALL_NOTES, loadAllNotes);
  yield takeEvery(ADD_NOTE_DISPATCH, addNoteSaga); //check how to type this
}
