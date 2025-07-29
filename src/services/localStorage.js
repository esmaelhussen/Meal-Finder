const FAVORITES_KEY = "foodieFinderFavorites";

/**
 * @returns {string[]}
 */
export const getFavorites = () => {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error("Error getting favorites from local storage:", error);
    return [];
  }
};

/**
 * @param {string} mealId
 * @returns {string[]}
 */
export const addFavorite = (mealId) => {
  const favorites = getFavorites();
  if (!favorites.includes(mealId)) {
    const updatedFavorites = [...favorites, mealId];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    return updatedFavorites;
  }
  return favorites;
};

/**
 * @param {string} mealId
 * @returns {string[]}
 */
export const removeFavorite = (mealId) => {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter((id) => id !== mealId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  return updatedFavorites;
};

/**
 * @param {string} mealId
 * @returns {boolean}
 */
export const isFavorite = (mealId) => {
  const favorites = getFavorites();
  return favorites.includes(mealId);
};
