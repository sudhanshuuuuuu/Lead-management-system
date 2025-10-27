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
    <div className="space-y-6 text-white">
      
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 flex-wrap">
        <h2 className="text-2xl md:text-3xl font-bold text-indigo-400 text-center md:text-left">
          Leads Dashboard
        </h2>

        <div className="flex flex-wrap justify-center md:justify-end gap-3 items-center w-full md:w-auto">
          <input
            type="text"
            placeholder="Search leads..."
            className="border border-gray-500 bg-transparent text-white p-2 rounded-xl focus:ring-2 focus:ring-indigo-400 w-full sm:w-48"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-500 p-2 rounded-xl text-white bg-gray-800 focus:ring-2 focus:ring-indigo-400 w-full sm:w-40"
          >
            <option className="bg-gray-800 text-white" value="All">All Sources</option>
            <option className="bg-gray-800 text-white" value="Website">Website</option>
            <option className="bg-gray-800 text-white" value="Meta Ads">Meta Ads</option>
            <option className="bg-gray-800 text-white" value="Google Ads">Google Ads</option>
          </select>
          <button
            onClick={downloadExcel}
            className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-4 py-2 rounded-xl shadow-md w-full sm:w-auto"
          >
            ⬇ Export Excel
          </button>
        </div>
      </div>

      
      <div className="overflow-x-auto rounded-xl shadow-lg bg-white text-gray-800">
        <table className="min-w-full divide-y divide-gray-200 text-sm sm:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Name</th>
              <th className="px-4 py-3 text-left font-semibold">Contact</th>
              <th className="px-4 py-3 text-left font-semibold">Email</th>
              <th className="px-4 py-3 text-left font-semibold">Service</th>
              <th className="px-4 py-3 text-left font-semibold">Source</th>
              <th className="px-4 py-3 text-left font-semibold">Status</th>
              <th className="px-4 py-3 text-left font-semibold">Created At</th>
              <th className="px-4 py-3 text-left font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredLeads.length ? (
              filteredLeads.map((lead) => (
                <tr key={lead._id} className="hover:bg-gray-100 transition-colors">
                  <td className="px-4 py-2">{lead.name}</td>
                  <td className="px-4 py-2">{lead.contact}</td>
                  <td className="px-4 py-2">{lead.email}</td>
                  <td className="px-4 py-2">{lead.service}</td>
                  <td className="px-4 py-2">{lead.source}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-white font-semibold text-xs sm:text-sm ${
                        lead.status === "open" ? "bg-green-600" : "bg-red-600"
                      }`}
                    >
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
                      className={`px-3 sm:px-4 py-2 rounded-lg text-white text-xs sm:text-sm font-medium shadow-md ${
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
                <td colSpan={8} className="text-center py-6 text-gray-500 italic">
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
