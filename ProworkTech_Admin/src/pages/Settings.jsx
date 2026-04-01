import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KeyRound, ShieldCheck, Lock, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { secureApiFetch } from '../utils/secureApi';

const Settings = () => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [status, setStatus] = useState({ type: '', message: '' }); // type: 'success' | 'error'
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (status.message) setStatus({ type: '', message: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (formData.newPassword !== formData.confirmPassword) {
            setStatus({ type: 'error', message: 'New passwords do not match.' });
            return;
        }

        if (formData.newPassword.length < 8) {
            setStatus({ type: 'error', message: 'New password must be at least 8 characters long.' });
            return;
        }

        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await secureApiFetch('/api/admin/password', {
                method: 'PUT',
                body: JSON.stringify({
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword
                })
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({ type: 'success', message: 'Password updated successfully. Please use it for future logins.' });
                setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            } else {
                setStatus({ type: 'error', message: data.message || 'Failed to update password.' });
            }
        } catch (err) {
            setStatus({ type: 'error', message: err.message || 'An error occurred. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 pb-32">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
                <div>
                    <h1 className="text-3xl font-black text-slate-800 drop-shadow-sm flex items-center gap-3">
                        <ShieldCheck className="text-primary-600" size={32} />
                        Security Settings
                    </h1>
                    <p className="text-slate-500 font-medium mt-1">Manage your account credentials and system access.</p>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="max-w-xl"
            >
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center">
                            <KeyRound size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-800">Change Password</h2>
                            <p className="text-sm text-slate-500">Ensure your account is using a long, random password to stay secure.</p>
                        </div>
                    </div>

                    <div className="p-6">
                        <AnimatePresence mode="wait">
                            {status.message && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className={`mb-6 p-4 rounded-xl flex items-start gap-3 border ${
                                        status.type === 'success' 
                                        ? 'bg-green-50 text-green-800 border-green-200' 
                                        : 'bg-red-50 text-red-800 border-red-200'
                                    }`}
                                >
                                    {status.type === 'success' ? <CheckCircle2 className="flex-shrink-0 mt-0.5" size={20}/> : <AlertCircle className="flex-shrink-0 mt-0.5" size={20}/>}
                                    <p className="text-sm font-semibold">{status.message}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Current Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock size={18} className="text-slate-400" />
                                    </div>
                                    <input
                                        type="password"
                                        name="currentPassword"
                                        value={formData.currentPassword}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-slate-800 font-medium"
                                        placeholder="Enter your current password"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-100">
                                <label className="block text-sm font-bold text-slate-700 mb-2">New Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <ShieldCheck size={18} className="text-slate-400" />
                                    </div>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-slate-800 font-medium"
                                        placeholder="Minimum 8 characters"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Confirm New Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <ShieldCheck size={18} className="text-slate-400" />
                                    </div>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-slate-800 font-medium"
                                        placeholder="Re-enter new password"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary-600/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {loading ? <Loader2 size={20} className="animate-spin" /> : <KeyRound size={20} />}
                                    {loading ? 'Updating...' : 'Update Password'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Settings;
