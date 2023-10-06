import { commonPasswords } from "../lib/commonPasswords";

export const validation = (userName, name, password, confirmPassword) => {
  switch (true) {
    case userName.length < 3:
      return "Username must be at least 3 characters";
    case name.length < 3:
      return "Name must be at least 3 characters";
    case password.length < 8:
      return "Password must be at least 8 characters";
    case password === password.match(/[a-zA-Z]+/g):
      return "Password must contain a number";
    case password === userName || password === name:
      return "Password should not be the same as username or name";
    case password !== confirmPassword:
      return "Passwords do not match";
    case password.includes(userName) || password.includes(name):
      return "Password should not contain username or name";
    case commonPasswords.includes(password):
      return "Password is too common";
    default:
      return "success";
  }
};
