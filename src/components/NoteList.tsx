import { Todo } from "@/interfaces&types/todo.types";
import { AppDispatch } from "@/store/store";
import { ToDoState, doneTodo, getTodo, removeTodo } from "@/todoSlices/TodoSlice";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function NoteList() {
  const todos = useSelector(
    (state: { TodoSlice: ToDoState }) => state.TodoSlice
  );
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getTodo());
  }, [dispatch]);

  const deleteNoteHandler = async (todoId: string) => {
    try {
      if (todoId) {
        await dispatch(removeTodo(todoId));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const doneNoteHandler = async (todoId: string,isDone:boolean) => {
    try {
      if (todoId) {
        await dispatch(doneTodo({id:todoId,isDone}));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {todos.entities &&
        todos.entities.map((todo: Todo) => {
          return (
            <div key={todo.id}>
              <div className="note-item__header">
                <div>
                  <p className="title">{todo.title}</p>
                  <p className="desc">{todo.description}</p>
                </div>
                <div className="actions">
                  <button onClick={(e) => deleteNoteHandler(todo.id)}>
                    ❌
                  </button>
                  <input type="checkbox" checked={todo.isDone} onChange={()=>doneNoteHandler(todo.id,todo.isDone)}/>
                </div>
              </div>
              <p className="note-item__footer">
                {new Date(todo.createdAt).toISOString()}
              </p>
            </div>
          );
        })}
    </div>
  );
}

export default NoteList;
