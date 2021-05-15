import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import notesReducer from "../reducers/notesReducer";
import visibilityReducer from "../reducers/visibilityReducer";
import { loadingReducer } from "../reducers/loadingReducer";
import rootSaga from "../sagas";

export type Store = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  notes: notesReducer,
  visibility: visibilityReducer,
  loading: loadingReducer,
});

const initialState = undefined;
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  {},
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga); // Run redux-saga

export default store;
