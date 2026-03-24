import React from 'react';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Ghost } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full">
        {/* Animated Ghost Icon */}
        <motion.div
           animate={{ 
             y: [0, -20, 0],
             rotate: [0, 5, -5, 0] 
           }}
           transition={{ 
             duration: 4, 
             repeat: Infinity, 
             ease: "easeInOut" 
           }}
           className="inline-flex items-center justify-center mb-8"
        >
          <div className="w-32 h-32 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 shadow-xl shadow-primary-600/10 border border-primary-100">
            <Ghost size={64} strokeWidth={1.5} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-8xl font-black text-slate-900 mb-2">404</h1>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Page Not Found</h2>
          <p className="text-slate-500 mb-10 leading-relaxed">
            Oops! The page you're looking for seems to have vanished into the digital void. Let's get you back on track.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/" className="btn-primary gap-2 px-8 py-3">
            <Home size={18} />
            Back to Home
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="btn-outline gap-2 px-8 py-3"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </motion.div>

        <div className="mt-16 pt-12 border-t border-slate-200">
          <p className="text-sm text-slate-400 font-medium">
            Lost? <Link to="/contact" className="text-primary-600 hover:underline">Contact our tech support</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
