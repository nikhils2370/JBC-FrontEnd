"use client";

import { useState } from "react";
import Link from "next/link";
import { FiArrowLeft, FiCheck, FiSave } from "react-icons/fi";
import PageTitle from "@/components/admin/PageTitle";

export default function AddCategoryPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Active");
  const [saved, setSaved] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  }

  return (
    <div className="p-4 sm:p-6 lg:p-7">
      <PageTitle
        title="Add Category"
        description="Create a new course category."
        action={
          <Link
            href="/admin/category"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-[#1D1B67] text-sm font-bold"
          >
            <FiArrowLeft size={16} />
            Back
          </Link>
        }
      />

      <div className="max-w-3xl">
        {saved && (
          <div className="mb-5 flex items-center gap-3 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm">
            <FiCheck />
            Category created successfully.
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-7"
        >
          <div>
            <label className="block text-sm font-bold text-[#1D1B67] mb-2">
              Category Name
            </label>

            <input
              type="text"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter category name"
              className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 outline-none text-sm focus:border-[#1D1B67]"
            />
          </div>

          <div className="mt-5">
            <label className="block text-sm font-bold text-[#1D1B67] mb-2">
              Description
            </label>

            <textarea
              rows={5}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Enter category description"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none text-sm resize-none focus:border-[#1D1B67]"
            />
          </div>

          <div className="mt-5">
            <label className="block text-sm font-bold text-[#1D1B67] mb-2">
              Status
            </label>

            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 outline-none text-sm focus:border-[#1D1B67]"
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          <div className="mt-7 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D91C24] text-white text-sm font-bold hover:bg-[#b9161d] transition"
            >
              <FiSave size={17} />
              Save Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
