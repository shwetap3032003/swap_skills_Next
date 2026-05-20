export default function CardPage() {
  const steps = [
    {
      id: "01",
      icon: "🎯",
      title: "Create Profile",
      desc: "List skills you offer and skills you want to learn.",
      bg: "bg-teal-100",
    },
    {
      id: "02",
      icon: "🤝",
      title: "Find a Match",
      desc: "Our algorithm finds people with complementary skills.",
      bg: "bg-orange-100",
    },
    {
      id: "03",
      icon: "💬",
      title: "Swap & Grow",
      desc: "Chat, schedule, and start exchanging. No money needed.",
      bg: "bg-indigo-100",
    },
    {
      id: "04",
      icon: "⭐",
      title: "Rate & Review",
      desc: "Build your reputation with reviews from peers.",
      bg: "bg-yellow-100",
    },
  ];

  return (
    <section className="w-full bg-gray-100 py-12 sm:py-16 md:py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl sm:text-2xl md:text-4xl font-semibold text-gray-900 font-serif pt-8">
          How SkillSwap Works
        </h2>

        <p className="text-gray-500 mt-2 text-xs sm:text-sm md:text-base">
          Exchange skills in three simple steps
        </p>

        {/* Cards */}
        <div className="px-6 mt-8 sm:mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm hover:shadow-md transition duration-300 hover:-translate-y-1"
            >
              {/* Icon */}
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 mx-auto flex items-center justify-center rounded-xl text-lg sm:text-xl md:text-2xl ${step.bg}`}
              >
                {step.icon}
              </div>

              {/* Step */}
              <p className="mt-3 sm:mt-4 text-[10px] sm:text-xs tracking-widest text-gray-400">
                STEP {step.id}
              </p>

              {/* Title */}
              <h3 className="mt-1 text-sm sm:text-base md:text-lg font-semibold text-gray-900">
                {step.title}
              </h3>

              {/* Description */}
              <p className="mt-1 sm:mt-2 text-gray-500 text-[11px] sm:text-xs md:text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
