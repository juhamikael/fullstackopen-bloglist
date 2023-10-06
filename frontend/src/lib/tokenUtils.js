export const getUserIdFromToken = (token) => {
  const payload = token.split(".")[1];
  const base64 = payload.replace("-", "+").replace("_", "/");
  const decodedPayload = JSON.parse(window.atob(base64));
  return decodedPayload.id;
};
