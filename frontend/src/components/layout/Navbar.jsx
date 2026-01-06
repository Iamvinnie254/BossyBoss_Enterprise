import React, { useState, useEffect, useContext } from "react";
import {
  Search,
  ShoppingCart,
  User,
  Home,
  Grid,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Package,
} from "lucide-react";
import { AuthContext } from "../../context/Authcontext";
import { useCart } from "../../context/CartContext";
import { useNavigate, useLocation, Link } from "react-router-dom";

/* ---------------- MOBILE BOTTOM NAV ---------------- */
const MobileBottomNav = () => {
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Grid, label: "Categories", path: "/products" },
    { icon: ShoppingCart, label: "Cart", path: "/cart", badge: cartCount },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-50">
      <div className="flex justify-around h-16">
        {navItems.map(({ icon: Icon, label, path, badge }) => {
          const active = pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="flex flex-col items-center justify-center relative"
            >
              <Icon
                className={`w-6 h-6 ${
                  active ? "text-blue-600" : "text-gray-600"
                }`}
              />
              {badge > 0 && (
                <span className="absolute -top-1 right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {badge > 9 ? "9+" : badge}
                </span>
              )}
              <span className="text-xs">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

/* ---------------- MOBILE TOP BAR ---------------- */
const MobileTopBar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="md:hidden fixed top-0 left-0 right-0 bg-white border-b z-40">
      <div className="flex items-center justify-between px-4 h-14">
        <button onClick={() => navigate("/")} className="font-bold text-lg">
          BossyBoss
        </button>

        <div className="flex-1 mx-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="search"
            placeholder="Search products..."
            className="w-full pl-10 py-2 text-sm border rounded-full"
          />
        </div>

        <button onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="bg-white border-t p-4 space-y-2">
          <button onClick={() => navigate("/about")} className="block w-full">
            About
          </button>
          <button onClick={() => navigate("/contact")} className="block w-full">
            Contact
          </button>
        </div>
      )}
    </header>
  );
};

/* ---------------- DESKTOP NAV ---------------- */
const DesktopNav = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [showCategories, setShowCategories] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Sports",
    "Books",
  ];

  return (
    <header
      className={`hidden md:block fixed top-0 w-full bg-white z-50 ${
        sticky ? "shadow-md" : "border-b"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center space-x-6">
          <button onClick={() => navigate("/")} className="text-2xl font-bold">
            ShopLogo
          </button>

          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/products")}>Products</button>

          <div className="relative">
            <button onClick={() => setShowCategories(!showCategories)}>
              Categories <ChevronDown className="inline w-4 h-4" />
            </button>
            {showCategories && (
              <div className="absolute bg-white border shadow rounded mt-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => navigate(`/category/${cat.toLowerCase()}`)}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button onClick={() => navigate("/about")}>About</button>
          <button onClick={() => navigate("/contact")}>Contact</button>
        </div>

        {/* CENTER */}
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="search"
            placeholder="Search products..."
            className="w-full pl-10 py-2 border rounded-full"
          />
        </div>

        {/* RIGHT */}
        <div className="flex items-center space-x-6">
          <button onClick={() => navigate("/cart")} className="relative">
            <ShoppingCart />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          {/* Login and Register buttons */}
          <button className="text-xl text-gray-500 hover:text-gray-900 transition-all ease-in-out duration-300"><Link to="/login">Login</Link></button>
          <button className="text-xl text-gray-500 hover:text-gray-900 transition-all ease-in-out duration-300"><Link to="/register">Register</Link></button>

          {user && (
            <div className="relative">
              <button onClick={() => setShowUserMenu(!showUserMenu)}>
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
                  {user.full_name?.charAt(0)}
                </div>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 bg-white border rounded shadow w-48">
                  <button
                    onClick={() => navigate("/profile")}
                    className="flex items-center px-4 py-2 w-full hover:bg-gray-100"
                  >
                    <User className="w-4 h-4 mr-2" /> Profile
                  </button>
                  <button
                    onClick={() => navigate("/orders")}
                    className="flex items-center px-4 py-2 w-full hover:bg-gray-100"
                  >
                    <Package className="w-4 h-4 mr-2" /> Orders
                  </button>
                  <button
                    onClick={logout}
                    className="flex items-center px-4 py-2 w-full text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

/* ---------------- MAIN EXPORT ---------------- */
export default function Navbar() {
  return (
    <>
      <DesktopNav />
      <MobileTopBar />
      <MobileBottomNav />
    </>
  );
}
