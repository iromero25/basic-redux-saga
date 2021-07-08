import { Dispatch } from "react";
import { connect } from "react-redux";
import { Store } from "../redux/store/store";
import dispatchActionCreator from "../utils/dispatchActionCreator";

import {
  loadNotesSagaAction,
  removeNote,
  removeNoteSagaAction,
  updateVisibility,
  FilterNoteAction,
  LoadNotesSagaAction,
  RemoveNoteAction,
  RemoveNoteSagaAction,
} from "../redux/actions";

const mapStateToProps = (state: Store) => ({
  notes: state.notes,
  visibility: state.visibility,
  loading: state.loading,
});

// `mapDispatchToProps` is a function receiving the `dispatch` function as param and
// returns an object (or map) of attributes related to functions using `dispatch` to
// trigger different action creators. Remember `mapDispatchToProps` maps such object
// to the component's props for accesibility in the componen't scope.

// Here's what a completely typed `mapDispatchToProps` would look like without using
// the `dispatchActionCreator` function that infers types for each action creator
// being dispatched:

// const mapDispatchToProps = (
//   dispatch: Dispatch<
//     LoadNotesSagaAction | FilterNoteAction | RemoveNoteAction | RemoveNoteSagaAction
//   >
// ) => ({
//   removeNote: (id: RemoveNoteAction["payload"]["id"]) =>
//     dispatch(removeNote(id)),
//   updateVisibility: (tag: FilterNoteAction["payload"]["tag"]) =>
//     dispatch(updateVisibility(tag)),
//   loadNotesSagaAction: () => dispatch(loadNotesSagaAction()),
//   removeNoteSagaAction: (id: RemoveNoteSagaAction["payload"]["id"]) =>
//     dispatch(removeNoteSagaAction(id)),
// });

const mapDispatchToProps = (
  dispatch: Dispatch<
    RemoveNoteAction | FilterNoteAction | LoadNotesSagaAction | RemoveNoteSagaAction
  >
) => ({
  removeNote: dispatchActionCreator(dispatch, removeNote),
  updateVisibility: dispatchActionCreator(dispatch, updateVisibility),
  loadNotesSagaAction: dispatchActionCreator(dispatch, loadNotesSagaAction),
  removeNoteSagaAction: dispatchActionCreator(dispatch, removeNoteSagaAction),
});

export default connect(mapStateToProps, mapDispatchToProps);
