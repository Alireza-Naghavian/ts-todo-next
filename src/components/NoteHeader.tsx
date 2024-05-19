import { AppDispatch } from '@/store/store';
import { ToDoState, sortByCompletion, sortByEarliest, sortByLatest } from '@/todoSlices/TodoSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

function NoteHeader() {
  const [sortby,setSortBy] = useState("sortByLatest")
  const dispatch:AppDispatch= useDispatch();
  const todos = useSelector(
    (state: { TodoSlice: ToDoState }) => state.TodoSlice
  );
  console.log(todos);
  useEffect(() => {
    switch (sortby) {
      case "sortByLatest":
        dispatch(sortByLatest());
        break;
      case "sortByEarliest":
        dispatch(sortByEarliest());
        break;
      case "sortByCompletion":
        dispatch(sortByCompletion());
        break;
      default:
        break;
    }
  }, [sortby, dispatch]);
  console.log(sortby);
  return (
    <div className="note-header">
      <h1></h1>
      <select  value={sortby} onChange={(e)=>setSortBy(e.target.value)}>
        <option value="sortByLatest" >Sort based on latest notes</option>
        <option value="sortByEarliest" >Sort based on earliest notes</option>
        <option value="sortByCompletion" >Sort based on completed notes</option>
      </select>
    </div>
  )
}

export default NoteHeader