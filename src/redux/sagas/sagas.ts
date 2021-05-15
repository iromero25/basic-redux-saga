import { put, call, takeEvery } from "redux-saga/effects";
import { getAllNotes } from "../../api";
import { setAllNotes, setLoading, Note, LOAD_ALL_NOTES } from "../actions";

// remember this is a generator, and it cannot be an arrow function
function* loadAllNotes() {
  console.log("inside loadAllNotes saga");
  yield put(setLoading());
  const storedNotes: Note[] = yield call(getAllNotes);
  yield put(setAllNotes(storedNotes));
}

export default function* allSagas() {
  yield takeEvery(LOAD_ALL_NOTES, loadAllNotes);
}
