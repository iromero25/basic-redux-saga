import { Action } from "redux";
import { addNote, removeNote } from "../redux/actions";

// This file is just storing experimental dynamic Typing with Generics that didn't take off.

// The aim was to craate a "mapDispatchToProps" function creator with the following conditions:

// - the function takes an object mapping strings to ActionCreators (i.e.: functions
//   that return an Action). Here's an example of the object mapping:

/*
// both `addNote` and `removeNote` are functiond that receive something and return an Action
{
  attr1: addNote 
  attr2: removeNote
}
*/

// The function creator was trying to type everything so that it would guard against
// receiving an ActionCreator that doesn't comply with an Action interface, and more
// specifically, guard against an action creator whose returned Action object's `payload` 
// attr was an empty object. This proved to be very difficult with my actual knowledge.

// So I am adding some of the experimental functions and typing I created for this goal:

// this successfully types an empty object
type EmptyObject = { [a: string]: never };

// proof:
const emptyObject: EmptyObject = {};
//const anotherEmptyoObj: EmptyObject = { s: "" }; // incorrect, as expected

// The following typing uses a generic that is evaluated against an empty object
// and other undesired types so to specify that those cases should never happen:
type NonEmptyObject<T> = T extends EmptyObject | Array<any> | string | number
  ? never
  : T;

// so it can be used in a function:
const nonEmptyFn = <T>(
  param: T extends EmptyObject | Array<any> | string | number ? never : T
) => param;

// const myNonEmptyArray = nonEmptyFn({}); // incorrect, as expected

interface CustomAction<W> extends Action {
  payload: NonEmptyObject<W>;
}

// this function SUCCESSFULLY does what is meant to do:
// receives an ActionCreator (again a function) and evaluates that the payload
// attribute speified as part of the returned Action is not an empty object.
// It relies on the CustomAction interface that in turn, uses a Generic type.
const dispatchWrapper =
  <Z>(func: (param: any) => CustomAction<Z>) =>
  (dispatch: Function): void =>
    dispatch(func);

const randomFn = (note: number) => ({
  type: "SOME_ACTION",
  payload: {},
});

const dispatchAddNote = dispatchWrapper(addNote);
const dispatchRemoveNote = dispatchWrapper(removeNote);
//const dispatchRandomNote = dispatchWrapper(randomFn); // incorrect, as expected
