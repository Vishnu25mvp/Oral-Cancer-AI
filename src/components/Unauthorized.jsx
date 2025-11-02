import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => (
  <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
    <h1 className="text-3xl font-bold text-red-500 mb-4">Access Denied 🚫</h1>
    <p className="text-gray-600 mb-4">
      You don’t have permission to view this page.
    </p>
    <Link
      to="/login"
      className="text-blue-500 font-semibold hover:underline"
    >
      Go back to Login
    </Link>
  </div>
);

export default Unauthorized;
