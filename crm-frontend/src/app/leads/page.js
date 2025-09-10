"use client";
import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { useAuth } from "../../context/AuthContext";

export default function LeadsPage() {
  const { token } = useAuth();
  const [leads, setLeads] = useState([]);
  const [newLead, setNewLead] = useState({ name: "", email: "", mobile: "", value: "" });
  const [editingId, setEditingId] = useState(null); // track which lead is being edited

  // Fetch leads on load
  useEffect(() => {
    if (token) {
      api("/api/leads", { token })
        .then(setLeads)
        .catch(console.error);
    }
  }, [token]);

  // Create or Update lead
  const saveLead = async (e) => {
    e.preventDefault();
    if (!newLead.name || !newLead.email) {
      alert("Name and Email are required");
      return;
    }

    try {
      if (editingId) {
        // Update existing lead
        const updated = await api(`/api/leads/${editingId}`, {
          method: "PUT",
          token,
          body: { ...newLead, value: Number(newLead.value) },
        });
        setLeads(leads.map((l) => (l._id === editingId ? updated : l)));
        setEditingId(null);
      } else {
        // Create new lead
        const created = await api("/api/leads", {
          method: "POST",
          token,
          body: { ...newLead, value: Number(newLead.value) },
        });
        setLeads([...leads, created]);
      }

      setNewLead({ name: "", email: "", mobile: "", value: "" });
    } catch (err) {
      alert(err.message);
    }
  };

  // Edit lead
  const editLead = (lead) => {
    setNewLead({ name: lead.name, email: lead.email, mobile: lead.mobile, value: lead.value });
    setEditingId(lead._id);
  };

  // Delete lead
  const deleteLead = async (id) => {
    try {
      await api(`/api/leads/${id}`, { method: "DELETE", token });
      setLeads(leads.filter((l) => l._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  // Convert lead
  const convertLead = async (id) => {
    try {
      await api(`/api/leads/${id}/convert`, { method: "POST", token });
      alert("Lead converted to opportunity!");
      setLeads(leads.map((l) => (l._id === id ? { ...l, status: "Qualified" } : l)));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <main className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl mb-6">Leads</h1>

      {/* Add/Update Form */}
      <form onSubmit={saveLead} className="mb-6 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">{editingId ? "Update Lead" : "Add Lead"}</h2>

        <input
          type="text"
          placeholder="Name"
          value={newLead.name}
          onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
          className="w-full p-3 mb-3 rounded bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newLead.email}
          onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
          className="w-full p-3 mb-3 rounded bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="number"
          min="0"
          placeholder="Value ($)"
          value={newLead.value}
          onChange={(e) => setNewLead({ ...newLead, value: e.target.value })}
          className="w-full p-3 mb-3 rounded bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Mobile"
          value={newLead.mobile}
          onChange={(e) => setNewLead({ ...newLead, mobile: e.target.value })}
          className="w-full p-3 mb-3 rounded bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold transition">
          {editingId ? "✅ Update Lead" : "➕ Add Lead"}
        </button>
      </form>

      {/* Leads Table */}
      <table className="table-auto border-collapse border border-gray-600 w-full">
        <thead>
          <tr className="bg-gray-700">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Mobile</th>
            <th className="border px-4 py-2">Value</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id}>
              <td className="border px-4 py-2">{lead.name}</td>
              <td className="border px-4 py-2">{lead.email}</td>
              <td className="border px-4 py-2">{lead.mobile}</td>
              <td className="border px-4 py-2">${lead.value || 0}</td>
              <td className="border px-4 py-2">{lead.status || "New"}</td>
              <td className="border px-4 py-2 space-x-2">
                <button onClick={() => editLead(lead)} className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600">
                  Edit
                </button>
                <button onClick={() => deleteLead(lead._id)} className="bg-red-600 px-3 py-1 rounded hover:bg-red-700">
                  Delete
                </button>
                {lead.status !== "Qualified" && (
                  <button onClick={() => convertLead(lead._id)} className="bg-green-600 px-3 py-1 rounded hover:bg-green-700">
                    Convert
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
