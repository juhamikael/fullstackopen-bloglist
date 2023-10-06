import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import accountService from "../services/account";
import { useDispatch } from "react-redux";
import { showNotification } from "../reducers/notificationReducer";
import { validation } from "../lib/validation";

const CreateAccount = ({ setShowCreateAccount }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const handleCreateAccount = async (event) => {
    event.preventDefault();
    const validationMessage = validation(
      username,
      name,
      password,
      confirmPassword
    );

    if (validationMessage !== "success") {
      dispatch(showNotification(validationMessage, 5, "error"));
      return;
    }
    try {
      await accountService.createAccount({ username, password, name });
      setUsername("");
      setPassword("");
      setName("");
      setConfirmPassword("");
      setShowCreateAccount(false);
      dispatch(
        showNotification("Account created successfully 🎉 ", 5, "success")
      );
    } catch (error) {
      const errorMessage = error?.response?.data?.error || "An error occurred";
      dispatch(
        showNotification(`Error creating account: ${errorMessage}`, 5, "error")
      );
    }
  };

  return (
    <form onSubmit={handleCreateAccount}>
      <div>
        <label htmlFor="username">Username</label>
        <Input
          id="username"
          type="text"
          name="username"
          placeholder="Username"
          className={cn("text-gray-800")}
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <label htmlFor="name">Name</label>
        <Input
          id="name"
          type="text"
          name="name"
          placeholder="Name"
          className={cn("text-gray-800")}
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <Input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          className={cn("text-gray-800")}
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <Input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className={cn("text-gray-800")}
          value={confirmPassword}
          onChange={({ target }) => setConfirmPassword(target.value)}
        />
      </div>
      <Button
        className={cn("w-full mt-4")}
        id="create-account-button"
        type="submit"
      >
        Create Account
      </Button>
    </form>
  );
};

export default CreateAccount;
