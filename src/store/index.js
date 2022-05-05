import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = { snackbars: [] };

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    addSnackbar(state, action) {
      state.snackbars.push({
        id: Math.random(),
        message: action.payload.message,
        style: action.payload.style,
      });
    },
    removeSnackbar(state, action) {
      state.snackbars = state.snackbars.filter(
        (snackbar) => snackbar.id !== action.payload.id
      );
    },
  },
});

export const { addSnackbar, removeSnackbar } = snackbarSlice.actions;

const store = configureStore({ reducer: snackbarSlice.reducer });

export default store;
