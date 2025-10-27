"use client";
import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";

import LeadForm from "../components/LeadForm";
import LeadList from "../components/LeadList";
import Contact from "../components/Contact";
import MetaLeads from "../components/MetaLeads";
import GoogleLeads from "../components/GoogleLeads";
import SettingsPage from "../components/SettingPage";

import {
  AiOutlineDashboard,
  AiOutlineUserAdd,
  AiOutlineContacts,
} from "react-icons/ai";
import { BsFillCalendarCheckFill, BsFillFileTextFill } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { FaFacebook, FaGoogle } from "react-icons/fa";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [refresh, setRefresh] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [leadsSummary, setLeadsSummary] = useState({
    total: 0,
    open: 0,
    closed: 0,
  });

  // 🧠 Mount check (prevents hydration mismatch)
  useEffect(() => {
    setMounted(true);
  }, []);

  // 🧩 Fetch Leads Summary
  const handleLeadUpdated = async () => {
    try {
      const res = await fetch("/api/test/leads");
      const data = await res.json();
      const leads = Array.isArray(data.leads) ? data.leads : [];

      setLeadsSummary({
        total: leads.length,
        open: leads.filter((l) => (l.status ?? "open") === "open").length,
        closed: leads.filter((l) => (l.status ?? "open") === "closed").length,
      });

      setRefresh((prev) => !prev);
    } catch (err) {
      console.error(err);
      setLeadsSummary({ total: 0, open: 0, closed: 0 });
    }
  };

  useEffect(() => {
    handleLeadUpdated();
  }, []);

  // ⚙️ Show loader until client fully mounted
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <h2 className="text-2xl font-semibold animate-pulse">
          Loading Dashboard...
        </h2>
      </div>
    );
  }

  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: <AiOutlineDashboard size={20} /> },
    { key: "addLead", label: "Add Lead", icon: <AiOutlineUserAdd size={20} /> },
    { key: "newLeads", label: "New Leads", icon: <BsFillFileTextFill size={20} /> },
    { key: "completedLeads", label: "Completed Leads", icon: <BsFillCalendarCheckFill size={20} /> },
    { key: "recentLeads", label: "Recent Leads", icon: <BsFillFileTextFill size={20} /> },
    { key: "contacts", label: "Contacts", icon: <AiOutlineContacts size={20} /> },
    { key: "metaLeads", label: "Meta Leads", icon: <FaFacebook size={20} /> },
    { key: "googleLeads", label: "Google Leads", icon: <FaGoogle size={20} /> },
    { key: "settings", label: "Settings", icon: <FiSettings size={20} /> },
  ];

  return (
    <div className="min-h-screen flex bg-black text-white overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed md:static z-50 top-0 left-0 h-full w-64 bg-gradient-to-b from-purple-900 via-purple-800 to-purple-700 p-6 flex flex-col justify-between rounded-tr-3xl rounded-br-3xl shadow-lg transform transition-transform duration-300 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div>
          <h2 className="text-2xl font-bold mb-8 text-center">🚀 LMS</h2>
          <nav className="flex flex-col gap-3">
            {menuItems.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  setActiveTab(item.key);
                  setSidebarOpen(false);
                }}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-200
                  ${activeTab === item.key ? "bg-white/20 font-semibold" : "hover:bg-white/10"}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-6 text-center">
          {session && (
            <p className="text-sm mb-2 truncate">
              Login as: <span className="font-semibold">{session.user.email}</span>
            </p>
          )}
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl w-full transition-colors mt-2"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Section */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="flex justify-between items-center bg-purple-900 p-4 md:p-6 shadow-lg sticky top-0 z-40">
          <button
            className="md:hidden text-white"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <h1 className="text-2xl md:text-4xl font-bold text-center w-full">
            🚀 Lead Management System
          </h1>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {/* Dashboard Summary */}
          {activeTab === "dashboard" && (
            <div className="flex flex-col sm:flex-row justify-around w-full max-w-4xl bg-white/10 p-8 rounded-3xl text-white mb-8 mx-auto">
              <div className="text-center">
                <p>Total Leads</p>
                <p className="text-2xl font-bold">{leadsSummary.total}</p>
              </div>
              <div className="text-center">
                <p>Open Leads</p>
                <p className="text-2xl font-bold">{leadsSummary.open}</p>
              </div>
              <div className="text-center">
                <p>Closed Leads</p>
                <p className="text-2xl font-bold">{leadsSummary.closed}</p>
              </div>
            </div>
          )}

          {/* Other Tabs */}
          {activeTab === "addLead" && <LeadForm onLeadAdded={handleLeadUpdated} />}
          {["newLeads", "completedLeads", "recentLeads"].includes(activeTab) && (
            <div className="max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-700 scrollbar-track-gray-800 rounded-xl">
              <LeadList
                refresh={refresh}
                filterTab={
                  activeTab === "newLeads"
                    ? "new"
                    : activeTab === "completedLeads"
                    ? "completed"
                    : "recent"
                }
                onLeadUpdated={handleLeadUpdated}
              />
            </div>
          )}
          {activeTab === "contacts" && <Contact />}
          {activeTab === "metaLeads" && <MetaLeads onLeadUpdated={handleLeadUpdated} />}
          {activeTab === "googleLeads" && <GoogleLeads onLeadUpdated={handleLeadUpdated} />}
          {activeTab === "settings" && <SettingsPage />}
        </main>
      </div>
    </div>
  );
}
