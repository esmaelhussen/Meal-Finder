import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import MealCard from "@/components/MealCard";
import {
  searchMealsByName,
  searchMealsByIngredient,
  searchMealsByCategory,
  getRandomMeal,
  listCategories,
} from "@/services/mealApi";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

const HomePage = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await listCategories();
        setCategories(data || []);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    fetchCategories();

    const fetchRandomMeals = async () => {
      setLoading(true);
      setError(null);
      try {
        const randomMealsPromises = Array.from({ length: 8 }).map(() =>
          getRandomMeal()
        );
        const results = await Promise.all(randomMealsPromises);
        const validMeals = results.filter((meal) => meal !== null);
        setMeals(validMeals);
      } catch (err) {
        setError("Failed to load random meals. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomMeals();
  }, []);

  const handleSearch = async (term, type) => {
    setLoading(true);
    setError(null);
    setMeals([]);

    try {
      let data = null;
      if (type === "name") {
        data = await searchMealsByName(term);
      } else if (type === "ingredient") {
        data = await searchMealsByIngredient(term);
      } else if (type === "category") {
        data = await searchMealsByCategory(term);
      }
      setMeals(data || []);
    } catch (err) {
      setError("Failed to fetch meals. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRandomMeal = async () => {
    setLoading(true);
    setError(null);
    setMeals([]);
    try {
      const meal = await getRandomMeal();
      if (meal) {
        setMeals([meal]);
      } else {
        setMeals([]);
      }
    } catch (err) {
      setError("Failed to fetch a random meal. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryFilter = async (categoryName) => {
    handleSearch(categoryName, "category");
  };

  return (
    <div className="space-y-10 py-6 animate-fadeIn">
      <h1 className="text-5xl font-extrabold text-center text-primary tracking-tight">
        🍽️ Discover Delicious Meals
      </h1>

      <div className="flex justify-center">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="flex justify-center">
        <Button
          onClick={handleRandomMeal}
          className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-red-500 hover:to-pink-500 text-white shadow-lg"
        >
          Surprise Me 🍀
        </Button>
      </div>

      <h2 className="text-3xl font-semibold text-center text-foreground mb-4">
        Explore Categories
      </h2>

      <ScrollArea className="w-full rounded-xl border border-border p-4 bg-muted shadow-md">
        <div className="flex w-max space-x-4">
          {categories.length > 0
            ? categories.map((cat) => (
                <Button
                  key={cat.strCategory}
                  variant="ghost"
                  className="border border-primary text-primary hover:bg-primary hover:text-white transition-all"
                  onClick={() => handleCategoryFilter(cat.strCategory)}
                >
                  {cat.strCategory}
                </Button>
              ))
            : Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-28 rounded-md bg-muted" />
              ))}
        </div>
        <ScrollBar orientation="horizontal" className="bg-muted" />
      </ScrollArea>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-64 w-full rounded-xl bg-muted shadow-sm"
            />
          ))}
        </div>
      )}

      {error && (
        <p className="text-center text-red-500 text-lg font-medium">{error}</p>
      )}

      {!loading && !error && meals.length === 0 && (
        <p className="text-center text-muted-foreground text-lg">
          😔 No meals found. Try a different search or category.
        </p>
      )}

      {!loading && !error && meals.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {meals.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
