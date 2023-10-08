import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import { useDispatch } from "react-redux";
import { showNotification } from "../reducers/notificationReducer";
import { validation } from "../lib/validation";
import { BiShowAlt } from "react-icons/bi";
import { usePasswordValidation } from "../hooks/usePasswordValidation";
import { renderPasswordBlocks } from "./renderPasswordBlocks";

import accountService from "../services/account";

const CreateAccount = ({ setShowCreateAccount }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const passwordSafeLevel = usePasswordValidation(password);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (password.length >= 3 && confirmPassword.length >= 3) {
      const message = validation(username, name, password, confirmPassword, [
        "sameAsUsernameOrName",
        "containsUsernameOrName",
        "tooCommon",
      ]);
      if (message !== "success") {
        setFieldErrors({ ...fieldErrors, password: message });
      } else {
        setFieldErrors({ ...fieldErrors, password: null });
      }
    }
  }, [password, confirmPassword, username, name, dispatch]);

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
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className={cn("text-gray-800 pr-12")}
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 px-3 py-2 text-sm text-gray-800 flex items-center gap-x-2"
          >
            {!showPassword && <BiShowAlt className="text-xl" />}
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {fieldErrors.password && (
          <div className="text-red-500 text-xs">{fieldErrors.password}</div>
        )}
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
      <div className="mt-2">
        <div>{renderPasswordBlocks(passwordSafeLevel)}</div>
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
