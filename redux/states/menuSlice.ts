import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    setMenuState: (state, { payload }: PayloadAction<menuStateType>) => {
      state.isMenuOpen = payload.isMenuOpen;
      state.color = payload.color || state.color;
    },
  },
});

export const { toggleMenu, setMenuOpen, setMenuState } = menuSlice.actions;
export default menuSlice.reducer;
