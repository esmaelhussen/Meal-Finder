import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FavouriteButton from "./FavouriteToggle"; // ✅ updated import

const MealCard = ({ meal }) => {
  return (
    <Card className="relative w-full h-full flex flex-col justify-between overflow-hidden shadow-lg border-2 border-transparent hover:border-primary transition-all duration-300 transform hover:-translate-y-1">
      {/* Favourite Button */}
      <FavouriteButton mealId={meal.idMeal} />

      {/* Link wraps card content */}
      <Link to={`/meal/${meal.idMeal}`} className="block h-full">
        <CardHeader className="p-0">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-48 object-cover rounded-t-lg"
            loading="lazy"
          />
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-lg font-semibold mb-2 line-clamp-2 text-foreground">
            {meal.strMeal}
          </CardTitle>
          {meal.strArea && meal.strCategory && (
            <CardDescription className="text-muted-foreground text-sm">
              {meal.strArea} | {meal.strCategory}
            </CardDescription>
          )}
        </CardContent>
      </Link>
    </Card>
  );
};

export default MealCard;
