import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-10 md:py-16 relative overflow-hidden">
      <div className="container-custom">
        <div className="relative rounded-3xl bg-primary-800 px-6 py-10 md:px-12 md:py-12 overflow-hidden shadow-2xl">
          {/* Background graphics */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-600/10 skew-x-12 translate-x-1/4"></div>
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent-500 rounded-full blur-[100px]"
          />

          <div className="relative z-10 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-bold mb-4 uppercase tracking-wider">
                <Sparkles size={14} />
                Get started today
              </div>

              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                Ready to make your brand a <span className="text-accent-500">Local Legend?</span>
              </h2>

              <p className="text-primary-100/60 text-lg mb-8 leading-relaxed">
                Join the rising brands in Prayagraj that are scaling their digital presence with our specialized, high-impact strategies.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="btn bg-white text-primary-900 hover:bg-primary-50 px-8 py-3.5 text-lg font-bold shadow-xl shadow-white/5 rounded-xl transition-all active:scale-95"
                >
                  Scale My Brand
                </Link>
                <Link
                  to="/services"
                  className="btn-outline border-primary-700 text-white hover:bg-primary-800 px-8 py-3.5 text-lg rounded-xl"
                >
                  Explore Solutions
                </Link>
              </div>

              <div className="mt-8 flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-primary-900 overflow-hidden ring-2 ring-primary-800">
                      <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <p className="text-sm font-medium text-primary-100/60">
                  <span className="text-white">Trusted by</span> local industry leaders
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
