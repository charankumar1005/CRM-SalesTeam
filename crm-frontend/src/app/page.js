"use client";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { user, token, logout } = useAuth();
  const router = useRouter();

  if (!token) {
    return (
      <main className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome to CRM Dashboard</h1>
        <p className="mb-6 text-gray-300">
          Please log in or sign up to manage your leads and opportunities.
        </p>
        <div className="flex gap-6">
          <Link
            href="/login"
            className="bg-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="bg-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition"
          >
             Sign Up
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between px-10 py-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold"> CRM Dashboard</h1>
        <div className="flex items-center gap-6">
          <span className="text-gray-300">
            Hello, <span className="font-semibold">{user?.name}</span> ({user?.role})
          </span>
          <button
            onClick={() => {
              logout();
              router.push("/login");
            }}
            className="bg-red-600 px-5 py-2 rounded-lg hover:bg-red-700 transition"
          >
           Logout
          </button>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <section className="px-10 py-12">
        <h2 className="text-3xl font-semibold mb-8">Quick Access</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Leads Card */}
          <Link
            href="/leads"
            className="bg-gray-800 hover:bg-gray-700 p-6 rounded-2xl shadow-lg transition transform hover:-translate-y-1"
          >
            <h3 className="text-xl font-bold mb-2"> Manage Leads</h3>
            <p className="text-gray-400 text-sm">
              Add, edit, convert and track your customer leads.
            </p>
          </Link>

          {/* Opportunities Card */}
          <Link
            href="/opportunities"
            className="bg-gray-800 hover:bg-gray-700 p-6 rounded-2xl shadow-lg transition transform hover:-translate-y-1"
          >
            <h3 className="text-xl font-bold mb-2"> Manage Opportunities</h3>
            <p className="text-gray-400 text-sm">
              Track deals across different sales stages.
            </p>
          </Link>

          {/* Optional Dashboard Metrics */}
          <Link
            href="/dashboard"
            className="bg-gray-800 hover:bg-gray-700 p-6 rounded-2xl shadow-lg transition transform hover:-translate-y-1"
          >
            <h3 className="text-xl font-bold mb-2"> Dashboard Metrics</h3>
            <p className="text-gray-400 text-sm">
              View reports and insights for leads & opportunities.
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}
