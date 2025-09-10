"use client";
import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { useAuth } from "../../context/AuthContext";

export default function OpportunitiesPage() {
  const { token } = useAuth();
  const [opps, setOpps] = useState([]);
  const [newOpp, setNewOpp] = useState({ title: "", value: "" });
  const [editingId, setEditingId] = useState(null);

  // Fetch opportunities
  useEffect(() => {
    if (token) {
      api("/api/opportunities", { token })
        .then(setOpps)
        .catch(console.error);
    }
  }, [token]);

  // Create or Update opportunity
  const saveOpp = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const updated = await api(`/api/opportunities/${editingId}`, {
          method: "PUT",
          token,
          body: { ...newOpp, value: Number(newOpp.value) },
        });
        setOpps(opps.map((o) => (o._id === editingId ? updated : o)));
        setEditingId(null);
      } else {
        const created = await api("/api/opportunities", {
          method: "POST",
          token,
          body: { ...newOpp, value: Number(newOpp.value), stage: "Discovery" },
        });
        setOpps([...opps, created]);
      }
      setNewOpp({ title: "", value: "" });
    } catch (err) {
      alert(err.message);
    }
  };

  // Edit opportunity
  const editOpp = (opp) => {
    setNewOpp({ title: opp.title, value: opp.value });
    setEditingId(opp._id);
  };

  // Delete
  const deleteOpp = async (id) => {
    try {
      await api(`/api/opportunities/${id}`, { method: "DELETE", token });
      setOpps(opps.filter((o) => o._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  // Update Stage separately
  const updateStage = async (id, stage) => {
    try {
      const updated = await api(`/api/opportunities/${id}`, {
        method: "PUT",
        token,
        body: { stage },
      });
      setOpps(opps.map((o) => (o._id === id ? updated : o)));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <main className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl mb-6">Opportunities</h1>

      {/* Add/Update Form */}
      <form
        onSubmit={saveOpp}
        className="mb-6 bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Update Opportunity" : "Add Opportunity"}
        </h2>
        <input
          type="text"
          placeholder="Title"
          value={newOpp.title}
          onChange={(e) => setNewOpp({ ...newOpp, title: e.target.value })}
          className="w-full p-3 mb-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
          required
        />
        <input
          type="number"
          placeholder="Value ($)"
          value={newOpp.value}
          onChange={(e) => setNewOpp({ ...newOpp, value: e.target.value })}
          className="w-full p-3 mb-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold transition"
        >
          {editingId ? "✅ Update Opportunity" : "➕ Add Opportunity"}
        </button>
      </form>

      {/* Opportunities Table */}
      <table className="table-auto border-collapse border border-gray-600 w-full">
        <thead>
          <tr className="bg-gray-700">
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Value ($)</th>
            <th className="border px-4 py-2">Stage</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {opps.map((opp) => (
            <tr key={opp._id}>
              <td className="border px-4 py-2">{opp.title}</td>
              <td className="border px-4 py-2">${opp.value}</td>
              <td className="border px-4 py-2">
                <select
                  value={opp.stage}
                  onChange={(e) => updateStage(opp._id, e.target.value)}
                  className="bg-gray-700 text-white rounded px-3 py-2"
                >
                  <option value="Discovery">Discovery</option>
                  <option value="Proposal">Proposal</option>
                  <option value="Won">Won</option>
                  <option value="Lost">Lost</option>
                </select>
              </td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  onClick={() => editOpp(opp)}
                  className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteOpp(opp._id)}
                  className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
