import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Globe, 
  Smartphone, 
  Share2, 
  BarChart3, 
  Search, 
  Palette, 
  Pentagon,
  ArrowRight
} from 'lucide-react';

const iconMap = {
  'Globe': <Globe size={32} />,
  'Smartphone': <Smartphone size={32} />,
  'Share2': <Share2 size={32} />,
  'BarChart3': <BarChart3 size={32} />,
  'Search': <Search size={32} />,
  'Palette': <Palette size={32} />,
  'Pentagon': <Pentagon size={32} />
};

const staticServices = [
  {
    _id: '1',
    title: 'Website Development',
    desc: 'High-performance React/Next.js Apps with mobile-first design.',
    icon: 'Globe',
    color: 'bg-primary-50 text-primary-600',
    link: '/services#web-dev'
  },
  {
    _id: '2',
    title: 'App Development',
    desc: 'Native iOS & Android development with React Native or Flutter.',
    icon: 'Smartphone',
    color: 'bg-primary-50 text-primary-600',
    link: '/services#app-dev'
  },
  {
    _id: '3',
    title: 'Social Media Marketing',
    desc: 'Build a community through strategic content and engagement.',
    icon: 'Share2',
    color: 'bg-primary-50 text-primary-600',
    link: '/services#social-media'
  },
  {
    _id: '4',
    title: 'Meta Ads',
    desc: 'Scale faster with data-driven Meta and Facebook ads management.',
    icon: 'BarChart3',
    color: 'bg-accent-50 text-accent-600',
    link: '/services#meta-ads'
  },
  {
    _id: '5',
    title: 'SEO Optimization',
    desc: 'Technical SEO and keyword research to dominate search results.',
    icon: 'Search',
    color: 'bg-accent-50 text-accent-600',
    link: '/services#seo'
  },
  {
    _id: '6',
    title: 'Branding & Creative Designs',
    desc: 'Transform your brand identity with visual excellence.',
    icon: 'Palette',
    color: 'bg-accent-50 text-accent-600',
    link: '/services#branding'
  },
  {
    _id: '7',
    title: 'Logo Designing',
    desc: 'Crafting the perfect emblem that represents your business values.',
    icon: 'Pentagon',
    color: 'bg-primary-50 text-primary-600',
    link: '/services#logo-design'
  }
];

const Services = ({ limit, showMoreButton = false }) => {
  const [dynamicServices, setDynamicServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/services');
        if (response.ok) {
          const data = await response.json();
          // Filter out defaults if we have enough dynamic data to avoid duplication 
          // (or just use dynamic ones if they exist)
          setDynamicServices(data);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // Combine static and dynamic services, prioritizing dynamic ones
  // If we have dynamic services, we might want to use them only or merge them.
  // In many cases, we want to see what's in the DB first.
  const displayServices = dynamicServices.length > 0 ? dynamicServices : staticServices;
  const limitedServices = limit ? displayServices.slice(0, limit) : displayServices;

  return (
    <section className="section-padding bg-slate-50/50" id="services">
      <div className="container-custom">
        {!limit && (
           <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="heading-lg mb-6"
            >
              Our Specialized <span className="text-gradient">Services</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-slate-600"
            >
              We provide high-impact, specialized digital growth strategies crafted for the unique market of Prayagraj.
            </motion.p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {limitedServices.map((service, index) => (
            <motion.div
              key={service._id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="card h-full p-8 border border-slate-100 hover:border-primary-100 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-600/5 group-hover:-translate-y-1">
                <div className={`w-14 h-14 overflow-hidden rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${service.color || 'bg-primary-50 text-primary-600'}`}>
                  {typeof service.icon === 'string' ? (
                      service.icon.startsWith('http') || service.icon.startsWith('/') 
                      ? <img src={service.icon} alt={service.title} className="w-8 h-8 object-contain" /> 
                      : (iconMap[service.icon] || <Pentagon />)
                  ) : service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h3>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  {service.desc}
                </p>
                <Link 
                  to={service.link || '/services'} 
                  className="inline-flex items-center gap-2 text-primary-600 font-bold group"
                >
                  Learn More 
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {showMoreButton && (
          <div className="mt-16 text-center">
            <Link to="/services" className="btn-primary inline-flex items-center gap-2">
              Explore All Services <ArrowRight size={20} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;