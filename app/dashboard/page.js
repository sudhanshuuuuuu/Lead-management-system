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
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [refresh, setRefresh] = useState(false);
  const [leadsSummary, setLeadsSummary] = useState({
    total: 0,
    open: 0,
    closed: 0,
  });

  
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
    <div className="min-h-screen flex bg-[#000000]">
      
      <div className="w-64 bg-gradient-to-b from-purple-900 via-purple-800 to-purple-700 text-white p-6 flex flex-col justify-between rounded-tr-3xl rounded-br-3xl shadow-lg">
        <div>
          <h2 className="text-2xl font-bold mb-8 text-center">🚀 LMS</h2>
          <nav className="flex flex-col gap-3">
            {menuItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
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

      
      <div className="flex-1 p-6 md:p-12 overflow-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white text-center flex-1">
            🚀 Lead Management System
          </h1>
        </div>

        
        {activeTab === "dashboard" && (
          <div className="flex justify-around w-full max-w-4xl bg-white/10 p-12 rounded-3xl text-white mb-8 mx-auto">
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

        
        {activeTab === "addLead" && <LeadForm onLeadAdded={handleLeadUpdated} />}
        {activeTab === "newLeads" && <LeadList refresh={refresh} filterTab="new" onLeadUpdated={handleLeadUpdated} />}
        {activeTab === "completedLeads" && <LeadList refresh={refresh} filterTab="completed" onLeadUpdated={handleLeadUpdated} />}
        {activeTab === "recentLeads" && <LeadList refresh={refresh} filterTab="recent" onLeadUpdated={handleLeadUpdated} />}
        {activeTab === "contacts" && <Contact />}
        {activeTab === "metaLeads" && <MetaLeads onLeadUpdated={handleLeadUpdated} />}
        {activeTab === "googleLeads" && <GoogleLeads onLeadUpdated={handleLeadUpdated} />}
        {activeTab === "settings" && <SettingsPage />}
      </div>
    </div>
  );
}
