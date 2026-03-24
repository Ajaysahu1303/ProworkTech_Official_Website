import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import logo from '../assets/logo_prowork.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Team', path: '/team' },
  ];

  // Logic to determine if we should use light text (e.g., on dark hero sections)
  const isHomePage = location.pathname === '/';
  const darkHeroPages = ['/services', '/about', '/team', '/contact', '/demo', '/privacy-policy', '/terms-of-service'];
  const isDarkHeroPage = darkHeroPages.includes(location.pathname);
  const useLightText = !scrolled && isDarkHeroPage;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled
        ? 'bg-white/90 backdrop-blur-lg border-b border-[var(--color-border)] py-4 shadow-md'
        : 'bg-transparent py-6'
        }`}
    >
      <div className="container-custom flex items-center justify-between">

        {/* ✅ LOGO */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
          onClick={() => setIsOpen(false)}
        >
          <div className={`h-18 md:h-20 flex items-center ${useLightText ? 'bg-white w-fit rounded-2xl' : ''
            }`}>
            <img
              src={logo}
              alt="Prowork Tech"
              className={`h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105`}
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className={`text-xl md:text-2xl font-black tracking-tighter uppercase leading-tight ${useLightText ? 'text-white' : 'text-primary-700'
              }`}>
              PRO<span className="text-accent-700">work</span>
            </span>
            <span className={`text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase leading-tight -mt-1 ${useLightText ? 'text-primary-100/60' : 'text-primary-600'
              }`}>
              Tech
            </span>
          </div>
        </Link>

        {/* ✅ DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `
                px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                ${isActive
                  ? 'text-primary-600 bg-primary-50 shadow-sm'
                  : useLightText
                    ? 'text-white/80 hover:text-white hover:bg-white/10'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-primary-50'
                }
              `}
            >
              {link.name}
            </NavLink>
          ))}

          {/* CTA */}
          <div className={`ml-4 pl-4 border-l ${useLightText ? 'border-white/20' : 'border-[var(--color-border)]'}`}>
            <Link to="/contact" className="btn-primary px-5 py-2 text-sm">
              Get Started
            </Link>
          </div>
        </div>

        {/* ✅ MOBILE MENU BUTTON */}
        <button
          className={`md:hidden p-2 rounded-lg focus:outline-none transition-colors ${useLightText ? 'bg-white/10 text-white' : 'bg-primary-50 text-primary-600'
            }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ✅ MOBILE MENU */}
      <div
        className={`
          fixed inset-0 top-[88px] bg-[var(--color-surface)] z-40 transition-transform duration-500 ease-in-out md:hidden
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="flex flex-col p-6 gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `
                flex items-center justify-between p-4 rounded-xl text-lg font-semibold transition-all
                ${isActive
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-[var(--color-text-primary)] hover:bg-primary-50'
                }
              `}
            >
              {link.name}
              <ChevronRight
                size={20}
                className={
                  location.pathname === link.path ? 'opacity-100' : 'opacity-30'
                }
              />
            </NavLink>
          ))}

          {/* CTA */}
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="btn-primary mt-6 py-4 text-center text-lg"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;