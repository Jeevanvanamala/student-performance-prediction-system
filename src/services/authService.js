import API from "./api";

// Login API call
export const loginUser = async (email, password) => {
  const response = await API.post("/auth/login", {
    email,
    password,
  });

  return response.data; // { token, role }
};
