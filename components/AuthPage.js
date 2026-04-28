"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthPage() {
  const params = useSearchParams();
  const [activeTab, setActiveTab] = useState("login");

  useEffect(() => {
    const mode = params.get("mode");
    setActiveTab(mode === "signup" ? "signup" : "login");
  }, [params]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-lg flex flex-col md:flex-row">
        
        {/* Left Side */}
        <div className="hidden md:flex md:w-1/2 bg-linear-to-br from-[#0f172a] to-[#1e293b] text-white p-6 lg:p-8 flex-col justify-center">
          <h1 className="text-2xl lg:text-3xl font-bold leading-tight">
            Join the SkillSwap community
          </h1>

          <p className="mt-3 text-gray-300 text-sm">
            Connect with thousands of learners and teachers exchanging skills
            every day.
          </p>

          <ul className="mt-5 space-y-2.5 text-gray-200 text-sm">
            {[
              "No money required — skills only",
              "Smart matching algorithm",
              "Real-time chat built in",
              "Verified reviews & ratings",
              "8,200+ active members",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan-400 rounded-full" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 p-5 sm:p-6 lg:p-8">
          <div className="flex bg-gray-100 rounded-full p-1 mb-5">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-1.5 rounded-full text-sm font-medium ${
                activeTab === "login"
                  ? "bg-white shadow text-gray-800"
                  : "text-gray-500"
              }`}
            >
              Log In
            </button>

            <button
              onClick={() => setActiveTab("signup")}
              className={`flex-1 py-1.5 rounded-full text-sm font-medium ${
                activeTab === "signup"
                  ? "bg-white shadow text-gray-800"
                  : "text-gray-500"
              }`}
            >
              Sign Up
            </button>
          </div>

          <div className="space-y-3">
            {activeTab === "signup" && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-600">First Name</label>
                    <input
                      type="text"
                      placeholder="Jordan"
                      className="w-full mt-1 px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-600">Last Name</label>
                    <input
                      type="text"
                      placeholder="Smith"
                      className="w-full mt-1 px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-600">
                    City / Location
                  </label>
                  <input
                    type="text"
                    placeholder="San Francisco, CA"
                    className="w-full mt-1 px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-red-400"
                  />
                </div>
              </>
            )}

            <div>
              <label className="text-xs text-gray-600">Email</label>
              <input
                type="email"
                placeholder="your@gmail.com"
                className="w-full mt-1 px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>

            <div>
              <label className="text-xs text-gray-600">Password</label>
              <input
                type="password"
                placeholder="Minimum 8 characters"
                className="w-full mt-1 px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>

            <button className="w-full bg-red-500 text-white py-2.5 rounded-lg mt-3 hover:bg-red-600 text-sm font-medium">
              {activeTab === "login" ? "Log In →" : "Sign Up →"}
            </button>

            <p className="text-center text-xs text-gray-500 mt-2">
              {activeTab === "login" ? (
                <>
                  Don&apos;t have an account?{" "}
                  <span
                    onClick={() => setActiveTab("signup")}
                    className="text-red-500 cursor-pointer"
                  >
                    Sign up free
                  </span>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <span
                    onClick={() => setActiveTab("login")}
                    className="text-red-500 cursor-pointer"
                  >
                    Log in
                  </span>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}