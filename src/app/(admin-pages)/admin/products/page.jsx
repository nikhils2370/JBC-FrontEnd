import PageTitle from "@/components/admin/PageTitle";

export default function ProductsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-7">
      <PageTitle
        title="Products"
        description="Manage courses and learning products."
      />

      <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
        <h2 className="text-xl font-bold text-[#1D1B67]">
          Products Management
        </h2>

        <p className="mt-2 text-sm text-gray-400">
          Product management module is ready for backend integration.
        </p>
      </div>
    </div>
  );
}
