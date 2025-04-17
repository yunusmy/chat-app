import axios from 'axios';

const API_BASE_URL = 'https://chat-api-vecx.onrender.com/api/auth';

export const register = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, {
      username,
      password
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      username,
      password
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};