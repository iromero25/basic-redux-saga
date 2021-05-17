import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Store } from "../redux/store/store";
import Note from "./Note";
import {
  TagValues,
  removeNote,
  dispatchLoadNotes,
  dispatchRemoveNote,
  updateVisibility,
} from "../redux/actions";

const mapStateToProps = (state: Store) => ({
  notes: state.notes,
  visibility: state.visibility,
  loading: state.loading,
});

// `mapDispatchToProps` could be a function that receives the `dispatch` fn
// as parameter but the docs say it's no longer required; specify an object
// mapping attrs to functions (action creators) instead.
// Extra benefit: we don't have to type the dispatch function.
const mapDispatchToProps = {
  removeNote,
  updateVisibility,
  dispatchLoadNotes,
  dispatchRemoveNote,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

// We are mapping state (and dispatch) to props and thus we don't need
// to pass any props down from this component's parent,  but we  still
// have to specify the props param so we can reference it in the code!
const AllNotes: React.FC<ReduxProps> = ({
  notes,
  visibility,
  loading,
  removeNote,
  updateVisibility,
  dispatchLoadNotes,
  dispatchRemoveNote,
}) => {
  useEffect(() => {
    dispatchLoadNotes();
  }, []);

  const tagValues = Object.values(TagValues);
  const notesToDisplay =
    visibility === TagValues.showAll
      ? notes
      : notes.filter(note => note.tag === visibility);

  return (
    <>
      <h3>All Notes</h3>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <>
          <ul>
            {notesToDisplay.map((note, index) => (
              <li key={index} style={{ marginBottom: 8 }}>
                <Note
                  note={note}
                  removeNote={removeNote}
                  dispatchRemoveNote={dispatchRemoveNote}
                />
              </li>
            ))}
          </ul>
          <div>
            <h3>Filter notes</h3>
            <select
              name="tag"
              onChange={e => updateVisibility(e.target.value as TagValues)}
            >
              {tagValues.map((tag, index) => (
                <option key={index} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </>
  );
};

export default connector(AllNotes);
