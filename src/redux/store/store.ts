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

const emptyInitialState = {};
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  emptyInitialState,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;
