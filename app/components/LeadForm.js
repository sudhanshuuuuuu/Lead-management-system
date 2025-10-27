"use client";
import { useState } from "react";

export default function LeadForm({ onLeadAdded }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [source, setSource] = useState("Website");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/test/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact, email, service, source, status: "open" }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Lead added successfully!");
        onLeadAdded(); 
        setName("");
        setContact("");
        setEmail("");
        setService("");
        setSource("Website");
      } else {
        setMessage("❌ Error: " + (data.error || "Something went wrong"));
      }
    } catch (err) {
      setMessage("❌ Error: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">Add Lead</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input className="border border-white/50 p-2 w-full rounded-md bg-transparent text-white placeholder-white focus:ring-2 focus:ring-purple-500" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input className="border border-white/50 p-2 w-full rounded-md bg-transparent text-white placeholder-white focus:ring-2 focus:ring-purple-500" placeholder="Contact" value={contact} onChange={(e) => setContact(e.target.value)} required />
        <input className="border border-white/50 p-2 w-full rounded-md bg-transparent text-white placeholder-white focus:ring-2 focus:ring-purple-500" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="border border-white/50 p-2 w-full rounded-md bg-transparent text-white placeholder-white focus:ring-2 focus:ring-purple-500" placeholder="Service" value={service} onChange={(e) => setService(e.target.value)} required />
        <select className="border border-white/50 p-2 w-full rounded-md bg-transparent text-white focus:ring-2 focus:ring-purple-500" value={source} onChange={(e) => setSource(e.target.value)}>
          <option className="bg-black">Website</option>
          <option className="bg-black">Meta Ads</option>
          <option className="bg-black">Google Ads</option>
        </select>
        <button type="submit" disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl shadow-lg transition-transform transform hover:scale-105">
          {loading ? "Submitting..." : "Submit Lead"}
        </button>
      </form>
      {message && <p className="mt-2 text-white">{message}</p>}
    </div>
  );
}
