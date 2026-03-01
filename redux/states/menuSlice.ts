import { createSlice } from "@reduxjs/toolkit";

type menuStateType = {
  isMenuOpen: boolean;
  color?: "Light" | "Dark";
};

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    isMenuOpen: false,
    color: "Light" as "Light" | "Dark",
  },
  reducers: {
    toggleMenu: (state) => {
      return { ...state, isMenuOpen: !state.isMenuOpen };
    },
    setMenuOpen: (state, { payload }: { payload: boolean }) => {
      return { ...state, isMenuOpen: payload };
    },
  },
});

export const { toggleMenu } = menuSlice.actions;
export default menuSlice.reducer;
