export const isAuthenticated = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("staffAuth") === "true";
  }
  return false;
};

export const login = (username, password) => {
  if (typeof window !== "undefined") {
    const validUsername = "ilvesproadmin";
    const validPassword = "ilvesproadmin";

    if (username === validUsername && password === validPassword) {
      localStorage.setItem("staffAuth", "true");
      return true;
    }
  }
  return false;
};

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("staffAuth");
  }
};
