import React from 'react';
import ServicesModule from '../components/Services';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Share2, Globe, BarChart3, Smartphone, Palette, Search, Pentagon } from 'lucide-react';
import { Link } from 'react-router-dom';
import CTA from '../components/CTA';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
// Import Illustrations
import socialMediaImg from '../assets/Illustrations/social-media.png';
import webDevImg from '../assets/Illustrations/web-dev.png';
import paidAdsImg from '../assets/Illustrations/paid-ads.png';
import localSeoImg from '../assets/Illustrations/local-seo.png';


const serviceTitles = [
  "Website Development",
  "App Development",
  "Social Media Marketing",
  "Meta Ads",
  "SEO Optimization",
  "Branding & Creative Designs",
  "Logo Designing"
];

const detailedServices = [
  {
    id: 'web-dev',
    icon: <Globe size={32} />,
    image: webDevImg,
    title: 'Website Development',
    tagline: 'Your digital storefront, perfected.',
    desc: 'Bespoke web applications designed for performance and scale. We use modern tech stacks like React, Next.js, and Node.js to build lightning-fast experiences.',
    features: [
      'High-Performance React/Next.js Apps',
      'Mobile-First Responsive Design',
      'E-commerce & Custom Integrations',
      'SEO & Performance Optimization'
    ],
    color: 'bg-primary-600',
    lightColor: 'bg-primary-50',
    textColor: 'text-primary-600'
  },
  {
    id: 'app-dev',
    icon: <Smartphone size={32} />,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    title: 'App Development',
    tagline: 'Powerful mobile solutions for iOS & Android.',
    desc: 'We build native and cross-platform mobile apps that provide seamless experiences across all devices, focusing on performance and user engagement.',
    features: [
      'Native iOS & Android Development',
      'Cross-Platform (React Native/Flutter)',
      'Custom API & Backend Integration',
      'App Store Optimization (ASO)'
    ],
    color: 'bg-primary-600',
    lightColor: 'bg-primary-50',
    textColor: 'text-primary-600'
  },
  {
    id: 'social-media',
    icon: <Share2 size={32} />,
    image: socialMediaImg,
    title: 'Social Media Marketing',
    tagline: 'Build a community around your brand.',
    desc: 'We don\'t just post content; we spark conversations. Our social media strategies are focused on building authentic connections that drive loyalty and sales.',
    features: [
      'Strategic Content Planning',
      'Community Management & Engagement',
      'Influencer Collaboration',
      'Monthly Performance Analytics'
    ],
    color: 'bg-primary-600',
    lightColor: 'bg-primary-50',
    textColor: 'text-primary-600'
  },
  {
    id: 'meta-ads',
    icon: <BarChart3 size={32} />,
    image: paidAdsImg,
    title: 'Meta Ads',
    tagline: 'Scale faster with data-driven ads.',
    desc: 'Maximize your ROI with expert Meta and Facebook Ads management. We focus on low-CPA strategies and high-converting creative directions.',
    features: [
      'Audience Research & Funnel Setup',
      'Creative Strategy & Ad Copywriting',
      'Conversion Rate Optimization (CRO)',
      'Recursive A/B Testing & Scaling'
    ],
    color: 'bg-accent-600',
    lightColor: 'bg-accent-50',
    textColor: 'text-accent-600'
  },
  {
    id: 'seo',
    icon: <Search size={32} />,
    image: localSeoImg,
    title: 'SEO Optimization',
    tagline: 'Dominate search results globally and locally.',
    desc: 'Get found by your ideal customers. We optimize your website visibility and Google My Business profile to ensure you rank at the top for relevant keywords.',
    features: [
      'Technical SEO & Site Audits',
      'On-Page & Off-Page Optimization',
      'Local SEO & GMB Management',
      'Keyword Research & Content Strategy'
    ],
    color: 'bg-accent-600',
    lightColor: 'bg-accent-50',
    textColor: 'text-accent-600'
  },
  {
    id: 'branding',
    icon: <Palette size={32} />,
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80",
    title: 'Branding & Creative Designs',
    tagline: 'Transform your brand identity.',
    desc: 'We create visually stunning and strategically sound brand identities. From color palettes to typography, we ensure your brand tells a cohesive and compelling story.',
    features: [
      'Visual Identity & Brand Books',
      'Creative Content Production',
      'UI/UX Design Systems',
      'Market & Competitor Positioning'
    ],
    color: 'bg-accent-600',
    lightColor: 'bg-accent-50',
    textColor: 'text-accent-600'
  },
  {
    id: 'logo-design',
    icon: <Pentagon size={32} />,
    image: "https://images.unsplash.com/photo-1622737133809-d95047b9e673?auto=format&fit=crop&w=800&q=80",
    title: 'Logo Designing',
    desc: 'Crafting the perfect emblem for your business. We design logos that are memorable, versatile, and perfectly aligned with your brand\'s core values.',
    tagline: 'A mark of excellence for your business.',
    features: [
      'Custom Logo Concepts',
      'Versatile Vector Formats',
      'Color & Typography Packages',
      'Brand Mark & Iconography'
    ],
    color: 'bg-primary-600',
    lightColor: 'bg-primary-50',
    textColor: 'text-primary-600'
  }
];

