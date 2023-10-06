import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  type: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,

  reducers: {
    setNotification(state, action) {
      const { message, type } = action.payload;
      state.message = message;
      state.type = type;
    },
    clearNotification(state, action) {
      state.message = "";
      state.type = "";
    },
  },
});

export const showNotification = (message, duration, type) => {
  return async (dispatch) => {
    dispatch(setNotification({ message, type }));
    setTimeout(() => {
      dispatch(clearNotification());
    }, duration * 1000);
  };
};

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
