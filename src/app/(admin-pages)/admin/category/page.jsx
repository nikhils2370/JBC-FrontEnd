"use client";

import Link from "next/link";
import { FiEdit2, FiPlus, FiSearch, FiTrash2 } from "react-icons/fi";
import PageTitle from "@/components/admin/PageTitle";

const categories = [
  {
    id: 1,
    name: "Computer Basics",
    courses: 4,
    status: "Active",
  },
  {
    id: 2,
    name: "Government Courses",
    courses: 3,
    status: "Active",
  },
  {
    id: 3,
    name: "Accounting",
    courses: 2,
    status: "Active",
  },
  {
    id: 4,
    name: "Web Development",
    courses: 2,
    status: "Active",
  },
];

export default function CategoryPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-7">
      <PageTitle
        title="Category Management"
        description="Create and manage your course categories."
        action={
          <Link
            href="/admin/category/add-category"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#D91C24] text-white text-sm font-bold hover:bg-[#b9161d] transition"
          >
            <FiPlus size={17} />
            Add Category
          </Link>
        }
      />

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex flex-col sm:flex-row gap-3 justify-between">
          <div className="relative w-full sm:w-80">
            <FiSearch
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search category..."
              className="w-full h-10 rounded-xl bg-gray-50 pl-10 pr-4 text-sm outline-none border border-transparent focus:border-[#1D1B67]"
            />
          </div>

          <select className="h-10 rounded-xl bg-gray-50 border-none px-4 text-sm text-gray-600 outline-none">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px]">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-5 py-4 text-left text-[10px] uppercase tracking-wider text-gray-400">
                  #
                </th>

                <th className="px-5 py-4 text-left text-[10px] uppercase tracking-wider text-gray-400">
                  Category
                </th>

                <th className="px-5 py-4 text-left text-[10px] uppercase tracking-wider text-gray-400">
                  Courses
                </th>

                <th className="px-5 py-4 text-left text-[10px] uppercase tracking-wider text-gray-400">
                  Status
                </th>

                <th className="px-5 py-4 text-right text-[10px] uppercase tracking-wider text-gray-400">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {categories.map((category) => (
                <tr
                  key={category.id}
                  className="border-t border-gray-100 hover:bg-gray-50/70"
                >
                  <td className="px-5 py-4 text-sm text-gray-400">
                    {category.id}
                  </td>

                  <td className="px-5 py-4">
                    <p className="font-semibold text-sm text-[#1D1B67]">
                      {category.name}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-500">
                    {category.courses}
                  </td>

                  <td className="px-5 py-4">
                    <span className="px-2.5 py-1 rounded-full bg-green-50 text-green-600 text-[10px] font-bold">
                      {category.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100"
                      >
                        <FiEdit2 size={15} />
                      </button>

                      <button
                        type="button"
                        className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100"
                      >
                        <FiTrash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
