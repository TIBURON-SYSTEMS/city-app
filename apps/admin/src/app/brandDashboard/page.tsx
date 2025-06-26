export default function BrandDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Brand Dashboard
      </h1>
      <a href="/api/auth/logout">
        <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
          Logout
        </button>
      </a>
    </div>
  );
}
