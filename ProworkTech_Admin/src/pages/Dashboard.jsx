import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, MessageSquare, Plus, ArrowUpRight, TrendingUp, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { secureApiFetch } from '../utils/secureApi';

const DashboardHome = () => {
    const [dashboardData, setDashboardData] = useState({
        teamCount: 0,
        serviceCount: 0,
        enquiryCount: 0,
        recentEnquiries: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await secureApiFetch('/api/stats');
                if (response.ok) {
                    const data = await response.json();
                    setDashboardData(data);
                }
            } catch (error) {
                console.error("Failed to load stats", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const stats = [
        { label: 'Total Enquiries', value: loading ? '...' : dashboardData.enquiryCount.toString(), increase: 'Current', icon: <MessageSquare className="text-primary-600" />, bg: 'bg-primary-50' },
        { label: 'Active Services', value: loading ? '...' : dashboardData.serviceCount.toString(), increase: 'Current', icon: <Briefcase className="text-blue-600" />, bg: 'bg-blue-50' },
        { label: 'Team Members', value: loading ? '...' : dashboardData.teamCount.toString(), increase: 'Current', icon: <Users className="text-purple-600" />, bg: 'bg-purple-50' },
    ];

    const formatDate = (dateString) => {
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="p-8 space-y-8 bg-slate-50 min-h-full font-sans">
            {/* Header Section */}
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 leading-tight">Admin Dashboard</h1>
                    <p className="text-slate-500 font-medium">Monitoring ProWork Tech performance and enquiries.</p>
                </div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col gap-4 relative overflow-hidden group"
                    >
                        <div className="flex items-center justify-between relative z-10">
                            <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}>
                                {stat.icon}
                            </div>
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-slate-500 font-bold text-sm uppercase tracking-wider">{stat.label}</h3>
                            {loading ? (
                                <Loader2 className="animate-spin text-slate-300 mt-2" size={24} />
                            ) : (
                                <p className="text-4xl font-black text-slate-900 mt-1">{stat.value}</p>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Content Table Section */}
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Recent Submissions */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden"
                >
                    <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                        <h2 className="text-xl font-black text-slate-800 uppercase tracking-tighter">Recent Enquiries</h2>
                        <Link to="/submissions" className="text-xs font-bold text-primary-600 hover:underline">View All</Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Client Name</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Service Requested</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-8 text-center text-slate-400 font-bold">
                                            Loading...
                                        </td>
                                    </tr>
                                ) : dashboardData.recentEnquiries.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-8 text-center text-slate-400 font-bold">
                                            No enquiries found.
                                        </td>
                                    </tr>
                                ) : (
                                    dashboardData.recentEnquiries.map((item, idx) => (
                                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-5">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-slate-900">{item.name}</span>
                                                    <span className="text-xs text-slate-500">{item.email}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="px-3 py-1.5 rounded-lg bg-primary-50 text-primary-700 text-xs font-bold ring-1 ring-primary-100/50">
                                                    {item.service}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className={`flex items-center gap-1.5 text-xs font-bold ${item.status === 'New' ? 'text-amber-600' : 'text-primary-600'}`}>
                                                    <span className={`w-2 h-2 rounded-full ${item.status === 'New' ? 'bg-amber-500 animate-pulse' : 'bg-primary-500'}`}></span>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 text-right font-medium text-slate-500 text-sm">
                                                {formatDate(item.createdAt)}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Team Quick View */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 flex flex-col items-center justify-center text-center"
                >
                    <div className="w-16 h-16 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center mb-4">
                        <Users size={32} />
                    </div>
                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tighter mb-2">Manage Your Team</h2>
                    <p className="text-sm text-slate-500 mb-6">Keep your startup's personnel list updated to showcase talent to your clients.</p>
                    <Link to="/team" className="block text-center w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-500 font-bold text-sm hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50/50 transition-all">
                        Edit Active Team
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default DashboardHome;
