import React from "react";
import NoteForm from "./NoteForm";
import AllNotes from "./AllNotes";

const App = () => (
  <>
    <h1>React Redux Notes App</h1>
    <NoteForm />
    <hr />
    <AllNotes />
  </>
);

export default App;
