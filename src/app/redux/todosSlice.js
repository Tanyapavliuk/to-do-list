import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addNewTask: (state, action) => [action.payload, ...state],
    changeStatus: (state, action) => {
      const newArray = state.map(todo => {
        if (todo.id === action.payload) {
          todo.isProces = !todo.isProces;
          return { todo };
        }
        return { todo };
      });

      state = newArray;
    },
    deleteById: (state, action) => [
      ...state.filter(({ id }) => id !== action.payload),
    ],
    updateTaskById: (state, { payload }) => {
      const { id, updatedTask } = payload;
      const index = state.findIndex(todo => todo.id === id);
      state.splice(index, 1, updatedTask);
      return state;
    },
  },
});

export const { addNewTask, changeStatus, deleteById, updateTaskById } =
  todosSlice.actions;

export default todosSlice.reducer;
