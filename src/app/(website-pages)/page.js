import Hero from "@/components/website/Hero";
import LogoFlip from "@/components/website/LogoFlip";
import SectionHeading from "@/components/website/SectionHeading";
import ActionCards from "@/components/website/ActionCards";
import PopularCourses from "@/components/website/PopularCourses";
import TopScorers from "@/components/website/TopScorers";
import WhyChooseUs from "@/components/website/WhyChooseUs";
import Testimonials from "@/components/website/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* About JBC */}
      <section className="py-20 lg:py-28 bg-[#f8f9ff]">
        <div className="container-jbc">
          <SectionHeading
            eyebrow="About JBC"
            title="Build Skills. Build Confidence. Build Your Future."
            description="Jai Bhawani Computer Education Centre provides practical and career-focused computer education for students, professionals and aspiring digital learners."
          />

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1D1B67]/5 border border-[#1D1B67]/10">
                <span className="w-2 h-2 rounded-full bg-[#D91C24]" />

                <span className="text-xs font-bold text-[#1D1B67]">
                  JAI BHAWANI COMPUTER EDUCATION CENTRE
                </span>
              </div>

              <h3 className="mt-5 text-3xl md:text-4xl font-extrabold text-[#1D1B67]">
                Learn practical skills that{" "}
                <span className="text-[#D91C24]">move you forward.</span>
              </h3>

              <p className="mt-5 text-gray-600 leading-8 text-sm sm:text-base">
                At JBC, we focus on making computer education simple, practical
                and useful. Our training programs are designed to help students
                gain confidence and develop real-world digital skills.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
                  <p className="text-2xl font-extrabold text-[#1D1B67]">
                    1000+
                  </p>

                  <p className="text-xs text-gray-500 mt-1">Students Trained</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
                  <p className="text-2xl font-extrabold text-[#D91C24]">10+</p>

                  <p className="text-xs text-gray-500 mt-1">Career Courses</p>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-sm font-bold text-[#1D1B67] mb-3">
                  Courses include:
                </p>

                <div className="flex flex-wrap gap-2">
                  {[
                    "RKCL",
                    "RS-CIT",
                    "Tally Prime",
                    "Graphic Design",
                    "Web Development",
                  ].map((course) => (
                    <span
                      key={course}
                      className="px-3 py-1.5 rounded-full bg-[#1D1B67]/5 text-[#1D1B67] text-xs font-semibold border border-[#1D1B67]/10"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <LogoFlip />
          </div>
        </div>
      </section>

      {/* Action Cards */}
      <ActionCards />

      {/* Courses */}
      <PopularCourses />

      {/* Top 3 Quiz Champions Leaderboard */}
      <TopScorers />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Testimonials */}
      <Testimonials />

      {/* Final CTA */}
      <section className="py-20 bg-[#f8f9ff]">
        <div className="container-jbc">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#1D1B67] p-8 sm:p-12 lg:p-16 text-center">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#D91C24]/30 rounded-full blur-3xl" />

            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#FFEB3B]/10 rounded-full blur-3xl" />

            <div className="relative">
              <p className="text-[#FFEB3B] text-xs font-bold tracking-[0.25em] uppercase">
                Start Your Journey
              </p>

              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
                Ready to Upgrade Your Skills?
              </h2>

              <p className="max-w-2xl mx-auto mt-5 text-white/60 text-sm sm:text-base leading-7">
                Join JBC and start learning practical computer skills that can
                help you build a better future.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a
                  href="/quiz"
                  className="px-7 py-3.5 rounded-xl bg-[#D91C24] text-white font-bold hover:bg-[#b9161d] transition"
                >
                  Play Quiz Now
                </a>

                <a
                  href="/contact"
                  className="px-7 py-3.5 rounded-xl bg-white/10 border border-white/15 text-white font-bold hover:bg-white/15 transition"
                >
                  Contact JBC
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
