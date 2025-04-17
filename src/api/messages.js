import axios from "axios";

const API_BASE_URL = "https://chat-api-vecx.onrender.com/api/messages";

export const sendMessage = async (messageData) => {
  try {
    const response = await axios.post(API_BASE_URL, messageData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getMessages = async (chatId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}?chatId=${chatId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
