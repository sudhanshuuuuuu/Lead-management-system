"use client";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

export default function LeadList({ refresh, filterTab, onLeadUpdated }) {
  const [leads, setLeads] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const fetchLeads = async () => {
    try {
      const res = await fetch("/api/test/leads");
      const data = await res.json();
      if (data.success) setLeads(data.leads);
    } catch (err) {
      console.error("Error fetching leads:", err);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [refresh]);

  const updateLeadStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/test/leads/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setLeads((prev) =>
          prev.map((lead) =>
            lead._id === id ? { ...lead, status: newStatus } : lead
          )
        );
        if (onLeadUpdated) onLeadUpdated();
      } else {
        console.error("Failed to update lead status:", data.message);
      }
    } catch (err) {
      console.error("Error updating lead status:", err);
    }
  };

  const filteredLeads = leads
    .filter((lead) => {
      let tabMatch = true;
      if (filterTab === "new") tabMatch = (lead.status ?? "open") === "open";
      else if (filterTab === "completed") tabMatch = (lead.status ?? "open") === "closed";

      const sourceMatch = filter === "All" || lead.source === filter;
      const searchMatch =
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.email.toLowerCase().includes(search.toLowerCase()) ||
        lead.contact.includes(search);

      return tabMatch && sourceMatch && searchMatch;
    })
    .sort((a, b) => (filterTab === "recent" ? new Date(b.createdAt) - new Date(a.createdAt) : 0));

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredLeads);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");
    XLSX.writeFile(workbook, "leads.xlsx");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-3xl font-bold text-indigo-700">Leads Dashboard</h2>
        <div className="flex gap-3 flex-wrap items-center">
          <input
            type="text"
            placeholder="Search leads..."
            className="border border-gray-300 p-2 text-white rounded-xl focus:ring-2 focus:ring-indigo-400 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
         <select
  value={filter}
  onChange={(e) => setFilter(e.target.value)}
  className="border border-gray-300 p-2 rounded-xl text-white bg-gray-800 focus:ring-2 focus:ring-indigo-400 transition-all"
>
  <option className="bg-gray-800 text-white" value="All">All Sources</option>
  <option className="bg-gray-800 text-white" value="Website">Website</option>
  <option className="bg-gray-800 text-white" value="Meta Ads">Meta Ads</option>
  <option className="bg-gray-800 text-white" value="Google Ads">Google Ads</option>
</select>

          <button
            onClick={downloadExcel}
            className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white px-5 py-2 rounded-xl shadow-lg transform hover:scale-105 transition-all"
          >
            ⬇ Export Excel
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-lg">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-gray-600">Name</th>
              <th className="px-4 py-3 text-left text-gray-600">Contact</th>
              <th className="px-4 py-3 text-left text-gray-600">Email</th>
              <th className="px-4 py-3 text-left text-gray-600">Service</th>
              <th className="px-4 py-3 text-left text-gray-600">Source</th>
              <th className="px-4 py-3 text-left text-gray-600">Status</th>
              <th className="px-4 py-3 text-left text-gray-600">Created At</th>
              <th className="px-4 py-3 text-left text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredLeads.length ? (
              filteredLeads.map((lead) => (
                <tr key={lead._id} className="hover:bg-indigo-50 transition-colors">
                  <td className="px-4 py-2 font-medium">{lead.name}</td>
                  <td className="px-4 py-2">{lead.contact}</td>
                  <td className="px-4 py-2">{lead.email}</td>
                  <td className="px-4 py-2">{lead.service}</td>
                  <td className="px-4 py-2">{lead.source}</td>
                  <td className="px-4 py-2">
                    <span className={`px-3 py-1 rounded-full text-white font-semibold text-sm ${lead.status === "open" ? "bg-green-500" : "bg-red-500"}`}>
                      {(lead.status ?? "open").toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {new Date(lead.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() =>
                        updateLeadStatus(
                          lead._id,
                          lead.status === "open" ? "closed" : "open"
                        )
                      }
                      className={`px-4 py-2 rounded-xl text-white font-medium shadow-lg transform transition-all hover:scale-105 ${
                        lead.status === "open"
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      Mark as {lead.status === "open" ? "Closed" : "Open"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-400 italic">
                  No leads found 💤
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
