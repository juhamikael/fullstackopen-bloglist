import { useState, useEffect } from "react";

export const usePasswordValidation = (password) => {
  const [passwordSafeLevel, setPasswordSafeLevel] = useState({
    level: "Weak",
    color: "bg-destructive",
    numLevel: 1,
    textColor: "text-destructive",
  });

  useEffect(() => {
    let level = "Weak";
    let color = "bg-destructive";
    let textColor = "text-destructive";
    let numLevel = 1;

    if (password && password.length >= 8) {
      if (/[0-9]/.test(password) && /[a-zA-Z]/.test(password)) {
        level = "Medium";
        color = "bg-yellow-400";
        textColor = "text-yellow-400";
        numLevel = 2;
      }

      if (
        /[0-9]/.test(password) &&
        /[a-zA-Z]/.test(password) &&
        /[!@#$%^&*(),.?":{}|<>]/.test(password)
      ) {
        level = "Strong";
        color = "bg-primary";
        textColor = "text-primary";
        numLevel = 3;
      }
    }

    setPasswordSafeLevel({ color, level, numLevel, textColor });
  }, [password]);

  return passwordSafeLevel;
};
