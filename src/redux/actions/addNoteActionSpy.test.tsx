import React, { Dispatch, useEffect } from "react";
import store, { Store } from "../store/store";
import { Provider, connect } from "react-redux";
import { fireEvent, render } from "@testing-library/react";
import { addNote, Note, TagValues } from "./actionCreators";
import * as actionCreators from "./actionCreators";
import "@testing-library/jest-dom";

const notesBucket: Note[] = [
  {
    id: 1,
    title: "A Dummy Note",
    content: "This is a dummy content for a note",
    tag: TagValues.archived,
  },
  {
    id: 2,
    title: "Another Dummy Note",
    content: "This is another dummy content for a note",
    tag: TagValues.archived,
  },
];

const Wrapper: React.FC = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

const mapStateToProps = (state: Store) => ({
  notes: state.notes,
});

// IMPORTANT: the  methods passed through `mapDispatchToProps` cannot be spied upon/mocked if they
// are defined using the object version of  `mapDispatch...`. We have to use the function  version
// that receives `dispatch` and use it  to trigger  the actions for  our tests to work as expected.
const mapDispatchToProps = (dispatch: Dispatch<actionCreators.AddNoteAction>) => ({
  addNote: (noteToAdd: Note) => dispatch(addNote(noteToAdd)),
});

const ButtonComponent: React.FC<{
  notes: Note[];
  addNote: (note: Note) => void;
}> = ({ addNote, notes }) => {
  useEffect(() => {
    addNote(notesBucket[0]);
  }, []);

  return (
    <>
      {notes.map(note => (
        <span key={note.id}>{note.title}</span>
      ))}
      <button onClick={() => addNote(notesBucket[1])}>Press me!</button>
    </>
  );
};

const ConnectedButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonComponent);

test("DOM updated as `addNote` is triggered at useEffect and button click", async () => {
  const spy = jest.spyOn(actionCreators, "addNote");
  // here we can potentially add a mocked implementation like this:
  // .mockImplementation(() => {
  //   console.log("we are hitting the mocked implementation of loadNotes");
  //   return { type: "dummy type" } as any;
  // });

  const { getByText, queryByText } = render(
    <Wrapper>
      <ConnectedButton />
    </Wrapper>
  );

  // I expect `addNote` to have been called immediately as it is triggered by `useEffect`
  expect(spy).toHaveBeenCalledTimes(1);

  // the first dummy note should be in the DOM, but not the second dummy note
  const firstDummyNote = getByText(notesBucket[0].title);
  expect(firstDummyNote).toBeInTheDocument();
  expect(queryByText(notesBucket[1].title)).not.toBeInTheDocument();

  // it is after the button is clicked that we  trigger adding  a the second  dummy note
  // which now should be in the DOM but we also check `addNote` had been triggered again
  const button = getByText("Press me!");
  fireEvent.click(button);
  expect(spy).toHaveBeenCalled();
  expect(getByText(notesBucket[1].title)).toBeInTheDocument();

  expect(spy).toHaveBeenCalledTimes(2);
});

// To Do: find a better place for this test and explain what happened in the README!
