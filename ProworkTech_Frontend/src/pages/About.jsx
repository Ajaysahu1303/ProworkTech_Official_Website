import React, { useState, useEffect } from 'react';
import AboutModule from '../components/About';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Users, Zap, Shield, Rocket, Heart, CheckCircle2 } from 'lucide-react';
import CTA from '../components/CTA';
import { Link } from 'react-router-dom';

const values = [
  {
    icon: <Users className="text-primary-600" />,
    title: "Client-Centric",
    desc: "Your growth is our North Star. We align every strategy with your unique business objectives."
  },
  {
    icon: <Zap className="text-accent-600" />,
    title: "Agile Execution",
    desc: "The digital world moves fast. We pivot quickly and execute with precision to stay ahead."
  },
  {
    icon: <Shield className="text-primary-600" />,
    title: "Transparency",
    desc: "No jargon, no hidden fees. Just clear reporting and honest communication every step of the way."
  },
  {
    icon: <Rocket className="text-accent-600" />,
    title: "Data-Driven",
    desc: "We don't guess. We analyze, optimize, and scale based on hard data and performance analytics."
  }
];

const aboutTitles = [
  "Building Prayagraj's Digital Future",
  "Transforming Startups to Leaders",
  "Data-Driven Growth Strategies",
  "Your Agile Digital Partner"
];

const About = () => {
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prevIndex) => (prevIndex + 1) % aboutTitles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Page Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-primary-750 text-white">
        <div className="absolute inset-0 bg-grid-white/[0.05] -z-10"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-500/10 skew-x-12 translate-x-1/4"></div>

        <div className="container-custom relative z-10 text-center">
          <div className="relative w-full min-h-[220px] md:min-h-[220px] flex flex-col items-center justify-center py-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={heroIndex}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute w-full flex flex-col items-center justify-center text-center px-4"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4 shadow-xl">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent-500 animate-pulse shadow-[0_0_10px_rgba(250,204,21,0.5)]"></span>
                  <span className="text-xs font-bold tracking-widest text-primary-50 uppercase">About Prowork Tech</span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-accent-700 mb-5 drop-shadow-md leading-[1.1] max-w-5xl">
                  {aboutTitles[heroIndex]}
                </h1>
                <p className="text-primary-100/90 text-base md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                  We are a Digital & Social Media Marketing company dedicated to transforming local startups into brand leaders through tech and high-performance strategy.
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Summary Module */}
      <AboutModule />

      {/* Mission & Vision */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center flex-shrink-0 border border-primary-100/50">
                  <Target className="text-primary-600" size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary-900 mb-3">Our Mission</h3>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed text-lg">
                    To empower local brands in Prayagraj with agile digital solutions that drive measurable scale. We believe selectivity is our strength—focusing only on partners we know we can grow.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-2xl bg-accent-50 flex items-center justify-center flex-shrink-0 border border-accent-100/50">
                  <Heart className="text-accent-600" size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary-900 mb-3">Our Vision</h3>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed text-lg">
                    To become the synonym for high-growth digital partnership in the region, known for our integrity, innovative tech stack, and zero-compromise results.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-primary-50">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                  alt="Team collaboration"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent-500 rounded-3xl -z-10 opacity-20"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-primary-50/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Our Core Values</h2>
            <p className="text-primary-600 font-medium">The boutique principles that guide our every step.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="card p-8 group bg-white border-primary-50 hover:border-primary-200 transition-all shadow-sm"
              >
                <div className="w-12 h-12 mb-6 group-hover:scale-110 transition-transform">
                  {v.icon}
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-4">{v.title}</h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTA />
    </div>
  );
};

export default About;



