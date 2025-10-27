"use client";
import { useState } from "react";

export default function GoogleLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchGoogleLeads = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/test/googleLeads"); 
      const data = await res.json();

      if (data.success) {
        setLeads(data.leads);
      } else {
        alert("Failed to fetch leads");
      }
    } catch (error) {
      console.error(error);
      alert("Error fetching leads");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white">
      <h2 className="text-3xl font-semibold mb-6">🔴 Google Leads</h2>
      <button
        onClick={fetchGoogleLeads}
        disabled={loading}
        className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-xl mb-6 transition"
      >
        {loading ? "Fetching..." : "Fetch Google Leads"}
      </button>

      {leads.length > 0 ? (
        <table className="w-full text-left border-collapse border border-gray-500">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-3 border border-gray-500">Name</th>
              <th className="p-3 border border-gray-500">Email</th>
              <th className="p-3 border border-gray-500">Contact</th>
              <th className="p-3 border border-gray-500">Service</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, index) => (
              <tr key={index} className="hover:bg-gray-800">
                <td className="p-3 border border-gray-500">{lead.name}</td>
                <td className="p-3 border border-gray-500">{lead.email}</td>
                <td className="p-3 border border-gray-500">{lead.contact}</td>
                <td className="p-3 border border-gray-500">{lead.service}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p>No leads fetched yet.</p>
      )}
    </div>
  );
}
