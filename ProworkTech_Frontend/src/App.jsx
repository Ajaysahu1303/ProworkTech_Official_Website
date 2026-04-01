import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Team from './pages/Team';
import NotFound from './pages/NotFound';
import Demo from './pages/Demo';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Reviews from './pages/Reviews';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      <Router>
      <Toaster 
        position="top-right" 
        toastOptions={{
          className: 'font-semibold font-sans rounded-xl border border-slate-100 shadow-xl',
          duration: 4000
        }} 
      />
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/team" element={<Team />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
    </HelmetProvider>
  );
}

export default App;


