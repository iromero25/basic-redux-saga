import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";

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
const middlewares =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? [sagaMiddleware, logger]
    : [sagaMiddleware];

const store = createStore(
  rootReducer,
  emptyInitialState,
  applyMiddleware(...middlewares)
);

sagaMiddleware.run(rootSaga);

export default store;
