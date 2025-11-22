import { Routes, Route } from "react-router-dom";
import UserQuizList from "./UserQuizList";
import QuizDetail from "./QuizDetail";

export default function UserQuizApp() {
  return (
    <Routes>
      <Route path="/" element={<UserQuizList />} />
      <Route path="/quiz/:quizId" element={<QuizDetail />} />
    </Routes>
  );
}
