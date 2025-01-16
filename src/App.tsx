import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Members from './components/Members';
import Classes from './components/Classes';
import Attendance from './components/Attendance';
import { GymProvider } from './context/GymContext';
import githubIcon from './assets/images/github.svg';
import mediumIcon from './assets/images/medium.svg';
import linkedinIcon from './assets/images/linkedin.svg';

function App() {
  return (
    <BrowserRouter>
      <GymProvider>
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <Navbar />
          <main className="container mx-auto py-6 px-4 flex-grow">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/members" element={<Members />} />
              <Route path="/classes" element={<Classes />} />
              <Route path="/attendance" element={<Attendance />} />
            </Routes>
          </main>
          <footer className="text-center py-8 bg-gray-50">
            <p className="text-lg text-gray-700 mb-4">
              Developed with <span className="text-red-500 animate-pulse">❤️</span> by nehalmr
            </p>
            <div className="flex justify-center space-x-6">
              <a 
                href="https://github.com/nehalmr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transform transition hover:scale-110"
              >
                <img src={githubIcon} alt="GitHub" className="w-8 h-8" />
              </a>
              <a 
                href="https://medium.com/@nehalmr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transform transition hover:scale-110"
              >
                <img src={mediumIcon} alt="Medium" className="w-8 h-8" />
              </a>
              <a 
                href="https://www.linkedin.com/in/nehalmr/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transform transition hover:scale-110"
              >
                <img src={linkedinIcon} alt="LinkedIn" className="w-8 h-8" />
              </a>
            </div>
          </footer>
        </div>
      </GymProvider>
    </BrowserRouter>
  );
}

export default App;