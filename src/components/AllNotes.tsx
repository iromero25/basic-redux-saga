import React, { useEffect } from "react";
import { ConnectedProps } from "react-redux";
import { TagValues } from "../redux/actions";
import Note from "../components/Note";
import AllNotesConnector from "./AllNotesConnector";

export type ReduxProps = ConnectedProps<typeof AllNotesConnector>;

// We are mapping state (and dispatch) to props and thus we don't need
// to pass any props down from this component's parent,  but we  still
// have to specify the props param so we can reference it in the code!
const AllNotes: React.FC<ReduxProps> = ({
  notes,
  visibility,
  loading,
  removeNote,
  updateVisibility,
  loadNotesSagaAction,
  removeNoteSagaAction,
}) => {
  useEffect(() => {
    loadNotesSagaAction();
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
                  removeNoteSagaAction={removeNoteSagaAction}
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

export default AllNotesConnector(AllNotes);
