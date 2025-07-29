import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import MealDetailPage from "./pages/MealDetail";
import FavoritesPage from "./pages/Favourite";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Header />
        <main className="container mx-auto p-4 flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/meal/:id" element={<MealDetailPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
