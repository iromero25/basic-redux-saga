import { spawn } from "redux-saga/effects";
import allSagas from "./sagas";

export default function* rootSaga() {
  console.log("Hello From Redux-Saga!");
  yield spawn(allSagas);
}
