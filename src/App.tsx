import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import StudyMaterials from './pages/StudyMaterials';
import Flashcards from './pages/Flashcards';
import Quizzes from './pages/Quizzes';
import Tutor from './pages/Tutor';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className="flex-1 lg:ml-64 pt-16">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/materials" element={<StudyMaterials />} />
              <Route path="/flashcards" element={<Flashcards />} />
              <Route path="/quizzes" element={<Quizzes />} />
              <Route path="/tutor" element={<Tutor />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
