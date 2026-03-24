import React from 'react';
import { motion } from 'framer-motion';
import CTA from '../components/CTA';
import { ShieldCheck } from 'lucide-react';

const PrivacyPolicy = () => {
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
                <ShieldCheck className="text-accent-500" size={16} />
                <span className="text-xs font-bold tracking-widest text-primary-50 uppercase">Legal</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight drop-shadow-md">
                Privacy <span className="text-accent-500">Policy</span>
              </h1>
              <p className="text-primary-100/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                We are committed to protecting your personal information and your right to privacy.
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
            <h2 className="text-2xl font-bold text-primary-900 mb-4 mt-0">1. Information We Collect</h2>
            <p className="text-primary-700/80 mb-8 leading-relaxed">
              We collect personal information that you voluntarily provide to us when you register on the Website, express an interest in obtaining information about us or our products and services, when you participate in activities on the Website, or otherwise when you contact us.
            </p>

            <h2 className="text-2xl font-bold text-primary-900 mb-4">2. How We Use Your Information</h2>
            <p className="text-primary-700/80 mb-8 leading-relaxed">
              We process your information for purposes based on legitimate business interests, the fulfillment of our contract with you, compliance with our legal obligations, and/or your consent.
            </p>

            <h2 className="text-2xl font-bold text-primary-900 mb-4">3. Will Your Information Be Shared?</h2>
            <p className="text-primary-700/80 mb-8 leading-relaxed">
              We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
            </p>

            <h2 className="text-2xl font-bold text-primary-900 mb-4">4. How Long Do We Keep Your Information?</h2>
            <p className="text-primary-700/80 mb-8 leading-relaxed">
              We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law.
            </p>

            <h2 className="text-2xl font-bold text-primary-900 mb-4">5. Contact Us</h2>
            <p className="text-primary-700/80 mb-8 leading-relaxed">
              If you have questions or comments about this notice, you may email us or contact us through our website's contact form.
            </p>

            <h2 className="text-2xl font-bold text-primary-900 mb-4">6. Governing Law & Jurisdiction</h2>
            <p className="text-primary-700/80 leading-relaxed">
              Any dispute, controversy, or claim arising out of or relating to this Privacy Policy, or the breach thereof, shall be governed by the laws of India and subject to the exclusive jurisdiction of the <strong>Hon'ble High Court of Judicature at Allahabad (Prayagraj)</strong>.
            </p>
          </motion.div>
        </div>
      </section>

      <CTA />
    </div>
  );
};

export default PrivacyPolicy;
