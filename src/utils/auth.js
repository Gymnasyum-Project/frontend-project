export const getToken = () =>
  localStorage.getItem("token") || sessionStorage.getItem("token");

export const clearAuth = () => {
  ["token", "user"].forEach((k) => {
    localStorage.removeItem(k);
    sessionStorage.removeItem(k);
  });
};
