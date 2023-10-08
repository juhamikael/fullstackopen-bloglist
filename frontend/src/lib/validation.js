import { commonPasswords } from "../lib/commonPasswords";

/**
 * Validation checks returns true if validation fails
 *
 * To add a new validation check, add a new function to this object'
 *
 * and add the corresponding message to the validationMessages object
 *
 */
const validationChecks = {
  minLength: (password) => password.length < 8,
  mustContainNumber: (password) => !/\d/.test(password),
  sameAsUsernameOrName: (password, userName, name) =>
    password === userName || password === name,
  passwordsDoNotMatch: (password, _, __, confirmPassword) =>
    password !== confirmPassword,
  containsUsernameOrName: (password, userName, name) =>
    password.includes(userName) || password.includes(name),
  tooCommon: (password) => commonPasswords.includes(password),
};

const validationMessages = {
  minLength: "Password must be at least 8 characters",
  mustContainNumber: "Password must contain a number",
  sameAsUsernameOrName: "Password should not be the same as username or name",
  passwordsDoNotMatch: "Passwords do not match",
  containsUsernameOrName: "Password should not contain username or name",
  tooCommon: "Password is too common",
};

export const validation = (
  userName,
  name,
  password,
  confirmPassword,
  checkOnly = []
) => {
  const checksToRun =
    checkOnly.length > 0 ? checkOnly : Object.keys(validationChecks);
  for (const check of checksToRun) {
    const condition = validationChecks[check](
      password,
      userName,
      name,
      confirmPassword
    );

    if (condition) {
      console.log("Validation failed", check);
      return validationMessages[check];
    }
  }

  return "success";
};
