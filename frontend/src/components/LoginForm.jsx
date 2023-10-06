import loginService from "../services/login";
import blogService from "../services/blogs";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "../reducers/notificationReducer";

import { login, setUser } from "../reducers/userReducer";
import { cn } from "../lib/utils";

import { useState, useEffect } from "react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      dispatch(login({ username, password }));
      dispatch(
        showNotification(
          `Successfully logged in as ${user.username}`,
          5,
          "success"
        )
      );

      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(showNotification("Wrong username or password", 5, "error"));
    }
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(
        setUser({
          username: user.username,
          name: user.name,
          token: user.token,
        })
      );
      blogService.setToken(user.token);
    }
  }, [user]);

  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          Username
          <Input
            id="username"
            type="text"
            name="username"
            placeholder="Username"
            className={cn("text-gray-800")}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            className={cn("text-gray-800")}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button className={cn("w-full mt-4")} id="login-button" type="submit">
          Login
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
