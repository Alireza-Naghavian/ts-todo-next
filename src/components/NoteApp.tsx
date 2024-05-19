import React from "react";
import AddNewToDo from "./AddNewToDo";
import NoteStatus from "./NoteStatus";
import NoteList from "./NoteList";

function NoteApp() {
  return (
    <div className="note-app">
      <AddNewToDo />
      <div className="note-container">
        <NoteStatus />
        <NoteList />
      </div>
    </div>
  );
}

export default NoteApp;
