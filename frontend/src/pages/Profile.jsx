import { useContext } from "react";
import { AuthContext } from "../context/Authcontext";

export default function Profile() {
  const { user } = useContext(AuthContext);

  if (!user) return <p>Loading...</p>;

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
      </div>
    </div>
  );
}
