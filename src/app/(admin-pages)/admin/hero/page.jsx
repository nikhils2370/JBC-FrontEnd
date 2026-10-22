"use client";

import { useEffect, useState } from "react";
import {
  FiEdit2,
  FiImage,
  FiPlus,
  FiTrash2,
  FiSave,
  FiCheck,
  FiRefreshCw,
  FiUploadCloud,
} from "react-icons/fi";
import { api } from "@/lib/api";
import PageTitle from "@/components/admin/PageTitle";

export default function AdminHeroPage() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSlide, setEditingSlide] = useState(null);
  const [formMsg, setFormMsg] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    small: "WELCOME TO JBC",
    title: "",
    highlight: "",
    description: "",
    image: "/hero-1.jpg",
    order: 1,
  });

  const loadSlides = async () => {
    try {
      const res = await api.getAllHeroSlides();
      if (res.success && res.data) {
        setSlides(res.data);
      }
    } catch (err) {
      console.error("Hero load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSlides();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file (JPG, PNG, WebP)");
      return;
    }

    setUploadingImage(true);
    try {
      const res = await api.uploadHeroImage(file);
      if (res.success && res.imageUrl) {
        setFormData((prev) => ({ ...prev, image: res.imageUrl }));
        setFormMsg("Image successfully uploaded via Multer & Cloudinary!");
        setTimeout(() => setFormMsg(""), 4000);
      } else {
        alert(res.message || "Image upload failed");
      }
    } catch (err) {
      alert("Image upload error: " + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    setFormMsg("");

    try {
      if (editingSlide) {
        const res = await api.updateHeroSlide(editingSlide._id, formData);
        if (res.success) {
          setFormMsg("Hero slide updated successfully!");
          setEditingSlide(null);
        }
      } else {
        const res = await api.createHeroSlide(formData);
        if (res.success) {
          setFormMsg("New Hero slide added successfully!");
        }
      }
      setFormData({
        small: "WELCOME TO JBC",
        title: "",
        highlight: "",
        description: "",
        image: "/hero-1.jpg",
        order: 1,
      });
      loadSlides();
    } catch (err) {
      alert(err.message || "Operation failed");
    }
  };

  const startEdit = (slide) => {
    setEditingSlide(slide);
    setFormData({
      small: slide.small || "WELCOME TO JBC",
      title: slide.title || "",
      highlight: slide.highlight || "",
      description: slide.description || "",
      image: slide.image || "/hero-1.jpg",
      order: slide.order || 1,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this hero slide?")) return;
    try {
      await api.deleteHeroSlide(id);
      loadSlides();
    } catch (err) {
      alert(err.message || "Failed to delete slide");
    }
  };

  return (
    <div className="p-4 sm:p-7 space-y-7">
      <div className="flex items-center justify-between">
        <PageTitle
          title="Hero Section Manager"
          description="Customize the images, headings, highlights, and descriptions displayed on the website hero banner."
        />
        <button
          type="button"
          onClick={loadSlides}
          className="px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-xs font-bold text-[#1D1B67] flex items-center gap-1.5 shadow-sm"
        >
          <FiRefreshCw className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      {/* Editor Form */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-base font-black text-[#1D1B67] mb-4">
          {editingSlide ? "✏️ Edit Hero Slide" : "➕ Add New Hero Slide"}
        </h2>

        {formMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 font-bold flex items-center gap-2">
            <FiCheck /> {formMsg}
          </div>
        )}

        <form onSubmit={handleCreateOrUpdate} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Eyebrow / Small Badge Text
              </label>
              <input
                type="text"
                name="small"
                value={formData.small}
                onChange={handleChange}
                placeholder="e.g. WELCOME TO JBC"
                className="w-full text-xs rounded-xl border border-gray-200 p-3 outline-none focus:border-[#1D1B67]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Display Order
              </label>
              <input
                type="number"
                name="order"
                value={formData.order}
                onChange={handleChange}
                className="w-full text-xs rounded-xl border border-gray-200 p-3 outline-none focus:border-[#1D1B67]"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Main Title *
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Learn Today."
                className="w-full text-xs rounded-xl border border-gray-200 p-3 outline-none focus:border-[#1D1B67]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Highlight Text (Yellow Accent)
              </label>
              <input
                type="text"
                name="highlight"
                value={formData.highlight}
                onChange={handleChange}
                placeholder="e.g. Lead Tomorrow."
                className="w-full text-xs rounded-xl border border-gray-200 p-3 outline-none focus:border-[#1D1B67]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Description Text
            </label>
            <textarea
              name="description"
              rows={2}
              value={formData.description}
              onChange={handleChange}
              placeholder="e.g. Build practical computer skills with industry-focused courses."
              className="w-full text-xs rounded-xl border border-gray-200 p-3 outline-none focus:border-[#1D1B67]"
            />
          </div>

          {/* Hero Banner Image with Cloudinary & Multer Upload */}
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <label className="block text-xs font-bold text-gray-800">
                  Hero Banner Image *
                </label>
                <p className="text-[11px] text-gray-500">
                  Upload an image from your computer using Multer & Cloudinary, or enter an image URL.
                </p>
              </div>

              {/* Upload Button */}
              <label className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#1D1B67] to-[#D91C24] text-white text-xs font-bold cursor-pointer hover:opacity-95 transition shadow-sm self-start sm:self-auto">
                <FiUploadCloud className={uploadingImage ? "animate-bounce" : ""} />
                {uploadingImage ? "Uploading to Cloudinary..." : "Upload from Computer (Multer)"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  className="hidden"
                />
              </label>
            </div>

            <div className="grid md:grid-cols-3 gap-3 items-center">
              <div className="md:col-span-2">
                <input
                  type="text"
                  name="image"
                  required
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="e.g. /hero-1.jpg or https://res.cloudinary.com/..."
                  className="w-full text-xs rounded-xl border border-gray-200 bg-white p-3 outline-none focus:border-[#1D1B67]"
                />
              </div>

              {/* Live Preview Thumbnail */}
              <div className="flex items-center gap-2">
                {formData.image ? (
                  <div className="flex items-center gap-2">
                    <img
                      src={formData.image}
                      alt="Hero Preview"
                      className="w-16 h-12 object-cover rounded-lg border border-gray-200 shadow-sm"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                    <span className="text-[10px] text-gray-500 font-semibold">
                      Live Preview
                    </span>
                  </div>
                ) : (
                  <span className="text-[11px] text-gray-400 italic">No image selected</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#1D1B67] hover:bg-[#15144f] text-white text-xs font-bold transition flex items-center gap-1.5"
            >
              <FiSave /> {editingSlide ? "Update Slide" : "Save Slide"}
            </button>

            {editingSlide && (
              <button
                type="button"
                onClick={() => {
                  setEditingSlide(null);
                  setFormData({
                    small: "WELCOME TO JBC",
                    title: "",
                    highlight: "",
                    description: "",
                    image: "/hero-1.jpg",
                    order: 1,
                  });
                }}
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 transition"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Existing Slides List */}
      <div className="space-y-4">
        <h2 className="text-base font-black text-[#1D1B67]">
          Current Live Slides ({slides.length})
        </h2>

        {slides.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-gray-100 text-xs text-gray-400">
            No hero slides found. Add one above!
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {slides.map((s, idx) => (
              <div
                key={s._id || idx}
                className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm flex flex-col justify-between"
              >
                <div className="h-40 bg-gray-100 relative">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/hero-1.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                    <span className="text-[10px] font-bold text-[#FFEB3B] tracking-widest uppercase">
                      {s.small}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-base text-[#101828]">
                      {s.title}{" "}
                      <span className="text-amber-500">{s.highlight}</span>
                    </h3>
                    <p className="mt-2 text-xs text-gray-500 line-clamp-3">
                      {s.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-gray-400">
                      Order: {s.order}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(s)}
                        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#1D1B67] transition"
                        title="Edit slide"
                      >
                        <FiEdit2 size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(s._id)}
                        className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition"
                        title="Delete slide"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
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
