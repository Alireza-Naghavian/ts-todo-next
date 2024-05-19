export type Todo = {
  id?:any,
  title: string
  description: string
  isDone: boolean
  createdAt: Date
}
export interface TodoList {
  todos: Todo[];
}
