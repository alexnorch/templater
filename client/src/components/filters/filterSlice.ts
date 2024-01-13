import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ICustomAttributes {
  label: string;
  options: string[];
}

const tempAttributes = [
  { label: "Language", options: ["PL", "EN", "DE"] },
  { label: "Project", options: ["Cosmolot", "FavBet", "AlexBet"] },
  { label: "Gender", options: [] },
];

interface AppState {
  title: string;
  category: string;
  customAttributes: ICustomAttributes[] | [];
  attributesValues: { [key: string]: string } | {};
}

const initialState: AppState = {
  title: "",
  category: "",
  customAttributes: tempAttributes,
  attributesValues: {},
};

export const appSlice = createSlice({
  name: "App",
  initialState,
  reducers: {
    setAttributesValues: (
      state,
      action: PayloadAction<{ [key: string]: string }>
    ) => {
      state.attributesValues = action.payload;
    },
  },
});

export const { setAttributesValues } = appSlice.actions;

export default appSlice.reducer;
