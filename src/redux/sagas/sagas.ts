import { put, call, takeEvery } from "redux-saga/effects";
import { getAllNotesAPI, addNoteAPI, removeNoteAPI } from "../../api";
import {
  ADD_NOTE_SAGA_ACTION,
  LOAD_NOTES_SAGA_ACTION,
  REMOVE_NOTE_SAGA_ACTION,
  addNote,
  setAllNotes,
  setLoading,
  Note,
  AddNoteSagaAction,
  RemoveNoteSagaAction,
} from "../actions";

// remember a generator cannot be an arrow function
function* loadNotesSaga() {
  yield put(setLoading());
  const storedNotes: Note[] = yield call(getAllNotesAPI);
  yield put(setAllNotes(storedNotes));
}

function* addNoteSaga(action: AddNoteSagaAction) {
  // can we infer typing this part?
  // check how to type this
  yield put(setLoading());
  const addedNote: Note = yield call(addNoteAPI, action.payload.note);
  yield put(addNote(addedNote));
}

function* removeNoteSaga(action: RemoveNoteSagaAction) {
  yield call(removeNoteAPI, action.payload.id);
  console.info("note removal completed");
}

export default function* allSagas() {
  yield takeEvery(LOAD_NOTES_SAGA_ACTION, loadNotesSaga);
  yield takeEvery(ADD_NOTE_SAGA_ACTION, addNoteSaga); //check how to type this
  yield takeEvery(REMOVE_NOTE_SAGA_ACTION, removeNoteSaga); // takeLast maybe?
}
