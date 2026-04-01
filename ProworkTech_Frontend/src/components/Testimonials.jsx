import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, Loader2, ChevronDown, ChevronUp, X, PenLine } from 'lucide-react';
import { Link } from 'react-router-dom';

const Testimonials = ({ hideViewMore = false }) => {
  const [reviewsData, setReviewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', role: '', text: '', rating: 5 });
  const [avatarFile, setAvatarFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/testimonials');
        if (response.ok) {
          const data = await response.json();
          setReviewsData(data);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('role', formData.role);
      data.append('text', formData.text);
      data.append('rating', formData.rating);
      if (avatarFile) data.append('avatarFile', avatarFile);

      const response = await fetch('http://localhost:5000/api/testimonials/submit', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        alert("Thank you! Your review has been submitted for moderation.");
        setIsModalOpen(false);
        setFormData({ name: '', role: '', text: '', rating: 5 });
        setAvatarFile(null);
        setPreviewUrl(null);
      } else {
        alert("Failed to submit review. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Network error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const staticReviews = [
    {
      name: "Rahul Sharma",
      role: "E-commerce Founder",
      text: "Prowork Tech completely turned around our Meta Ads. Our CPA dropped by 40% in the first month and we scaled our GMV faster than we anticipated.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?u=1"
    },
    {
      name: "Aarti Desai",
      role: "Local Business Owner",
      text: "Our local foot traffic doubled after they took over our GMB management and local SEO. They act fast and communicate clearly.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?u=2"
    },
    {
      name: "Vikram Singh",
      role: "Tech Startup CEO",
      text: "The web development team at Prowork Tech built our landing page from scratch. It's blazing fast, mobile-friendly, and perfectly aligned with our branding.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?u=3"
    }
  ];

  return (
    <section className="section-padding bg-primary-50/30 relative overflow-hidden">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="heading-lg mb-6"
          >
            Insights from Our <span className="text-gradient">Local Partners</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-[var(--color-text-secondary)] mb-6"
          >
            We measure our success strictly by the growth of Prayagraj's rising brands.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-bold shadow-lg shadow-primary-500/30 transition-all hover:scale-105 active:scale-95"
          >
            <PenLine size={20} /> Write a Review
          </motion.button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-primary-500" size={40} />
          </div>
        ) : (
          <>
            <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(hideViewMore ? [...staticReviews, ...reviewsData] : staticReviews).map((review, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (index % 3) * 0.1 }}
                  className="card p-8 flex flex-col bg-white"
                >
                  <div className="flex gap-1 mb-6">
                    {[...Array(Number(review.rating) || 5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-accent-500 text-accent-500" />
                    ))}
                  </div>

                  <p className="text-[var(--color-text-secondary)] leading-relaxed mb-8 italic grow">
                    "{review.text}"
                  </p>

                  <div className="flex items-center gap-4 pt-6 border-t border-primary-50">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-500/10"
                    />
                    <div>
                      <h4 className="font-bold text-[var(--color-text-primary)]">{review.name}</h4>
                      <p className="text-sm text-primary-600">{review.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {!hideViewMore && (
              <motion.div layout className="flex justify-center mt-12">
                <Link
                  to="/reviews"
                  className="flex items-center gap-2 px-8 py-4 bg-primary-50 hover:bg-primary-100 text-primary-700 rounded-full font-bold transition-all shadow-sm ring-1 ring-primary-200 hover:scale-105"
                >
                  View All Reviews & Feedback
                </Link>
              </motion.div>
            )}
          </>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl z-10">
              <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h2 className="text-2xl font-black text-slate-800">Share Your Experience</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 bg-white p-2 rounded-full shadow-sm"><X size={20} /></button>
              </div>
              <form onSubmit={handleSubmit} className="p-8 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm font-bold text-slate-700 mb-2">Name</label><input required className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none" value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} placeholder="John Doe" /></div>
                  <div><label className="block text-sm font-bold text-slate-700 mb-2">Company/Role</label><input required className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none" value={formData.role} onChange={e=>setFormData({...formData, role: e.target.value})} placeholder="CEO, Startup" /></div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Your Review</label>
                  <textarea required rows={4} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none" value={formData.text} onChange={e=>setFormData({...formData, text: e.target.value})} placeholder="How was your experience working with us?" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Rating (1-5)</label>
                    <input type="number" min="1" max="5" required className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none" value={formData.rating} onChange={e=>setFormData({...formData, rating: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Profile Picture (Optional)</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="w-full text-sm font-medium file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" />
                    {previewUrl && <img src={previewUrl} className="mt-2 h-10 w-10 rounded-full object-cover ring-2 ring-primary-100" alt="Preview"/>}
                  </div>
                </div>
                <div className="pt-4 flex gap-3">
                  <button type="submit" disabled={isSubmitting} className="w-full py-4 rounded-xl font-bold bg-primary-600 hover:bg-primary-700 text-white transition-colors flex justify-center items-center gap-2">
                    {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : 'Submit Review'}
                  </button>
                </div>
                <p className="text-xs text-center text-slate-400 mt-2">Your review will be published after moderation.</p>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Testimonials;

