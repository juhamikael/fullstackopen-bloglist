import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";

const initialState = {
  name: "",
  token: "",
  username: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      const { name, token, username } = action.payload;
      state.name = name;
      state.token = token;
      state.username = username;
    },
    clearUser(state) {
      state.name = "";
      state.token = "";
      state.username = "";
    },
  },
});

export const login = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });
      blogService.setToken(user.token);
      dispatch(
        setUser({
          username: user.username,
          name: user.name,
          token: user.token,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      blogService.setToken("");
      dispatch(clearUser());
    } catch (error) {
      console.error(error);
    }
  };
};

export const setupToken = () => {
  return (dispatch, getState) => {
    const token = getState().user.token;
    blogService.setToken(token);
  };
};

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
