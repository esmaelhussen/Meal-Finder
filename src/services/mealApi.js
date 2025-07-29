import axios from "axios";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1/";

export const searchMealsByName = async (name) => {
  try {
    const response = await axios.get(`${BASE_URL}search.php?s=${name}`);
    return response.data.meals;
  } catch (error) {
    console.error("Error searching meals by name:", error);
    throw error;
  }
};

export const searchMealsByIngredient = async (ingredient) => {
  try {
    const response = await axios.get(`${BASE_URL}filter.php?i=${ingredient}`);
    return response.data.meals;
  } catch (error) {
    console.error("Error searching meals by ingredient:", error);
    throw error;
  }
};

export const searchMealsByCategory = async (category) => {
  try {
    const response = await axios.get(`${BASE_URL}filter.php?c=${category}`);
    return response.data.meals;
  } catch (error) {
    console.error("Error searching meals by category:", error);
    throw error;
  }
};

export const getMealById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}lookup.php?i=${id}`);
    return response.data.meals ? response.data.meals[0] : null;
  } catch (error) {
    console.error("Error getting meal by ID:", error);
    throw error;
  }
};

export const listCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}list.php?c=list`);
    return response.data.meals;
  } catch (error) {
    console.error("Error listing categories:", error);
    throw error;
  }
};

export const getRandomMeal = async () => {
  try {
    const response = await axios.get(`${BASE_URL}random.php`);
    return response.data.meals ? response.data.meals[0] : null;
  } catch (error) {
    console.error("Error getting random meal:", error);
    throw error;
  }
};
