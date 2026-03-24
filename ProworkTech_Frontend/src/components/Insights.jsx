import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const newsItems = [
  {
    category: "Strategy",
    date: "March 15, 2024",
    title: "How Meta Ads are evolving in 2024 for small businesses",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80"
  },
  {
    category: "Development",
    date: "March 12, 2024",
    title: "Why Next.js is becoming the standard for modern web apps",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80"
  },
  {
    category: "Marketing",
    date: "March 10, 2024",
    title: "Optimizing your GMB profile for local visibility",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=400&q=80"
  }
];

const Insights = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="heading-lg mb-4 text-[var(--color-text-primary)]">Digital <span className="text-gradient">Insights</span> & Case Studies</h2>
            <p className="text-[var(--color-text-secondary)]">The latest growth strategies and local success stories from our boutique lab.</p>
          </div>
          <Link to="/services" className="btn-outline gap-2 group whitespace-nowrap">
            View All Insights
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-video rounded-3xl overflow-hidden mb-6 shadow-lg border border-primary-50">
                <img 
                   src={item.image} 
                   alt={item.title} 
                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-primary-700 text-xs font-bold uppercase tracking-widest shadow-sm">
                    {item.category}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-primary-500 text-sm mb-4">
                <Calendar size={16} />
                <span>{item.date}</span>
                <span className="mx-2">•</span>
                <div className="flex items-center gap-1">
                  <BookOpen size={16} />
                  <span>5 min read</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-4 group-hover:text-primary-600 transition-colors leading-snug">
                {item.title}
              </h3>
              
              <div className="flex items-center gap-2 font-bold text-primary-600 transition-colors group-hover:gap-3">
                Explore Case Study
                <ArrowRight size={18} />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Insights;
