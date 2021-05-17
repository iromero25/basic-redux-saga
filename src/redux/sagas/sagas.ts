import { put, call, takeEvery } from "redux-saga/effects";
import {
  getAllNotes,
  addNote as addNoteApi,
  removeNote as removeNoteApi,
} from "../../api";
import {
  ADD_NOTE_DISPATCH,
  REMOVE_NOTE_DISPATCH,
  LOAD_ALL_NOTES,
  addNote,
  setAllNotes,
  setLoading,
  Note,
  DispatchAddNoteAction,
  DispatchRemoveNoteAction,
} from "../actions";

// remember this is a generator, and it cannot be an arrow function
function* loadAllNotes() {
  yield put(setLoading());
  const storedNotes: Note[] = yield call(getAllNotes);
  yield put(setAllNotes(storedNotes));
}

function* addNoteSaga(action: DispatchAddNoteAction) {
  // can we infer typing this part?
  // check how to type this
  yield put(setLoading());
  const addedNote: Note = yield call(addNoteApi, action.payload.note);
  yield put(addNote(addedNote));
}

function* removeNoteSaga(action: DispatchRemoveNoteAction) {
  yield call(removeNoteApi, action.payload.id);
  console.info("note removal completed");
}

export default function* allSagas() {
  yield takeEvery(LOAD_ALL_NOTES, loadAllNotes);
  yield takeEvery(ADD_NOTE_DISPATCH, addNoteSaga); //check how to type this
  yield takeEvery(REMOVE_NOTE_DISPATCH, removeNoteSaga); // takeLast maybe?
}
