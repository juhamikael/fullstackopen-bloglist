export const urlBuilder = (route) => {
  const baseUrl = import.meta.env.VITE_URL;
  return `${baseUrl}${route}`;
};
