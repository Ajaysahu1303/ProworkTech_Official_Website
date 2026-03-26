import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ScrollToTop from './components/ScrollToTop';
import Dashboard from './pages/Dashboard';
import ManageTeam from './pages/ManageTeam';
import ManageServices from './pages/ManageServices';
import Login from './pages/Login';

const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem("adminToken");
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div className="flex bg-slate-50 min-h-screen font-sans">
      {/* Sidebar */}
      <Sidebar aria-label="Admin Sidebar" />
      
      {/* Main Content */}
      <main className="flex-grow ml-64 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/team" element={<ManageTeam />} />
            <Route path="/services" element={<ManageServices />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;


