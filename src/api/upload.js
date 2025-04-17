import axios from 'axios';

const API_BASE_URL = 'https://chat-api-vecx.onrender.com/api/upload';

export const uploadFile = async (file, uploadedBy) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('uploadedBy', uploadedBy);

    const response = await axios.post(API_BASE_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};