import React from 'react';
import ContactModule from '../components/Contact';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="bg-slate-50">
      <section className="relative pt-32 pb-20 overflow-hidden bg-primary-750">
        <div className="absolute inset-0 bg-grid-white/[0.05] -z-10"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-500/10 skew-x-12 translate-x-1/4"></div>
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Get in <span className="text-accent-500">Touch</span>
            </h1>
            <p className="text-primary-100/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Have a project in mind? Let's discuss how we can help you grow.
            </p>
          </motion.div>
        </div>
      </section>
      <ContactModule />
    </div>
  );
};

export default Contact;

