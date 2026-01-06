import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const CategoryGrid = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/products/categories/"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p className="text-center py-8">Loading categories...</p>;
  if (error) return <p className="text-center py-8 text-red-500">{error}</p>;
  if (categories.length === 0)
    return <p className="text-center py-8">No categories available.</p>;

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-3">Shop by Category</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Explore products by category and find exactly what you need.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              to={`/products?category=${category.name}`}
              key={category.id}
              className="group relative overflow-hidden rounded-2xl shadow hover:shadow-lg transition"
            >
              <img
                src={category.image}
                alt={category.name}
                className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-300"
              />

              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h3 className="text-white text-lg font-semibold">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
