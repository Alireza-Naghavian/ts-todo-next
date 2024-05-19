import { Todo } from "@/interfaces&types/todo.types";
import { AppDispatch } from "@/store/store";
import { getTodo, postToDo } from "@/todoSlices/TodoSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

type pickTodoType = Pick<Todo, "title" | "description">;
const AddNewToDo = () => {
  const [todoData, setTodoData] = useState({
    title: "",
    description: "",
  } as pickTodoType);
  const dispatch: AppDispatch = useDispatch();
  const todoDataHandler = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = target;
    setTodoData({ ...todoData, [name]: value });
  };
  const submitTodoHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTodo: Todo = {
      title: todoData.title,
      description: todoData.description,
      isDone: false,
      createdAt: new Date(),
    };
    try {
      await dispatch(postToDo(newTodo));
      setTodoData({ title: "", description: "" });
    } catch (error) {
      console.error("Failed to add new todo:", error);
    }
  };
  return (
    <div className="add-new-note">
      <h2>Add New Note</h2>
      <form onSubmit={submitTodoHandler} className="note-form">
        <input
          type="text"
          name="title"
          value={todoData.title}
          onChange={todoDataHandler}
          className="text-field"
          placeholder="Note title"
        />
        <input
          type="text"
          name="description"
          value={todoData.description}
          onChange={todoDataHandler}
          className="text-field"
          placeholder="Note description"
        />
        <button type="submit" className="btn btn--primary">
          Add New Note
        </button>
      </form>
    </div>
  );
};

export default AddNewToDo;
