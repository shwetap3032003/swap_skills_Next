"use client";

import { useState, useEffect, useCallback } from "react";
import Header from "@/components/profile/Header";
import AboutCard from "@/components/profile/AboutCard";
import SkillsCard from "@/components/profile/SkillsCard";
import ReviewSection from "@/components/profile/ReviewSection";

import EditSkillsModal from "@/components/profile/modals/EditSkillsModal";
import SendRequestModal from "@/components/profile/modals/SendRequestModal";
import LeaveReviewModal from "@/components/profile/modals/LeaveReviewModal";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("reviews");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const [user, setUser] = useState(null);

  const [skills, setSkills] = useState({
    offer: [],
    learn: [],
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        // 1. Fetch User Data
        const userRes = await fetch("http://localhost:1337/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = await userRes.json();
        setUser(userData);

        // 2. Fetch Skills (Strapi v5 Filter)
        // We filter 'edit-skills' where the associated user id matches the logged-in user
        const skillsRes = await fetch(
          `http://localhost:1337/api/edit-skills?filters[user][id][$eq]=${userData.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        const skillsData = await skillsRes.json();

        // Strapi v5 returns an array in 'data'
        if (skillsData.data && skillsData.data.length > 0) {
          const userSkills = skillsData.data[0];

          setSkills({
            // Note: In Strapi v5, fields are usually directly under the object,
            // but check if your API setup still uses the .attributes wrapper
            offer: userSkills.offerSkills || [],
            learn: userSkills.learnSkills || [],
          });
        }
      } catch (err) {
        console.error("Error fetching profile data:", err);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <EditSkillsModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
          }}
          skills={skills}
          setSkills={setSkills}
        />

        <SendRequestModal
          isOpen={isRequestModalOpen}
          onClose={() => setIsRequestModalOpen(false)}
          skills={skills}
        />

        <LeaveReviewModal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
        />

        <Header
          user={user}
          onEdit={() => setIsEditModalOpen(true)}
          onRequest={() => setIsRequestModalOpen(true)}
        />

        <div className="max-w-6xl mx-auto px-4 mt-24 grid md:grid-cols-12 gap-6">
          <div className="md:col-span-4 space-y-6">
            <AboutCard user={user} />
            <SkillsCard skills={skills} />
          </div>

          <div className="md:col-span-8">
            <div className="flex gap-6 border-b mb-6">
              <button
                onClick={() => setActiveTab("reviews")}
                className={`pb-3 text-sm font-medium transition ${
                  activeTab === "reviews"
                    ? "border-b-2 border-rose-500 text-rose-500"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                Reviews
              </button>

              <button
                onClick={() => setActiveTab("activity")}
                className={`pb-3 text-sm font-medium transition ${
                  activeTab === "activity"
                    ? "border-b-2 border-rose-500 text-rose-500"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                Activity
              </button>
            </div>

            {activeTab === "reviews" ? (
              <ReviewSection onWrite={() => setIsReviewModalOpen(true)} />
            ) : (
              <div className="p-10 text-gray-400 text-center">
                No activity yet
              </div>
            )}
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        theme="dark"
      />
    </>
  );
}
