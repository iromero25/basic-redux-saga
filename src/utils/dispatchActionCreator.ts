import { Dispatch } from "react";
import { Action } from "redux";

type CustomAction = Action & { payload?: Record<string, unknown> };

// this type was created to deal with any action creators that do not
// require to be invoked with parameter (eg: `loadNotesSagaAction`).
// The trick is to evaluate if the ActionCreator type expects a `payload`
// parameter to set whethe the function that is specified as type expects
// a parameter OR an OPTIONAL parameter.
type ActionCreatorReturnType<ActionCreator, Payload, RetType> =
  ActionCreator extends {
    payload: unknown;
  }
    ? (payload: Payload) => RetType // expects parameter
    : (payload?: Payload) => RetType; // doesn't expect one (ie. can be empty)

const dispatchActionCreator =
  <
    T extends Action,
    Payload = T extends { payload: unknown }
      ? T["payload"][keyof T["payload"]]
      : unknown
  >(
    dispatch: Dispatch<CustomAction>,
    actionCreator: ActionCreatorReturnType<T, Payload, T>
  ): ActionCreatorReturnType<T, Payload, void> =>
  payload =>
    dispatch(actionCreator(payload));

export default dispatchActionCreator;
