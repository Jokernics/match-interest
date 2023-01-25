import { signOut } from 'firebase/auth';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { auth } from '../../firebase';

export interface authState {
  token: string | null;
}

const initialState: authState = {
  token: localStorage.getItem("token") || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredential: (state, action: PayloadAction<{ token: string | null }>) => {
      const token = action.payload.token;
      if (token) {
        state.token = token;
        localStorage.setItem("token", token);
      }
    },
    logOut: (state) => {
      signOut(auth)
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setCredential, logOut } = authSlice.actions;

export default authSlice.reducer;
