import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { registerAsync } from "./userAPI";

export enum Status {
  IDLE = "idle",
  LOADING = "loading",
  FAILED = "failed",
}

export interface User {
  username: string;
  email: string;
  password: string;
}

export interface UserState {
  user: User;
  status: Status;
}

const initialState: UserState = {
  user: {
    username: '',
    email: '',
    password: '',
  },
  status: Status.IDLE,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: { 
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAsync.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(registerAsync.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = Status.IDLE;
        const { user } = action.payload;
        state.user = user;
      })
      .addCase(registerAsync.rejected, (state) => {
        state.status = Status.FAILED;
      })

  },
});

export const { updateUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.user;
export const selectUserStatus = (state: RootState) => state.user.status;
export default userSlice.reducer;
