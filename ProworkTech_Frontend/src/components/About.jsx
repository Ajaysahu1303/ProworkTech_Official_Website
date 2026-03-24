import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, TrendingUp, Users, Target } from 'lucide-react';

const About = () => {
  // const stats = [
  //   { label: 'Projects Delivered', value: '100+', icon: <Target className="w-5 h-5" />, color: 'bg-primary-50 text-primary-600' },
  //   { label: 'Ad Spend Managed', value: '$50M+', icon: <TrendingUp className="w-5 h-5" />, color: 'bg-accent-50 text-accent-600' },
  //   { label: 'Happy Clients', value: '250+', icon: <Users className="w-5 h-5" />, color: 'bg-primary-50 text-primary-600' },
  // ];

  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Visual Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-6 relative z-10">
              <div className="space-y-6 pt-12">
                <div className="card p-8 bg-primary-500 border-none shadow-xl shadow-primary-600/10">
                  <h3 className="text-4xl font-extrabold text-white mb-2">6+</h3>
                  <p className="text-white text-sm font-bold uppercase tracking-wide">Premium Brands Scaled</p>
                </div>
                <div className="card p-8 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-accent-50 text-accent-600 flex items-center justify-center mb-4">
                      <TrendingUp size={24} />
                    </div>
                    <h4 className="text-xl font-bold text-primary-900 mb-2">Local Mastery</h4>
                    <p className="text-primary-800 text-sm font-medium leading-relaxed">Deep understanding of Prayagraj's consumer psychology.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="card p-8 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-4">
                      <Users size={24} />
                    </div>
                    <h4 className="text-xl font-bold text-primary-900 mb-2">Digital Marketing Service</h4>
                    <p className="text-primary-800 text-sm font-medium leading-relaxed">Personalized attention that big agencies can't provide.</p>
                  </div>
                </div>
                <div className="card p-8 bg-primary-700 border-none shadow-xl shadow-primary-700/20">
                  <h3 className="text-4xl font-extrabold text-white mb-2">100%</h3>
                  <p className="text-white/70 text-xs font-black uppercase tracking-widest">Client Retention</p>
                </div>
              </div>
            </div>
            {/* Decorative background circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary-50/50 rounded-full -z-10"></div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-primary-600 text-xs font-bold mb-6 uppercase tracking-wider">
              About Prowork Tech
            </div>
            <h2 className="heading-lg mb-8 leading-tight">
              Scaling Prayagraj's <span className="text-gradient">NexGen Brands</span>
            </h2>

            <p className="text-lg text-[var(--color-text-secondary)] mb-6 leading-relaxed">
              Based in Prayagraj, we are an agile team of digital architects and marketing specialists. We don't believe in generic "mass-marketing." Instead, we focus on a select group of premium partners to ensure every strategy is executed with 100% precision.
            </p>

            <p className="text-lg text-[var(--color-text-secondary)] mb-8 leading-relaxed">
              From high-performance web engineering to aggressive social media scaling, we are here to ensure that your local brand becomes a household name.
            </p>

            <div className="space-y-4 mb-10">
              {[
                'Data-Driven Growth Strategies',
                'Innovative Engineering Solutions',
                'Transparent ROI & Reporting'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 font-semibold text-[var(--color-text-primary)]">
                  <CheckCircle2 size={24} className="text-primary-600" />
                  {item}
                </div>
              ))}
            </div>

            <Link to="/about" className="btn-primary px-8 py-4">
              Learn More About Us
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;

