import React, { useState, useRef } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Store } from "../redux/store/store";
import { addNoteSagaAction, TagValues } from "../redux/actions";
import { isEmpty } from "lodash";
import InputMissingError from "./InputMissingError";

const mapStateToProps = (state: Store) => ({
  loading: state.loading,
});

const mapDispatchToProps = {
  addNoteSagaAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

const NoteForm: React.FC<ReduxProps> = ({ loading, addNoteSagaAction }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState<TagValues>(TagValues.normal);
  const [inputInfoIsMissing, setInputInfoIsMissing] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const elementWidth = 160;

  // interface Event {
  //   preventDefault: () => void;
  // }

  const handleSubmission = (
    e: React.FormEvent<HTMLFormElement> /* alternative: e: Event */
  ) => {
    e.preventDefault();
    if (isEmpty(title) || isEmpty(content)) {
      setInputInfoIsMissing(true);
      return;
    }
    addNoteSagaAction({ title, content, tag });
    setTitle("");
    setContent("");
    setInputInfoIsMissing(false);

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
          style={{ width: elementWidth, marginBottom: 5 }}
          onChange={e => setTitle(e.target.value)}
        />
        <br />
        Content: <br />
        <textarea
          name="content"
          value={content}
          style={{ width: elementWidth * 1.5, height: 90, marginBottom: 5 }}
          onChange={e => setContent(e.target.value)}
        ></textarea>
        <br />
        <div style={{marginBottom: -5}}>
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
        <button
          type="submit"
          disabled={loading}
          style={{ marginBottom: 5 }}
        >
          Add Note
        </button>
        {inputInfoIsMissing && <InputMissingError />}
      </form>
    </>
  );
};

export default connector(NoteForm);
