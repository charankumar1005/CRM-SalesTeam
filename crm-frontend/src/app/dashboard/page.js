"use client";
import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { useAuth } from "../../context/AuthContext";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";

export default function DashboardPage() {
  const { token } = useAuth();
  const [stats, setStats] = useState({ leadsByStatus: [], oppsByStage: [] });

  useEffect(() => {
    if (token) {
      api("/api/dashboard/stats", { token })
        .then(setStats)
        .catch(console.error);
    }
  }, [token]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <main className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl mb-6 font-bold"> CRM Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Leads by Status */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Leads by Status</h2>
          <PieChart width={400} height={300}>
            <Pie
              data={stats.leadsByStatus}
              dataKey="count"
              nameKey="_id"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {stats.leadsByStatus.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        {/* Opportunities by Stage */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Opportunities by Stage</h2>
          <BarChart width={500} height={300} data={stats.oppsByStage}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#00C49F" />
          </BarChart>
        </div>
      </div>
    </main>
  );
}
