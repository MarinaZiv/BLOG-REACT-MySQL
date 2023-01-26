import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface NavbarState {
  isShowingNavbar: boolean;
}

const initialState: NavbarState = {
  isShowingNavbar: true,
};

export const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    showNavbar(state) {
      state.isShowingNavbar = true;
    },
    hideNavbar(state) {
      state.isShowingNavbar = false;
    },
  },
});

export const isShowingNavbarSelector = (state: RootState) => state.navbar.isShowingNavbar;
export const { showNavbar, hideNavbar } = navbarSlice.actions;
export default navbarSlice.reducer;
