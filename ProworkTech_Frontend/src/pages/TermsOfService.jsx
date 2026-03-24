import React from 'react';
import { motion } from 'framer-motion';
import CTA from '../components/CTA';
import { FileText } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-xl">
                <FileText className="text-accent-500" size={16} />
                <span className="text-xs font-bold tracking-widest text-primary-50 uppercase">Legal Terms</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight drop-shadow-md">
                Terms of <span className="text-accent-500">Service</span>
              </h1>
              <p className="text-primary-100/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                Please read these terms carefully before using our services.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-primary-900/5 border border-primary-100/50 prose prose-lg prose-primary max-w-none"
          >
            <h2 className="text-2xl font-bold text-primary-900 mb-4 mt-0">1. Agreement to Terms</h2>
            <p className="text-primary-700/80 mb-8 leading-relaxed">
              By accessing our website, you agree to be bound by these Terms of Service and to comply with all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>

            <h2 className="text-2xl font-bold text-primary-900 mb-4">2. Intellectual Property Rights</h2>
            <p className="text-primary-700/80 mb-8 leading-relaxed">
              Unless otherwise indicated, the Site and our services are our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site are owned or controlled by us.
            </p>

            <h2 className="text-2xl font-bold text-primary-900 mb-4">3. User Representations</h2>
            <p className="text-primary-700/80 mb-8 leading-relaxed">
              By using the Site, you represent and warrant that: all registration information you submit will be true, accurate, current, and complete; you will maintain the accuracy of such information and promptly update such registration information as necessary.
            </p>

            <h2 className="text-2xl font-bold text-primary-900 mb-4">4. Prohibited Activities</h2>
            <p className="text-primary-700/80 mb-8 leading-relaxed">
              You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
            </p>

            <h2 className="text-2xl font-bold text-primary-900 mb-4">5. Modifications and Interruptions</h2>
            <p className="text-primary-700/80 mb-8 leading-relaxed">
              We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Site.
            </p>

            <h2 className="text-2xl font-bold text-primary-900 mb-4">6. Governing Law & Jurisdiction</h2>
            <p className="text-primary-700/80 leading-relaxed">
              These Terms of Service and any separate agreements whereby we provide you services shall be governed by and construed in accordance with the laws of India. Any legal suits, actions, or proceedings arising out of, or relating to, these terms shall be instituted exclusively in the <strong>Hon'ble High Court of Judicature at Allahabad (Prayagraj)</strong>, and you irrevocably submit to the exclusive jurisdiction of such courts in any such suit, action, or proceeding.
            </p>
          </motion.div>
        </div>
      </section>

      <CTA />
    </div>
  );
};

export default TermsOfService;
