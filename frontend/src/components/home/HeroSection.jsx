import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="bg-linear-to-r from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* LEFT CONTENT */}
        <div>
          <span className="inline-block mb-4 px-4 py-1 text-sm bg-yellow-500 text-black rounded-full font-semibold">
            Premium Shopping Experience
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            Discover Quality Products <br />
            Built for Everyday Life
          </h1>

          <p className="text-gray-300 text-lg mb-8 max-w-lg">
            Shop carefully curated items with unbeatable quality, fast delivery,
            and secure checkout.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/products"
              className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition"
            >
              Shop Now
            </Link>

            <Link
              to="/register"
              className="px-6 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition"
            >
              Create Account
            </Link>
          </div>
        </div>

        {/* RIGHT VISUAL */}
        <div className="relative hidden md:block">
          <div className="absolute inset-0 bg-yellow-500 rounded-3xl rotate-3"></div>
          <img
            src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f"
            alt="Shopping experience"
            className="relative rounded-3xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
