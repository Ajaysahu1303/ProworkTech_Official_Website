import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Share2, 
  BarChart3, 
  Smartphone,
  Palette,
  Pentagon,
  ArrowRight,
  Zap,
  Shield,
  Search
} from 'lucide-react';

const services = [
  {
    icon: <Globe className="w-8 h-8" />,
    title: 'Website Development',
    desc: 'Custom, responsive, and fast websites built with modern tools like React and Next.js to scale your business.',
    color: 'bg-primary-50 text-primary-600',
    link: '/services#web-dev'
  },
  {
    icon: <Smartphone className="w-8 h-8" />,
    title: 'App Development',
    desc: 'High-performance mobile and desktop applications designed for seamless user experiences.',
    color: 'bg-primary-50 text-primary-600',
    link: '/services#app-dev'
  },
  {
    icon: <Share2 className="w-8 h-8" />,
    title: 'Social Media Marketing',
    desc: 'Build a community and spark conversations with data-driven social media strategies.',
    color: 'bg-primary-50 text-primary-600',
    link: '/services#social-media'
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: 'Meta Ads',
    desc: 'Maximize ROI with expert Meta and Facebook Ads management focused on high-converting creative directions.',
    color: 'bg-accent-50 text-accent-600',
    link: '/services#meta-ads'
  },
  {
    icon: <Search className="w-8 h-8" />,
    title: 'SEO Optimization',
    desc: 'Dominate search results and drive organic traffic with our comprehensive SEO and GMB management.',
    color: 'bg-accent-50 text-accent-600',
    link: '/services#seo'
  },
  {
    icon: <Palette className="w-8 h-8" />,
    title: 'Branding & Creative Designs',
    desc: 'Craft a unique visual identity and creative assets that resonate with your target audience.',
    color: 'bg-accent-50 text-accent-600',
    link: '/services#branding'
  },
  {
    icon: <Pentagon className="w-8 h-8" />,
    title: 'Logo Designing',
    desc: 'Professional logo design that captures your brand essence and stands out in the market.',
    color: 'bg-primary-50 text-primary-600',
    link: '/services#logo-design'
  }
];

const Services = ({ showMoreButton = false, limit }) => {
  const displayedServices = limit ? services.slice(0, limit) : services;

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-slate-50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="heading-lg mb-6"
          >
            Solutions for the <span className="text-gradient">Modern Enterprise</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-[var(--color-text-secondary)]"
          >
            We provide end-to-end digital solutions to help your business thrive in the modern online ecosystem.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedServices.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card p-8 flex flex-col group"
            >
              <div className={`w-16 h-16 rounded-2xl ${service.color} flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                {service.icon}
              </div>
              
              <h3 className="text-xl font-bold mb-4 text-[var(--color-text-primary)]">{service.title}</h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed mb-8 flex-grow">
                {service.desc}
              </p>
              
              <div className="mt-auto flex items-center justify-between pt-4">
                <Link 
                  to={service.link} 
                  className="inline-flex items-center gap-2 font-bold text-primary-600 transition-colors hover:text-primary-700"
                >
                  Learn More 
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link 
                  to="/contact" 
                  state={{ service: service.title }}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg font-bold text-sm hover:bg-primary-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Book Service
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {showMoreButton && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Link to="/services" className="btn-outline gap-2 group">
              View All Services
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Services;