const fallbackImages = [
  "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1622737133809-d95047b9e673?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
];

const Services = () => {
  const [index, setIndex] = useState(0);
  const [servicesData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/services');
        if (response.ok) {
          const data = await response.json();
          setServicesData(data);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const combinedServices = servicesData.length > 0 ? servicesData : detailedServices;

  useEffect(() => {
    const titles = combinedServices.map(s => s.title);
    if(titles.length === 0) return;
    
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [combinedServices]);

  const currentTitle = combinedServices.length > 0 ? combinedServices[index]?.title : serviceTitles[0];

  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <title>Our Services | Digital Marketing & Web Development</title>
        <meta name="description" content="Explore Prowork Tech's specialized digital growth services. From Meta Ads and Social Media Marketing to high-performance Web and App Development." />
      </Helmet>
      <section className="relative pt-32 pb-20 overflow-hidden bg-primary-750 text-center text-white">
        <div className="absolute inset-0 bg-grid-white/[0.05] -z-10"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-500/10 skew-x-12 translate-x-1/4"></div>
        <div className="container-custom relative z-10">
          <div className="relative w-full min-h-[220px] sm:min-h-[220px] md:min-h-[220px] flex items-center justify-center py-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute w-full flex flex-col items-center justify-center text-center px-4"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4 shadow-xl">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent-500 animate-pulse shadow-[0_0_10px_rgba(250,204,21,0.5)]"></span>
                  <span className="text-xs font-bold tracking-widest text-primary-50 uppercase">Premium Solutions</span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-accent-700 mb-5 drop-shadow-md leading-[1.1] max-w-5xl">
                  {currentTitle}
                </h1>

                <p className="text-primary-100/90 text-base md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                  We provide high-impact, specialized digital growth strategies crafted for the unique market of Prayagraj.
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Detailed Services Sections */}
      <section className="section-padding">
        <div className="container-custom">
          {loading ? (
             <div className="flex justify-center items-center py-20">
               <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
             </div>
          ) : (
            <div className="space-y-24 md:space-y-32">
              {combinedServices.map((service, idx) => {
                // If the service is from backend, map its fields to our detailed UI
                const isDynamic = !!service._id;
                
                // Color classes parsing
                const bgColor = service.color ? service.color.split(' ')[0] : 'bg-primary-50';
                const textColor = service.color ? service.color.split(' ')[1] : 'text-primary-600';
                const buttonBg = bgColor.replace('-50', '-600');

                // Image fallback
                const imageSrc = isDynamic 
                  ? fallbackImages[idx % fallbackImages.length] 
                  : service.image;

                // Render dynamic icons safely
                const renderIcon = () => {
                  if(!isDynamic) return service.icon;
                  if (typeof service.icon === "string" && service.icon.startsWith("http")) {
                      return <img src={service.icon} alt={service.title} className="w-8 h-8 object-contain" />;
                  }
                  // Fallback for missing literal icon
                  return <Pentagon size={32} />;
                };

                return (
                  <motion.div
                    key={service._id || idx}
                    id={service.id || `service-${idx}`}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
                  >
                    <div className={idx % 2 !== 0 ? 'lg:order-2' : ''}>
                      <div className={`w-16 h-16 rounded-2xl ${bgColor} ${textColor} flex items-center justify-center mb-8 border border-primary-100/50 shadow-sm`}>
                        {renderIcon()}
                      </div>
                      <h2 className="heading-md mb-4 text-[var(--color-text-primary)]">{service.title}</h2>
                      {service.tagline && <p className={`text-lg font-bold ${textColor} mb-6`}>{service.tagline}</p>}
                      <p className="text-[var(--color-text-secondary)] text-lg mb-8 leading-relaxed">
                        {service.desc}
                      </p>
                      
                      {service.features && service.features.length > 0 && (
                        <div className="grid sm:grid-cols-2 gap-4">
                          {service.features.map((feature, fIdx) => (
                            <div key={fIdx} className="flex items-center gap-3 text-primary-700 font-medium">
                              <CheckCircle2 className={`${textColor} flex-shrink-0`} size={20} />
                              {feature}
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="mt-8">
                        <Link 
                          to="/contact" 
                          state={{ service: service.title }}
                          className={`inline-flex items-center gap-2 px-8 py-3 rounded-xl shadow-lg font-bold text-white transition-all duration-300 transform hover:-translate-y-1 ${buttonBg || 'bg-primary-600'} hover:shadow-xl hover:opacity-90`}
                        >
                          Book Service
                        </Link>
                      </div>
                    </div>

                    <div className={`relative ${idx % 2 !== 0 ? 'lg:order-1' : ''}`}>
                      <div className={`absolute -inset-10 ${bgColor} rounded-full -z-10 blur-3xl opacity-40`}></div>
                      <motion.div
                        whileHover={{ y: -10 }}
                        className="relative z-10"
                      >
                        <img
                          src={imageSrc}
                          alt={service.title}
                          className="w-full h-auto drop-shadow-2xl rounded-2xl object-cover"
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Summary Grid */}
      <div className="bg-primary-50/20 border-y border-primary-50">
        <ServicesModule />
      </div>

      <CTA />
    </div>
  );
};

export default Services;



