import { Check, ArrowRight } from "lucide-react";

export default function SkillsCard({ skills }) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
      <h3 className="text-emerald-500 font-medium mb-4">Skills Offered</h3>

      <div className="flex flex-wrap gap-2 mb-4">
        {skills.offer.map((skill) => (
          <span
            key={skill}
            className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-3xl text-xs font-medium border border-emerald-100"
          >
            <Check size={12} /> {skill}
          </span>
        ))}
      </div>

      <h3 className="text-orange-500 font-medium mb-4">Wants to Learn</h3>

      <div className="flex flex-wrap gap-2">
        {skills.learn.map((skill) => (
          <span
            key={skill}
            className="flex items-center gap-1 bg-orange-50 text-orange-700 px-3 py-1.5 rounded-3xl text-xs font-medium border border-orange-100"
          >
            <ArrowRight size={12} /> {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
