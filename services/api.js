// services/api.js
import axios from "axios";

const API_URL = "http://localhost:1337";

export const fetchArticles = async (locale) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/articles?populate=cover&locale=${locale}`
    );
    return response.data.data;
  } catch (error) {i
    console.error(error);
    throw error;
  }
};

export const fetchArticleById = async (id, locale) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/articles/${id}?populate=cover&locale=${locale}`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
