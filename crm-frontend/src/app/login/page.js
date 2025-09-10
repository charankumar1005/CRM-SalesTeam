"use client";
import { useState } from "react";
import { api } from "../lib/api";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const validatePassword = (pwd) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
    return regex.test(pwd);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      );
      return;
    }

    try {
      const res = await api("/api/auth/login", {
        method: "POST",
        body: { email, password },
      });

      login(res.user, res.token);

      
      router.push("/leads");
    } catch (err) {
      setError(
        err.message || "Login failed. User may not exist. Please signup."
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md flex flex-col"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

        {error && (
          <p className="text-red-500 mb-4 text-sm">
            {error}{" "}
            {error.includes("signup") && (
              <Link href="/signup" className="text-blue-400 underline">
                Signup here
              </Link>
            )}
          </p>
        )}

        <label className="relative mb-4">
          <span className="text-gray-300 mb-1 block">Email</span>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label className="relative mb-4">
          <span className="text-gray-300 mb-1 block">Password</span>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
        </label>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-3 rounded-lg mt-2"
        >
          Login
        </button>

        <p className="mt-4 text-gray-300 text-sm text-center">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-400 underline">
            Signup here
          </Link>
        </p>
      </form>
    </div>
  );
}
