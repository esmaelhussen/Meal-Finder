import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getMealById } from "@/services/mealApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import FavoriteToggle from "@/components/FavouriteToggle";

const MealDetailPage = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeal = async () => {
      setLoading(true);
      setError(null);
      if (!id) {
        setError("Meal ID is missing.");
        setLoading(false);
        return;
      }
      try {
        const data = await getMealById(id);
        if (data) {
          setMeal(data);
        } else {
          setError("Meal not found.");
        }
      } catch (err) {
        setError("Failed to fetch meal details. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMeal();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 animate-fade-in">
        <Skeleton className="h-10 w-48 rounded-md bg-muted mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-card p-6 rounded-lg shadow-lg">
          <Skeleton className="h-96 w-full rounded-lg bg-muted" />
          <div className="space-y-4">
            <Skeleton className="h-12 w-3/4 rounded-md bg-muted" />
            <Skeleton className="h-6 w-1/2 rounded-md bg-muted" />
            <Skeleton className="h-48 w-full rounded-md bg-muted" />
            <Skeleton className="h-24 w-full rounded-md bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-destructive text-xl mt-8">
        <p>{error}</p>
        <Link to="/">
          <Button className="mt-4 bg-gradient-to-r from-primary to-primary-600 hover:brightness-110 text-primary-foreground">
            Go Home
          </Button>
        </Link>
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="text-center text-muted-foreground text-xl mt-8">
        <p>Meal details not available.</p>
        <Link to="/">
          <Button className="mt-4 bg-gradient-to-r from-primary to-primary-600 hover:brightness-110 text-primary-foreground">
            Go Home
          </Button>
        </Link>
      </div>
    );
  }

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(
        `${measure ? measure.trim() + " " : ""}${ingredient.trim()}`
      );
    }
  }

  const youtubeVideoId = meal.strYoutube
    ? meal.strYoutube.split("v=")[1]
    : null;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 animate-fade-in">
      <Button
        asChild
        variant="outline"
        className="mb-6 border-border text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
      >
        <Link to="/">← Back to Search</Link>
      </Button>

      <Card className="bg-card shadow-lg p-6 relative overflow-hidden">
        <FavoriteToggle mealId={meal.idMeal} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-1">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-auto max-h-96 object-cover rounded-lg shadow-md border border-border"
              loading="lazy"
            />
          </div>
          <div className="md:col-span-1 flex flex-col justify-center">
            <CardTitle className="text-4xl font-bold text-primary mb-4 leading-tight">
              {meal.strMeal}
            </CardTitle>
            <div className="text-lg text-muted-foreground mb-4 space-y-1">
              <p>
                <strong>Category:</strong>{" "}
                <span className="font-semibold text-foreground">
                  {meal.strCategory}
                </span>
              </p>
              <p>
                <strong>Area:</strong>{" "}
                <span className="font-semibold text-foreground">
                  {meal.strArea}
                </span>
              </p>
            </div>
          </div>
        </div>

        <CardContent className="p-0 mt-8">
          <h2 className="text-2xl font-semibold text-foreground mb-3 border-b border-border pb-2">
            Ingredients:
          </h2>
          <ul className="list-disc list-inside text-foreground mb-6 grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            {ingredients.length > 0 ? (
              ingredients.map((item, index) => (
                <li key={index} className="mb-1">
                  {item}
                </li>
              ))
            ) : (
              <li>No ingredients listed.</li>
            )}
          </ul>

          <h2 className="text-2xl font-semibold text-foreground mb-3 border-b border-border pb-2">
            Instructions:
          </h2>
          <p className="text-foreground leading-relaxed mb-6 whitespace-pre-line text-justify">
            {meal.strInstructions || "No instructions available."}
          </p>

          {youtubeVideoId && (
            <>
              <h2 className="text-2xl font-semibold text-foreground mb-3 border-b border-border pb-2">
                Watch on YouTube:
              </h2>
              <div className="aspect-video w-full rounded-lg overflow-hidden shadow-md mb-6 border border-border">
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </>
          )}

          {meal.strSource && (
            <p className="text-muted-foreground text-sm mt-4 text-right">
              <a
                href={meal.strSource}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                View original source
              </a>
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MealDetailPage;
