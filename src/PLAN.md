# PLAN.md

## Project: Quiz Management System

### **Objective**

Design and implement a Quiz Management System that allows:

1. **Admin Panel**

   - Create and manage quizzes.
   - Add multiple questions of various types (MCQ, True/False, Text).

2. **Public Page**
   - Users can take quizzes.
   - Display results with score and/or correct answers.

---

## **Assumptions**

- Each quiz has a **title** and a **list of questions**.
- Question types supported:
  - Multiple Choice (MCQ)
  - True/False
- Each question may have **one or more correct answers**.
- Public quiz takers do **not need to log in**.
- Results are shown immediately after quiz submission.

---

## **Scope**

### **In-Scope**

- CRUD for quizzes (Create, Read; Update/Delete optional).
- CRUD for questions (Create, Read; Update/Delete optional).
- User-facing quiz-taking page with:
  - Question display
  - Answer selection/input
  - Result calculation and display

## **Tech Stack**

| Layer           | Technology/Tool              |
| --------------- | ---------------------------- |
| Frontend        | React.js + Tailwind CSS      |
| Backend         | Spring Boot (Java)           |
| Database        | MySQL                        |
| IDE             | VSCode / IntelliJ IDEA       |
| Version Control | Git + GitHub                 |
| Optional AI     | GitHub Copilot / ChatGPT CLI |

---
