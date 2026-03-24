import React from 'react';
import TeamModule from '../components/Team';
import CTA from '../components/CTA';
import { motion } from 'framer-motion';

const Team = () => {
  return (
    <div className="bg-white">
      {/* Page Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-primary-750 shadow-inner">
        <div className="absolute inset-0 bg-grid-white/[0.05] -z-10"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-500/10 skew-x-12 translate-x-1/4"></div>
        <div className="container-custom relative z-10">
          <div className="relative w-full min-h-[220px] sm:min-h-[220px] md:min-h-[220px] flex items-center justify-center py-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute w-full flex flex-col items-center justify-center text-center px-4"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight drop-shadow-md">
                Prayagraj's <span className="text-accent-500">Brightest Minds</span>
              </h1>
              <p className="text-primary-100/90 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium">
                We are a high-performance <span className="text-white font-bold">digital and social media marketing company</span> in Prayagraj.
                Our team of experts specializes in <span className="text-white font-bold">web and app software development</span>,
                turning complex business challenges into seamless digital success stories.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <TeamModule />
      <CTA />
    </div>
  );
};

export default Team;

