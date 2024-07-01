import { API } from "../axios";

export const createEvent = async (token, data) => {
  const headers = {
    "x-token": token,
  };
  try {
    const response = await API.post("/event/create", data, { headers });
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const updateEvent = async (data, token) => {
  console.log("🚀 ~ updateEvent ~ token:", token)
  const headers = {
    "x-token": token,
  };
  try {
    const response = await API.put(`/event/update/${data._id}`, data, {
      headers,
    });
    console.log("🚀 ~ updateEvent ~ response:", response)
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
};

export const deleteEvent = async (id, token) => {
  const headers = {
    "x-token": token,
  };
  try {
    const response = await API.delete(`/event/delete/${id}`, { headers });
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
};
