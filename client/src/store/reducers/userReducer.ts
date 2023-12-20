import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  accessToken: string | null;
}

const initialState: UserState = {
  accessToken: localStorage.getItem("accessToken") || null,
};

export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    logoutUser: (state) => {
      state.accessToken = null;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
