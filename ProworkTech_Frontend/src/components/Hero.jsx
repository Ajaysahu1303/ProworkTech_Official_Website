import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-28 pb-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 bg-grid-slate-100 opacity-50"></div>
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent-500/10 rounded-full blur-[120px] -z-10"></div>

      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl px-4 lg:px-0"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-sm font-semibold mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
              </span>
              Prayagraj's Businesses Digital Partner
            </div>

            <h1 className="heading-xl mb-6">
              Empowering <span className="text-gradient">Local Brands</span> to Scale Globally
            </h1>

            <p className="text-lg text-[var(--color-text-secondary)] mb-10 leading-relaxed">
              We provide high-performance tech and marketing strategies specifically
              crafted for rising startups and established brands in Prayagraj.
            </p>


            <div className="flex flex-wrap gap-4 mb-12">
              <Link to="/contact" className="btn-primary gap-2 group">
                Get Started Free
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/demo" className="btn-outline gap-2 group">
                <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center transition-colors group-hover:bg-primary-100">
                  <Play size={14} className="text-primary-600 group-hover:text-primary-700 fill-current" />
                </div>
                Watch Demo
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {[
                'Smart Tasking',
                'AI-Driven Insights',
                'Secure & Fast'
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-primary)]">
                  <CheckCircle2 size={18} className="text-accent-500" />
                  {feature}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative px-4"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white/50 ring-1 ring-slate-200">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="AI Dashboard Preview"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/20 to-transparent"></div>
            </div>

            {/* Floating stats card */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 glass-card p-6 max-w-[200px] hidden md:block z-20"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-accent-500 flex items-center justify-center text-white">
                  <ArrowRight size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Growth</p>
                  <p className="text-xl font-bold text-slate-900">+124%</p>
                </div>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-accent-500 h-full w-[75%] rounded-full"></div>
              </div>
            </motion.div>

            {/* Another decorative element */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-600/10 rounded-3xl -rotate-12 -z-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
