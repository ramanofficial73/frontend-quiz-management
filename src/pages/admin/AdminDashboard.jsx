export default function AdminDashboard() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a
          href="/admin/create-quiz"
          className="p-6 bg-blue-600 text-white rounded-xl"
        >
          ➕ Create Quiz
        </a>

        <a
          href="/admin/quizzes"
          className="p-6 bg-green-600 text-white rounded-xl"
        >
          📚 View Quizzes
        </a>
      </div>
    </div>
  );
}
