"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleManualLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    await signIn("credentials", {
      redirect: true,
      email,
      password,
      callbackUrl: "/dashboard",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b0b0b] to-[#001f3f] px-4 sm:px-6 md:px-8 py-8">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl w-full max-w-md sm:max-w-lg md:max-w-md p-6 sm:p-8 md:p-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white text-center mb-2">
          🔐 Welcome Back
        </h1>
        <p className="text-center text-white/70 mb-6 text-sm sm:text-base">
          Sign in to your account or continue with social login
        </p>

        {error && (
          <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
        )}

        <form onSubmit={handleManualLogin} className="space-y-4">
          <div>
            <label className="block text-white/80 text-sm mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200 text-sm sm:text-base"
              required
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200 text-sm sm:text-base"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-3 text-white/70 hover:text-white text-xs sm:text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition-transform transform hover:scale-105 text-sm sm:text-base"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-white/70 text-xs sm:text-sm">
          or continue with
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <button
            onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
            className="py-3 rounded-xl bg-gray-800 hover:bg-gray-900 text-white flex items-center justify-center gap-2 transition-transform transform hover:scale-105 text-sm sm:text-base"
          >
            GitHub
          </button>

          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2 transition-transform transform hover:scale-105 text-sm sm:text-base"
          >
            Google
          </button>
        </div>

        <div className="mt-6 text-center text-white/60 text-xs sm:text-sm">
          Don’t have an account?{" "}
          <a href="#" className="underline hover:text-white">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
