import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Instagram, Facebook, LayoutTemplate, Film } from 'lucide-react';
import CTA from '../components/CTA';
import myReel1 from '../assets/Demo/Trendzilla_1.mp4';
import myReel2 from '../assets/Demo/Krave_1.mp4';
import myReel3 from '../assets/Demo/Pawan_1.mp4';
import myReel4 from '../assets/Demo/Trendzilla_2.mp4';

const reelsData = [
  {
    id: 1,
    videoSrc: myReel1,
    views: "1.2M"
  },
  {
    id: 2,
    videoSrc: myReel2,
    views: "1.3M"
  },
  {
    id: 3,
    videoSrc: myReel3,
    views: "1.4M"
  },
  {
    id: 4,
    videoSrc: myReel4,
    views: "1.5M"
  }
];

const ReelCard = ({ reel, isActive, onPlay }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play().catch(e => console.log("Play error:", e));
    } else if (!isActive && videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.pause();
    }
  }, [isActive]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative aspect-[9/16] bg-black rounded-3xl overflow-hidden group shadow-2xl shadow-primary-900/20"
    >
      {reel.videoSrc ? (
        <video
          ref={videoRef}
          src={reel.videoSrc}
          className={`w-full h-full opacity-100 transition-transform duration-700 ${!isActive ? 'object-cover group-hover:scale-105' : 'object-contain bg-black'}`}
          loop
          playsInline
          controls={isActive}
          controlsList="nodownload"
        />
      ) : (
        <div className="w-full h-full bg-primary-900 border-2 border-primary-800 flex flex-col items-center justify-center p-4">
          <Film size={40} className="mb-3 text-accent-500 opacity-60" />
          <p className="text-primary-100/50 text-xs font-bold text-center leading-relaxed">
            Add video in <br /> src/assets/Reels/
          </p>
        </div>
      )}

      {/* Play Button Overlay - Only visible when NOT playing */}
      {!isActive && (
        <div
          onClick={() => onPlay(reel.id)}
          className="absolute inset-0 z-10 cursor-pointer bg-primary-900/10 group-hover:bg-primary-900/40 transition-colors flex items-center justify-center"
        >
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform shadow-xl pointer-events-none">
            <Play className="text-white fill-white ml-1" size={28} />
          </div>
        </div>
      )}

      {!isActive && (
        <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-white text-xs font-bold drop-shadow-md pointer-events-none">
          <div className="flex items-center gap-1.5 bg-primary-900/60 backdrop-blur-sm px-2.5 py-1.5 rounded-lg">
            <Film size={14} className="text-accent-400" /> <span>{reel.views}</span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

const demoTitles = [
  "Our Portfolio & Demos",
  "High-Converting Reels",
  "Digital Success Stories",
  "Aesthetic Social Feeds"
];

const Demo = () => {
  const [activeReel, setActiveReel] = useState(null);
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prevIndex) => (prevIndex + 1) % demoTitles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Page Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-primary-750">
        <div className="absolute inset-0 bg-grid-white/[0.05] -z-10"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-500/10 skew-x-12 translate-x-1/4"></div>
        <div className="container-custom relative z-10 text-center">
          <div className="relative w-full min-h-[220px] md:min-h-[250px] flex flex-col items-center justify-center py-6">
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
                  <span className="text-xs font-bold tracking-widest text-primary-50 uppercase">Explore Our Work</span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-accent-700 mb-5 drop-shadow-md leading-[1.1] max-w-5xl">
                  {demoTitles[heroIndex]}
                </h1>
                <p className="text-primary-100/90 text-base md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                  Explore the digital success stories we've crafted. From aesthetic social feeds to high-converting reels.
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Brands Social Media Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="heading-lg mb-4 text-primary-900">Brand Social Pages</h2>
            <p className="text-primary-700/70 text-lg">
              Check out the vibrant social presence we've built and managed for Prayagraj's rising brands.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Dummy Brands Data */}
            {[
              { name: "Urban Cafe", category: "F&B", color: "bg-accent-100 text-accent-700", follower: "12K", img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80" },
              { name: "FitLife Gym", category: "Fitness", color: "bg-primary-100 text-primary-700", follower: "25K", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80" },
              { name: "Luxe Apparel", category: "Fashion", color: "bg-slate-200 text-slate-700", follower: "8.5K", img: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e08?auto=format&fit=crop&w=800&q=80" }
            ].map((brand, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card group overflow-hidden bg-white shadow-xl shadow-primary-900/5 border border-primary-100/50 rounded-3xl"
              >
                <div className="h-56 overflow-hidden relative">
                  <img src={brand.img} alt={brand.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full ${brand.color}`}>{brand.category}</span>
                    <div className="flex gap-2 text-white">
                      <Instagram size={20} className="hover:text-accent-500 cursor-pointer transition-colors" />
                      <Facebook size={20} className="hover:text-accent-500 cursor-pointer transition-colors" />
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-primary-900 mb-3">{brand.name}</h3>
                  <p className="text-primary-700/70 font-medium text-sm leading-relaxed mb-6">Managed Social Media growing to {brand.follower} followers with highly engaging custom content and continuous strategy optimization.</p>

                  <button className="w-full py-4 rounded-xl border-2 border-primary-100 text-primary-800 font-bold hover:bg-primary-50 transition-colors flex justify-center items-center gap-2 group-hover:border-primary-200">
                    <LayoutTemplate size={18} /> View Feed
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reels Section */}
      <section className="section-padding bg-primary-50 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-1/3 bg-accent-500/10 blur-[100px] rounded-full -z-10"></div>
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="heading-lg mb-4 text-primary-900">High-Converting Reels</h2>
            <p className="text-primary-700/70 text-lg">
              Short-form video content shot, edited, and scaled to reach millions of impressions organically.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {reelsData.map((reel) => (
              <ReelCard
                key={reel.id}
                reel={reel}
                isActive={activeReel === reel.id}
                onPlay={setActiveReel}
              />
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
};

export default Demo;
