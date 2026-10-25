"use client";

import { useEffect, useState } from "react";
import SectionHeading from "./SectionHeading";
import CourseCard from "./CourseCard";
import { api } from "@/lib/api";

const defaultCourses = [
    {
        title: "RKCL",
        shortName: "RKCL",
        duration: "3–6 Months",
        description:
            "Build essential digital literacy and computer skills for education, employment and everyday digital work.",
        features: [
            "Computer fundamentals",
            "Internet & digital services",
            "Practical computer training",
        ],
    },
    {
        title: "RS-CIT",
        shortName: "RS-CIT",
        duration: "3 Months",
        description:
            "Learn practical information technology skills through a structured and student-friendly curriculum.",
        features: [
            "Computer basics",
            "Office applications",
            "Internet & online services",
        ],
    },
    {
        title: "Tally Prime",
        shortName: "TALLY",
        duration: "2–4 Months",
        description:
            "Learn accounting concepts and Tally Prime with practical exercises for real-world business use.",
        features: [
            "Accounting fundamentals",
            "Tally Prime",
            "GST & business reports",
        ],
    },
];

export default function PopularCourses() {
    const [courses, setCourses] = useState(defaultCourses);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCourses() {
            try {
                const res = await api.getCourses();
                if (res.success && res.data && res.data.length > 0) {
                    setCourses(res.data);
                }
            } catch (err) {
                console.log("Using default courses");
            } finally {
                setLoading(false);
            }
        }
        fetchCourses();
    }, []);

    return (
        <section className="py-20 lg:py-28 bg-[#f8f9ff]">
            <div className="container-jbc">
                <SectionHeading
                    eyebrow="Our Courses"
                    title="Popular Courses"
                    description="Choose a practical course designed to help you develop useful computer and digital skills."
                />

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
                    {courses.map((course, index) => (
                        <CourseCard
                            key={course._id || course.title}
                            {...course}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}