import { API } from "../axios";

export const registerUser = async (data) => {
  try {
    const response = await API.post("/user/register", data);
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const loginUser = async (data) => {
  try {
    const response = await API.post("/user/login", data);
    return { data: response?.data, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
};

  export const getAllOrganizer = async (token) => {
    const headers = {
      "x-token": token,
    };
    try {
      const response = await API.get("/user/organizer/getAll", {
        headers,
      });
      return { data: response?.data, error: null };
    } catch (error) {
      return { data: null, error: error };
    }
  };
