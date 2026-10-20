"use client";

import { useEffect, useState } from "react";
import { FiBookOpen, FiEdit2, FiPlus, FiTrash2, FiSave, FiCheck, FiRefreshCw } from "react-icons/fi";
import { api } from "@/lib/api";
import PageTitle from "@/components/admin/PageTitle";

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formMsg, setFormMsg] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    shortName: "",
    duration: "3 Months",
    description: "",
    features: "Computer Fundamentals, Practical Lab Training, Certificate",
    isPopular: true,
    order: 1,
  });

  const loadCourses = async () => {
    try {
      const res = await api.getCourses();
      if (res.success && res.data) {
        setCourses(res.data);
      }
    } catch (err) {
      console.error("Courses load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleChange = (e) => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: val });
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    setFormMsg("");

    try {
      const payload = {
        ...formData,
        features: formData.features
          ? formData.features.split(",").map((f) => f.trim()).filter(Boolean)
          : [],
      };

      if (editingCourse) {
        const res = await api.updateCourse(editingCourse._id, payload);
        if (res.success) {
          setFormMsg("Course updated successfully!");
          setEditingCourse(null);
        }
      } else {
        const res = await api.createCourse(payload);
        if (res.success) {
          setFormMsg("New Popular Course added successfully!");
        }
      }

      setFormData({
        title: "",
        shortName: "",
        duration: "3 Months",
        description: "",
        features: "Computer Fundamentals, Practical Lab Training, Certificate",
        isPopular: true,
        order: 1,
      });
      loadCourses();
    } catch (err) {
      alert(err.message || "Failed to save course");
    }
  };

  const startEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title || "",
      shortName: course.shortName || "",
      duration: course.duration || "3 Months",
      description: course.description || "",
      features: Array.isArray(course.features)
        ? course.features.join(", ")
        : course.features || "",
      isPopular: course.isPopular !== undefined ? course.isPopular : true,
      order: course.order || 1,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to remove this course?")) return;
    try {
      await api.deleteCourse(id);
      loadCourses();
    } catch (err) {
      alert(err.message || "Failed to delete course");
    }
  };

  return (
    <div className="p-4 sm:p-7 space-y-7">
      <div className="flex items-center justify-between">
        <PageTitle
          title="Popular Courses Management"
          description="Add, edit and manage popular courses displayed on the homepage."
        />
        <button
          type="button"
          onClick={loadCourses}
          className="px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-xs font-bold text-[#1D1B67] flex items-center gap-1.5 shadow-sm"
        >
          <FiRefreshCw className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      {/* Course Add / Edit Form */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-base font-black text-[#1D1B67] mb-4">
          {editingCourse ? "✏️ Edit Course" : "➕ Add New Popular Course"}
        </h2>

        {formMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 font-bold flex items-center gap-2">
            <FiCheck /> {formMsg}
          </div>
        )}

        <form onSubmit={handleCreateOrUpdate} className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Course Title *
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. RS-CIT or Python Programming"
                className="w-full text-xs rounded-xl border border-gray-200 p-3 outline-none focus:border-[#1D1B67]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Short Name / Tag *
              </label>
              <input
                type="text"
                name="shortName"
                required
                value={formData.shortName}
                onChange={handleChange}
                placeholder="e.g. RS-CIT"
                className="w-full text-xs rounded-xl border border-gray-200 p-3 outline-none focus:border-[#1D1B67]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Duration
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g. 3 Months or 6 Months"
                className="w-full text-xs rounded-xl border border-gray-200 p-3 outline-none focus:border-[#1D1B67]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Course Description *
            </label>
            <textarea
              name="description"
              required
              rows={2}
              value={formData.description}
              onChange={handleChange}
              placeholder="e.g. Learn practical computer basics, office tools and internet services."
              className="w-full text-xs rounded-xl border border-gray-200 p-3 outline-none focus:border-[#1D1B67]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Key Features (comma-separated)
            </label>
            <input
              type="text"
              name="features"
              value={formData.features}
              onChange={handleChange}
              placeholder="Computer fundamentals, Office applications, Internet services"
              className="w-full text-xs rounded-xl border border-gray-200 p-3 outline-none focus:border-[#1D1B67]"
            />
          </div>

          <div className="flex items-center gap-6 pt-1">
            <label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                name="isPopular"
                checked={formData.isPopular}
                onChange={handleChange}
                className="rounded border-gray-300 text-[#1D1B67] focus:ring-[#1D1B67]"
              />
              Show on Homepage Popular Courses
            </label>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#1D1B67] hover:bg-[#15144f] text-white text-xs font-bold transition flex items-center gap-1.5"
            >
              <FiSave /> {editingCourse ? "Update Course" : "Save Course"}
            </button>

            {editingCourse && (
              <button
                type="button"
                onClick={() => {
                  setEditingCourse(null);
                  setFormData({
                    title: "",
                    shortName: "",
                    duration: "3 Months",
                    description: "",
                    features: "Computer Fundamentals, Practical Lab Training",
                    isPopular: true,
                    order: 1,
                  });
                }}
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Courses List */}
      <div className="space-y-4">
        <h2 className="text-base font-black text-[#1D1B67]">
          Existing Courses ({courses.length})
        </h2>

        {courses.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-gray-100 text-xs text-gray-400">
            No courses available. Add one above!
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {courses.map((c) => (
              <div
                key={c._id}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded-md bg-[#1D1B67]/10 text-[#1D1B67] text-[10px] font-black uppercase">
                      {c.shortName}
                    </span>
                    <span className="text-[11px] text-gray-400 font-semibold">
                      {c.duration}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base text-[#101828]">
                    {c.title}
                  </h3>

                  <p className="mt-2 text-xs text-gray-500 line-clamp-3">
                    {c.description}
                  </p>

                  {c.features && c.features.length > 0 && (
                    <div className="mt-3 space-y-1">
                      {c.features.slice(0, 3).map((f, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-1.5 text-[11px] text-gray-600"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D91C24]" />
                          <span className="truncate">{f}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    {c.isPopular ? "Popular" : "Standard"}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => startEdit(c)}
                      className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#1D1B67] transition"
                      title="Edit Course"
                    >
                      <FiEdit2 size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(c._id)}
                      className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition"
                      title="Delete Course"
                    >
                      <FiTrash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
