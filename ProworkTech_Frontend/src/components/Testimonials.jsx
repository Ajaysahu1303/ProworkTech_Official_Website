import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const Testimonials = () => {
  const reviews = [
    {
      name: "Rahul Sharma",
      role: "E-commerce Founder",
      text: "Prowork Tech completely turned around our Meta Ads. Our CPA dropped by 40% in the first month and we scaled our GMV faster than we anticipated.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?u=1"
    },
    {
      name: "Aarti Desai",
      role: "Local Business Owner",
      text: "Our local foot traffic doubled after they took over our GMB management and local SEO. They act fast and communicate clearly.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?u=2"
    },
    {
      name: "Vikram Singh",
      role: "Tech Startup CEO",
      text: "The web development team at Prowork Tech built our landing page from scratch. It's blazing fast, mobile-friendly, and perfectly aligned with our branding.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?u=3"
    }
  ];

  return (
    <section className="section-padding bg-primary-50/30 relative overflow-hidden">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="heading-lg mb-6"
          >
            Insights from Our <span className="text-gradient">Local Partners</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-[var(--color-text-secondary)]"
          >
            We measure our success strictly by the growth of Prayagraj's rising brands.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card p-8 flex flex-col bg-white"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-accent-500 text-accent-500" />
                ))}
              </div>
              
              <p className="text-[var(--color-text-secondary)] leading-relaxed mb-8 italic flex-grow">
                "{review.text}"
              </p>
              
              <div className="flex items-center gap-4 pt-6 border-t border-primary-50">
                <img 
                  src={review.avatar} 
                  alt={review.name} 
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-500/10"
                />
                <div>
                  <h4 className="font-bold text-[var(--color-text-primary)]">{review.name}</h4>
                  <p className="text-sm text-primary-600">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

