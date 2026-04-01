import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ScrollToTop from './components/ScrollToTop';
import Dashboard from './pages/Dashboard';
import ManageTeam from './pages/ManageTeam';
import ManageServices from './pages/ManageServices';
import Login from './pages/Login';
import ManageSubmissions from './pages/ManageSubmissions';
import Settings from './pages/Settings';
import ManageClients from './pages/ManageClients';
import ManageTestimonials from './pages/ManageTestimonials';
import { Toaster } from 'react-hot-toast';

const ProtectedRoute = () => {
  const [authState, setAuthState] = useState('loading'); // 'loading' | 'authenticated' | 'unauthenticated'

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("adminToken");

      // No token at all → immediately redirect
      if (!token) {
        setAuthState('unauthenticated');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/admin/verify', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          setAuthState('authenticated');
        } else {
          // Token is expired or invalid → clear it and redirect
          localStorage.removeItem("adminToken");
          setAuthState('unauthenticated');
        }
      } catch (err) {
        // Server unreachable → clear token and redirect for safety
        localStorage.removeItem("adminToken");
        setAuthState('unauthenticated');
      }
    };

    verifyToken();
  }, []);

  // Show a loading screen while verifying
  if (authState === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-primary-600 rounded-full animate-spin"></div>
          <p className="text-slate-500 font-semibold text-sm">Verifying session...</p>
        </div>
      </div>
    );
  }

  if (authState === 'unauthenticated') {
    return <Navigate to="/login" replace />;
  }

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
      <Toaster 
        position="top-right" 
        toastOptions={{
          className: 'font-semibold font-sans rounded-xl border border-slate-100 shadow-xl',
          duration: 4000
        }} 
      />
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/team" element={<ManageTeam />} />
            <Route path="/services" element={<ManageServices />} />
            <Route path="/submissions" element={<ManageSubmissions />} />
            <Route path="/testimonials" element={<ManageTestimonials />} />
            <Route path="/clients" element={<ManageClients />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
