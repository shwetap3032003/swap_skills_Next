"use client";

import { useState } from "react";
import Header from "@/components/profile/Header";
import AboutCard from "@/components/profile/AboutCard";
import SkillsCard from "@/components/profile/SkillsCard";
import ReviewSection from "@/components/profile/ReviewSection";

import EditSkillsModal from "@/components/profile/modals/EditSkillsModal";
import SendRequestModal from "@/components/profile/modals/SendRequestModal";
import LeaveReviewModal from "@/components/profile/modals/LeaveReviewModal";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("reviews");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const [skills, setSkills] = useState({
    offer: ["Python", "Design"],
    learn: ["Guitar", "Cooking"],
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modals */}
      <EditSkillsModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
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

      {/* Header */}
      <Header
        onEdit={() => setIsEditModalOpen(true)}
        onRequest={() => setIsRequestModalOpen(true)}
      />

      {/* Layout */}
      <div className="max-w-6xl mx-auto px-4 mt-24 grid md:grid-cols-12 gap-6">
        {/* Left */}
        <div className="md:col-span-4 space-y-6">
          <AboutCard />
          <SkillsCard skills={skills} />
        </div>

        {/* Right */}
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
  );
}
