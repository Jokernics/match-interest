import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface authState {
  user: string | null;
}

const initialState: authState = {
  user: localStorage.getItem("user") || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveUser: (state) => {
      state.user = "userId";
      localStorage.setItem("user", "userId");
    },
    deleteUser: (state) => {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

export const { saveUser, deleteUser } = authSlice.actions;

export default authSlice.reducer;
