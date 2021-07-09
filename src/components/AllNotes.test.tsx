import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { getAllNotesAPI } from "../api";
import { Note, TagValues } from "../redux/actions/";
import store from "../redux/store/store";
import AllNotes from "./AllNotes";

// Important: if we try to import * as X from '../redux/actions/' so we can spy on
// `loadNotesSagaAction` it won't work. We need to import from the actual module.
import * as sagaActions from "../redux/actions/sagasActionCreators";
import "@testing-library/jest-dom";

const notes: Note[] = [
  {
    id: 1,
    title: "Laundry",
    content: "Have some laundry to do",
    tag: TagValues.normal,
  },
];

// To be aware of: DO NOT need to run any sagas manually for the tests: I believe
// that (along with middleware setup) is done for us in the `store` file, so it's
// all set up
const Wrapper: React.FC = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

// it doesn't make any sense to add an async in the next line! We return an object that's it.
jest.mock("../api", () => ({
  // Need mock this API call as it is consumed by the `loadNotesSagaAction` that
  // we are testing in this file
  getAllNotesAPI: jest.fn().mockImplementation(async () => Promise.resolve(notes)),
}));

// As labelled by this test, this is in fact, a saga integration test
describe("Saga integration test", () => {
  // AllNotes component renders note data added by the dispatch of a saga-processed
  // action triggered @ the useEffect hook
  test("AllNotes component renders note data", async () => {
    // I just want to spy on this saga, not to mock any implementation but to
    // check it had been called:
    const loadNotesSagaSpy = jest.spyOn(sagaActions, "loadNotesSagaAction");

    const { findByText } = render(
      <Wrapper>
        <AllNotes />
      </Wrapper>
    );
    expect(loadNotesSagaSpy).toHaveBeenCalled();
    expect(getAllNotesAPI).toHaveBeenCalled();

    const noteTitle = await findByText(notes[0].title);
    expect(noteTitle).toBeInTheDocument();
  });
});
