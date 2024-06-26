import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Visualization Dashboard</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/bar"
                className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
              >
                BarChart
              </Link>
            </li>
            {/* Add more navigation items here if needed */}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
