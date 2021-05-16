import React, { useState, useRef } from "react";
import { connect, ConnectedProps } from "react-redux";
import { dispatchAddNote, TagValues } from "../redux/actions";

const mapDispatchToProps = {
  dispatchAddNote,
};

// `connect` is a Higher Order Component (Function?). So it returns a  function
// that in turn, takes another Component as parameter. A HOC is a pure function.
const connector = connect(
  null, // mapStateToProps is null, we don’t care about what’s in the store
  mapDispatchToProps
);

// Instead of doing this:
// interface Props {
//   addNote: (title: string, content: string, tag: TagValues) => AddNoteAction;
// }

// We can do this:
type ReduxProps = ConnectedProps<typeof connector>;

const NoteForm: React.FC<ReduxProps> = ({ dispatchAddNote }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState<TagValues>(TagValues.normal);
  const titleRef = useRef<HTMLInputElement>(null);
  const elementWidth = 160;

  // interface Event {
  //   preventDefault: () => void;
  // }

  const handleSubmission = (
    e: React.FormEvent<HTMLFormElement> /* alternative: e: Event */
  ) => {
    e.preventDefault();
    dispatchAddNote({ title, content, tag });
    setTitle("");
    setContent("");

    // set focus to the Input DOM element this reference points at
    titleRef.current?.focus();
  };

  const tagValues = Object.values(TagValues).filter(
    key => key !== TagValues.showAll
  );

  return (
    <>
      <h3>Add a Note</h3>
      <form onSubmit={handleSubmission}>
        Title: <br />
        <input
          type="text"
          name="title"
          ref={titleRef}
          value={title}
          style={{ width: elementWidth }}
          onChange={e => setTitle(e.target.value)}
        />
        <br />
        Content: <br />
        <textarea
          name="content"
          value={content}
          style={{ width: elementWidth * 1.5, height: 90 }}
          onChange={e => setContent(e.target.value)}
        ></textarea>
        <br />
        <div>
          <label htmlFor="tags">Tag:</label>
          <select
            name="tag"
            id="tags"
            onChange={e => setTag(e.target.value as TagValues)}
            style={{ marginLeft: 5 }}
          >
            {tagValues.map((tag, index) => (
              <option key={index} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
        <br />
        <button type="submit" style={{ marginBottom: 5 }}>
          Add Note
        </button>
      </form>
    </>
  );
};

export default connector(NoteForm);
