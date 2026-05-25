"use client";

import { useState, useEffect } from "react";
import Header from "@/components/profile/Header";
import AboutCard from "@/components/profile/AboutCard";
import SkillsCard from "@/components/profile/SkillsCard";
import ReviewSection from "@/components/profile/ReviewSection";

import EditSkillsModal from "@/components/profile/modals/EditSkillsModal";
// import SendRequestModal from "@/components/profile/modals/SendRequestModal";

import { toast } from "react-toastify";
import ProfileSkeleton from "./profileSkeleton";

export default function ProfilePage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(null);

  const [skills, setSkills] = useState({
    offer: [],
    learn: [],
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");
        if (!token) return;

        const userRes = await fetch(`${API_URL}/api/users/me?populate=*`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = await userRes.json();

        setUser(userData);

        setSkills({
          offer: userData.edit_skill?.offerSkills || [],
          learn: userData.edit_skill?.learnSkills || [],
        });
      } catch (err) {
        console.error("Error fetching profile data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <ProfileSkeleton />;
  }

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

        {/* <SendRequestModal
          isOpen={isRequestModalOpen}
          onClose={() => setIsRequestModalOpen(false)}
          skills={skills}
        /> */}

        {/* <LeaveReviewModal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
        /> */}

        <Header
          user={user}
          onEdit={() => setIsEditModalOpen(true)}
          // onRequest={() => setIsRequestModalOpen(true)}
        />

        <div className="max-w-6xl mx-auto px-4 mt-24 grid md:grid-cols-12 gap-6">
          <div className="md:col-span-4 space-y-6">
            <AboutCard user={user} setUser={setUser} />
            <SkillsCard skills={skills} />
          </div>

          <div className="md:col-span-8">
            <div className="border-b mb-6">
              <button className="pb-3 text-sm font-medium border-b-2 border-rose-500 text-rose-500">
                Reviews
              </button>
            </div>

            <ReviewSection user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
