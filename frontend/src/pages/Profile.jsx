import { useContext } from "react";
import { AuthContext } from "../context/Authcontext";

export default function Profile() {
  const { user, logout } = useContext(AuthContext);

  if (!user) return <p className="justify-center">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4">My Profile</h2>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Full Name:</strong> {user.full_name}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <button
          onClick={logout}
          className="mt-6 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
