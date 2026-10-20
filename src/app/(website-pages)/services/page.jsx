import PopularCourses from "@/components/website/PopularCourses";
import WhyChooseUs from "@/components/website/WhyChooseUs";
import SectionHeading from "@/components/website/SectionHeading";

export const metadata = {
  title: "Courses & Services | JBC",
  description:
    "Explore computer courses and training programs at Jai Bhawani Computer Education Centre.",
};

export default function ServicesPage() {
  return (
    <div className="pt-[76px]">
      {/* Page Hero */}
      <section className="py-24 lg:py-32 bg-[#1D1B67]">
        <div className="container-jbc text-center">
          <span className="text-[#FFEB3B] text-xs font-bold tracking-[0.25em]">
            COURSES & SERVICES
          </span>

          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white">
            Learn Skills That <span className="text-[#FFEB3B]">Matter.</span>
          </h1>

          <p className="max-w-2xl mx-auto mt-6 text-white/60 leading-8 text-sm sm:text-base">
            Explore our computer education and career-focused courses designed
            for practical learning.
          </p>
        </div>
      </section>

      {/* Courses */}
      <PopularCourses />

      {/* Service areas */}
      <section className="py-20 bg-white">
        <div className="container-jbc">
          <SectionHeading
            eyebrow="Training Areas"
            title="More Than Just Computer Classes"
            description="Our learning approach focuses on skills students can actually use."
          />

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Basic Computer Education",
                text: "Learn computer fundamentals, file management, internet usage and everyday digital skills.",
              },
              {
                title: "Professional Skills",
                text: "Develop practical skills in accounting, office applications and professional computer tools.",
              },
              {
                title: "Advanced Digital Skills",
                text: "Explore graphic design, web development and other modern digital technologies.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl p-7 bg-[#f8f9ff] border border-gray-100"
              >
                <div className="w-10 h-1 bg-[#D91C24] rounded-full" />

                <h3 className="mt-6 text-xl font-bold text-[#1D1B67]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm text-gray-500 leading-7">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhyChooseUs />
    </div>
  );
}
