import { isRejectedWithValue, Middleware } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const message = (action.payload as { data: { message: string } })?.data
      ?.message;

    toast.warn(message);
  }

  return next(action);
};
