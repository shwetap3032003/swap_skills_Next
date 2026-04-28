import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-linear-to-r from-[#0f172a] to-[#1e293b] text-white px-6 py-12 md:px-12 md:py-20">
      <div className="max-w-6xl mx-auto text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-serif">
          Swap Skills, <br />
          <span className="text-[#e94560]">Not Money.</span>
        </h1>

        <p className="mt-4 md:mt-6 text-gray-300 max-w-xl text-base sm:text-lg mx-auto md:mx-0">
          Connect with people who have the skills you want. Teach what you know.
          Learn what you don't.
        </p>

        {/* <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <button className="bg-[#e94560] hover:bg-red-600 px-6 py-3 rounded-full text-white font-medium w-full sm:w-auto">
            Explore Skills →
          </button> */}
        <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <Link href="/Explore">
            <button className="bg-[#e94560] hover:bg-red-600 px-6 py-3 rounded-full text-white font-medium w-full sm:w-auto">
              Explore Skills →
            </button>
          </Link>

          {/* <button className="border border-gray-500 px-6 py-3 rounded-full text-gray-200 hover:bg-gray-700 w-full sm:w-auto">
            Join for Free
          </button> */}
          <Link
            href="/login?mode=signup"
            className="border border-gray-500 px-6 py-3 rounded-full text-gray-200 hover:bg-gray-700 w-full sm:w-auto text-center"
          >
            Join for Free
          </Link>
        </div>

        <hr className="border-gray-600 mt-10 md:mt-14" />
      </div>
    </section>
  );
}
