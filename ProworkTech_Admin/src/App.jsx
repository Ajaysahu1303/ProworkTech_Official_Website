import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ScrollToTop from './components/ScrollToTop';
import Dashboard from './pages/Dashboard';
import ManageTeam from './pages/ManageTeam';
import ManageServices from './pages/ManageServices';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex bg-slate-50 min-h-screen font-sans">
        {/* Sidebar */}
        <Sidebar aria-label="Admin Sidebar" />
        
        {/* Main Content */}
        <main className="flex-grow ml-64 min-h-screen">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/team" element={<ManageTeam />} />
            <Route path="/services" element={<ManageServices />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;


