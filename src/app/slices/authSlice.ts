import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface authState {
  token: string | null;
}

const initialState: authState = {
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredential: (state, action: PayloadAction<{ token: string | null }>) => {
      const token = action.payload.token;
      if (token) {
        state.token = token;
      }
    },
    logOut: (state) => {
      state.token = null;
    },
  },
});

export const { setCredential, logOut } = authSlice.actions;

export default authSlice.reducer;
