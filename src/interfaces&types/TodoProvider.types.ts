import { Dispatch } from "react";
import { Todo } from "./todo.types";

export interface ToDoProviderWithProps {
  children: React.ReactNode;
}
export interface TodoActions {
  type: "ADDTODO";
  payload: Todo;
}
