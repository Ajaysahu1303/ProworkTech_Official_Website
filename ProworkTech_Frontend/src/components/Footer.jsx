import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo_prowork.png';
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: 'Website Development', path: '/services#web-dev' },
      { name: 'App Development', path: '/services#app-dev' },
      { name: 'Social Media Marketing', path: '/services#social-media' },
      { name: 'Meta Ads', path: '/services#meta-ads' },
      { name: 'SEO Optimization', path: '/services#seo' },
      { name: 'Branding & Designs', path: '/services#branding' },
      { name: 'Logo Designing', path: '/services#logo-design' },
    ],
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Our Team', path: '/team' },
      { name: 'Contact', path: '/contact' },
      { name: 'Privacy Policy', path: '/privacy-policy' },
    ],
    social: [
      { icon: <Facebook size={20} />, path: 'https://www.facebook.com/people/Pro-Work/61574792888087/' },
      { icon: <Twitter size={20} />, path: '#' },
      { icon: <Instagram size={20} />, path: 'https://www.instagram.com/prowork__official/' },
      { icon: <Linkedin size={20} />, path: 'https://www.linkedin.com/company/pro-work-in/' },
    ]
  };

  return (
    <footer className="bg-primary-800 text-slate-300 pt-20 pb-10">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Section */}

          <div className="lg:col-span-4">
            <div className="h-40 flex items-center bg-white w-fit rounded-2xl">
              <img
                src={logo}
                alt="Prowork Tech"
                className={`h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105`}
              />
            </div>
            <Link to="/" className="flex items-center gap-2 group mb-6 mt-4">
              <span className="text-2xl font-black tracking-tighter uppercase text-white">
                PRO<span className="text-accent-500">work</span>
              </span>
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-primary-100/60 -mb-1 ml-1 self-end">
                Tech
              </span>
            </Link>
            <p className="text-primary-100/70 leading-relaxed mb-8 max-w-sm">
              Prayagraj's agile digital partner. We architect high-performance
              growth engines for rising brands and startups local and beyond.
            </p>

            <div className="flex gap-4">
              {footerLinks.social.map((item, idx) => (
                <a
                  key={idx}
                  href={item.path}
                  className="w-10 h-10 rounded-full bg-primary-800 flex items-center justify-center text-primary-100/60 transition-all hover:bg-primary-600 hover:text-white"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 text-primary-100/70">
            <h4 className="text-white font-bold mb-6">Services</h4>
            <ul className="space-y-4">
              {footerLinks.services.map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} className="hover:text-accent-500 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 text-primary-100/70">
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} className="hover:text-accent-500 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4 text-primary-100/70">
            <h4 className="text-white font-bold mb-6">Get In Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-accent-500 shrink-0" />
                <span>Prayagraj, Uttar Pradesh, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-accent-500 shrink-0" />
                <span>+91 (000) 000-0000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-accent-500 shrink-0" />
                <span>hello@proworktech.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>&copy; {currentYear} Prowork Tech. All rights reserved.</p>
          <div className="flex gap-8">
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

