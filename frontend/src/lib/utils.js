import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const parsePath = (path) => {
  const [_, q, id] = path.split("/");
  return id;
};
