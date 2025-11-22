import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateQuiz from "./pages/admin/CreateQuiz";
import AdminQuizList from "./pages/admin/AdminQuizList";
import AddQuestions from "./pages/admin/AddQuestion";
import ViewQuestions from "./pages/admin/ViewQuestions";
import QuizDetail from "./pages/public/QuizDetail";
import UserQuizList from "./pages/public/UserQuizList";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/create-quiz" element={<CreateQuiz />} />
        <Route path="/admin/quizzes" element={<AdminQuizList />} />
        <Route
          path="/admin/quizzes/:quizId/questions"
          element={<AddQuestions />}
        />

        <Route
          path="/admin/quizzes/:quizId/view-questions"
          element={<ViewQuestions />}
        />

        {/* Public/User */}
        <Route path="/" element={<UserQuizList />} />
        <Route path="/quiz/:quizId" element={<QuizDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
