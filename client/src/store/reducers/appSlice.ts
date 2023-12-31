import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlertColor } from "@mui/material";

interface AppState {
  alertType: AlertColor | undefined;
  alertText: string | null;
  isAlert: boolean;

}

const initialState: AppState = {
  alertType: "info",
  alertText: null,
  isAlert: false,

};

interface AlertProps {
  type: AlertColor | undefined;
  text: string;
}

export const appSlice = createSlice({
  name: "App",
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<AlertProps>) => {
      state.isAlert = true;
      state.alertText = action.payload.text;
      state.alertType = action.payload.type;
    },
    hideAlert: (state) => {
      state.isAlert = false;
    },
  },
});

export const { showAlert, hideAlert } = appSlice.actions;

export default appSlice.reducer;
