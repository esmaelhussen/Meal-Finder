import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Favorites", to: "/favorites" },
  ];

  return (
    <header className=" flex justify-between bg-card border-b shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        <Link
          to="/"
          className="text-3xl font-extrabold text-primary tracking-tight hover:text-primary-600 transition-colors"
        >
          🍽 Delicious Meal
        </Link>
        <nav>
          <ul className="flex space-x-6 text-sm sm:text-base font-medium">
            {navItems.map(({ label, to }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={`px-3 py-1 rounded-md transition-colors duration-200 ${
                    location.pathname === to
                      ? "text-primary bg-muted"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
