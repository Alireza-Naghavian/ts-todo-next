import { Todo } from "@/interfaces&types/todo.types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface ToDoState {
  entities: Todo[];
  loading: "pending" | "fulfilled" | "rejected";
  error: string | null;
}

const initialState: ToDoState = {
  entities: [],
  loading: "pending",
  error: null,
};

export const postToDo = createAsyncThunk(
  "todos/addNewTodo",
  async (newTodo: Todo, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:5000/todos", newTodo);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTodo = createAsyncThunk(
  "todos/getTodos",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get<Todo[]>("http://localhost:5000/todos");
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const removeTodo = createAsyncThunk(
  "todos/removeTodo",
  async (todoId: string, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${todoId}`);
      return todoId;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const doneTodo = createAsyncThunk(
  "todos/doneTodo",
  async (payload: { id: string; isDone: boolean }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/todos/${payload.id}`,
        { isDone: !payload.isDone }
      );
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
const TodoSlice = createSlice({
  name: "Todos",
  initialState,
  reducers: {
    sortByLatest: (state) => {
     state.entities = state.entities.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    },
    sortByEarliest: (state) => {
      state.entities =   state.entities.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    },
    sortByCompletion: (state) => {
      console.log(state.entities =   state.entities.sort((a, b) => Number(b.isDone) - Number(a.isDone)));
    },
  },
  extraReducers: (builder) => {
    /////
    // post our todos
    /////
    builder.addCase(postToDo.pending, (state): void => {
      state.loading = "pending";
    });
    builder.addCase(
      postToDo.fulfilled,
      (state, action: PayloadAction<Todo>): void => {
        state.entities.push(action.payload);
        state.loading = "fulfilled";
      }
    ),
      builder.addCase(postToDo.rejected, (state, action): void => {
        state.error = action.error.message || "failed to add todo";
        state.loading = "rejected";
      });
    //////
    // get our todos
    //////
    builder.addCase(getTodo.pending, (state): void => {
      state.loading = "pending";
    });
    builder.addCase(
      getTodo.fulfilled,
      (state, action: PayloadAction<Todo[]>): void => {
        state.loading = "fulfilled";
        state.entities = action.payload;
      }
    ),
      builder.addCase(getTodo.rejected, (state, action): void => {
        state.error = action.error.message || "failed to add todo";
        state.loading = "rejected";
      });
    //////
    // remove  todo
    //////
    builder.addCase(removeTodo.pending, (state): void => {
      state.loading = "pending";
    });
    builder.addCase(
      removeTodo.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.entities = state.entities.filter(
          (todo) => todo.id !== action.payload
        );
        state.loading = "fulfilled";
      }
    ),
      builder.addCase(removeTodo.rejected, (state, action): void => {
        state.error = action.error.message || "failed to add todo";
        state.loading = "rejected";
      });
    // //////
    // done todo
    // //////
    builder.addCase(
      doneTodo.fulfilled,
      (state, action: PayloadAction<Todo>) => {
        const selectTodo = state.entities.find(
          (todo) => todo.id == action.payload.id
        );
        if (selectTodo) selectTodo.isDone = action.payload.isDone;
        state.loading = "fulfilled";
      }
    );
  },
});
export const { sortByCompletion, sortByEarliest, sortByLatest } =
  TodoSlice.actions;
export default TodoSlice.reducer;
