import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

const Contact = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: location.state?.service || 'Social Media Marketing',
    message: ''
  });

  useEffect(() => {
    if (location.state?.service) {
      setFormData(prev => ({ ...prev, service: location.state.service }));
    }
  }, [location.state]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          service: formData.service,
          project: formData.message,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', service: 'Social Media Marketing', message: '' });
        toast.success("Message sent successfully!");
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        toast.error("Failed to send your message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("An error occurred while sending the message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section-padding bg-slate-50 relative overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-primary-600 text-xs font-bold mb-6 uppercase tracking-wider">
              Contact Us
            </div>
            <h2 className="heading-lg mb-8 leading-tight">
              Let's Build Something <span className="text-gradient">Extraordinary</span>
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] mb-12 max-w-lg">
              Ready to take your local brand or startup to the next level? Get in touch and let's craft a digital strategy that converts.
            </p>

            <div className="space-y-8">
              {[
                { icon: <MapPin size={24} />, title: 'Our Office', details: 'Civil Lines, Prayagraj, Uttar Pradesh, India' },
                { icon: <Mail size={24} />, title: 'Email Us', details: 'hello@proworktech.com' },
                { icon: <Phone size={24} />, title: 'Call Us', details: '+91 9450066558' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-primary-100 flex items-center justify-center text-primary-600 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-primary-900 mb-1">{item.title}</h4>
                    <p className="text-primary-600">{item.details}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 p-8 rounded-3xl bg-primary-600 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="text-xl font-bold mb-3 text-accent-700">Join our newsletter</h4>
                <p className="text-primary-100 mb-6 font-medium">Get the latest digital growth and marketing strategies.</p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter email"
                    className="flex-grow px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:bg-white/20 transition-all font-medium"
                  />
                  <button className="w-12 h-12 rounded-xl bg-white text-primary-600 flex items-center justify-center hover:scale-105 transition-transform active:scale-95 shadow-lg shadow-white/10">
                    <ChevronRight size={24} />
                  </button>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card p-8 md:p-10"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send size={40} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                <p className="text-slate-500">Thank you for reaching out. We'll be in touch within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary-800 ml-1">Full Name</label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="input-field"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary-800 ml-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="input-field"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary-800 ml-1">Service Required</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="input-field appearance-none"
                    required
                  >
                    <option value="Website Development">Website Development</option>
                    <option value="App Development">App Development</option>
                    <option value="Social Media Marketing">Social Media Marketing</option>
                    <option value="Meta Ads">Meta Ads</option>
                    <option value="SEO Optimization">SEO Optimization</option>
                    <option value="Branding & Creative Designs">Branding & Creative Designs</option>
                    <option value="Logo Designing">Logo Designing</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary-800 ml-1">Project Details</label>
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you grow?"
                    className="input-field resize-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full py-4 text-lg gap-2 group shadow-primary-600/30"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Sending...
                    </span>
                  ) : (
                    <>
                      Send Message
                      <Send size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

