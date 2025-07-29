import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  addFavorite,
  removeFavorite,
  isFavorite,
} from "@/services/localStorage";

const FavouriteToggle = ({ mealId, onToggle }) => {
  const [isFavourited, setIsFavourited] = useState(false);

  useEffect(() => {
    setIsFavourited(isFavorite(mealId));
  }, [mealId]);

  const handleToggleFavourite = () => {
    if (isFavourited) {
      removeFavourite(mealId);
      setIsFavourited(false);
      onToggle?.(false);
    } else {
      addFavorite(mealId);
      setIsFavourited(true);
      onToggle?.(true);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggleFavourite}
      className={`absolute top-2 right-2 rounded-full p-1 transition-colors duration-200 ${
        isFavourited
          ? "text-primary hover:text-primary-600"
          : "text-muted-foreground hover:text-primary-foreground hover:bg-primary-50"
      }`}
      aria-label={isFavourited ? "Remove from favourites" : "Add to favourites"}
    >
      <span className="text-xl">{isFavourited ? "❤️" : "🤍"}</span>
    </Button>
  );
};

export default FavouriteToggle;
