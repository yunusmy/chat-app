import axios from "axios";

const API_BASE_URL = "https://chat-api-vecx.onrender.com/api/chats";

export const createChat = async (chatData) => {
  try {
    const response = await axios.post(API_BASE_URL, chatData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getChats = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}?userId=${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
