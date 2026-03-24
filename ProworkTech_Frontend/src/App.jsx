import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './Pages/Home';
import About from './Pages/About';
import Services from './Pages/Services';
import Contact from './Pages/Contact';
import Team from './Pages/Team';
import NotFound from './Pages/NotFound';
import Demo from './Pages/Demo';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import TermsOfService from './Pages/TermsOfService';

function App() {
  return (
    <Router>
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;


