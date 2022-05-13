import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import HomePage from './pages/HomePage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LessonsPage from "./pages/LessonsPage";
import ReviewPage from "./pages/ReviewPage";
import SummaryPage from "./pages/SummaryPage";
import FlashcardPage from "./pages/FlashcardPage";
import AllFlashcardsPage from "./pages/AllFlashcardsPage";
import AuthPage from "./pages/AuthPage";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<AuthPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/lessons" element={<LessonsPage />} />
              <Route path="/review" element={<ReviewPage />} />
              <Route path="/summary" element={<SummaryPage />} />
              <Route path="/cards" element={<AllFlashcardsPage />} />
              <Route path="/card" element={<FlashcardPage />}>
                  <Route path=":cardId" element={<FlashcardPage />} />
              </Route>
              <Route
                  path="*"
                  element={
                      <main style={{ padding: "1rem" }}>
                          <p>There's nothing here!</p>
                      </main>
                  }
              />
          </Routes>
      </BrowserRouter>
  </React.StrictMode>
);
