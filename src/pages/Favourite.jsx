import { useState, useEffect } from "react";
import { getFavorites } from "@/services/localStorage";
import { getMealById } from "@/services/mealApi";
import MealCard from "@/components/MealCard";
import { Skeleton } from "@/components/ui/skeleton";

const FavoritesPage = () => {
  const [favoriteMeals, setFavoriteMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavoriteMeals = async () => {
      setLoading(true);
      setError(null);
      try {
        const favoriteIds = getFavorites();
        const mealsPromises = favoriteIds.map((id) => getMealById(id));
        const mealsResults = await Promise.all(mealsPromises);
        // Filter out any nulls
        const validMeals = mealsResults.filter((meal) => meal !== null);
        setFavoriteMeals(validMeals);
      } catch (err) {
        console.error("Failed to fetch favorite meals:", err);
        setError("Failed to load favorite meals. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteMeals();

    window.addEventListener("storage", fetchFavoriteMeals);
    return () => window.removeEventListener("storage", fetchFavoriteMeals);
  }, []);

  if (loading) {
    return (
      <div className="space-y-8 py-4">
        <h1 className="text-4xl font-bold text-center text-primary mb-8">
          Your Favorite Meals
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-lg bg-muted" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-destructive text-xl mt-8">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-4">
      <h1 className="text-4xl font-bold text-center text-primary mb-8">
        Your Favorite Meals
      </h1>
      {favoriteMeals.length === 0 ? (
        <p className="text-center text-muted-foreground text-xl mt-8">
          You haven't added any favorite meals yet. Start exploring!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteMeals.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
