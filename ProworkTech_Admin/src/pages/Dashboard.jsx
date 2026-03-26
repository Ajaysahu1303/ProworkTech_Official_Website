import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, MessageSquare, Plus, ArrowUpRight, TrendingUp, Loader2 } from 'lucide-react';

const DashboardHome = () => {
    const [teamCount, setTeamCount] = useState(5); // Start with 5 static members
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/api/team')
            .then(res => res.json())
            .then(data => {
                setTeamCount(5 + (data.length || 0));
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const stats = [
        { label: 'Total Enquiries', value: '45', increase: '+12%', icon: <MessageSquare className="text-primary-600" />, bg: 'bg-primary-50' },
        { label: 'Active Projects', value: '18', increase: '+3', icon: <Briefcase className="text-blue-600" />, bg: 'bg-blue-50' },
        { label: 'Team Members', value: loading ? '...' : teamCount.toString(), increase: 'Stable', icon: <Users className="text-purple-600" />, bg: 'bg-purple-50' },
    ];

    const submissions = [
        { name: 'Rahul Sharma', email: 'rahul@example.com', service: 'Web Development', date: '2026-03-23' },
        { name: 'Priya Verma', email: 'priya@example.com', service: 'Social Media', date: '2026-03-23' },
        { name: 'Amit Singh', email: 'amit@example.com', service: 'Meta Ads', date: '2026-03-22' },
        { name: 'Deepak Kumar', email: 'deepak@example.com', service: 'SEO', date: '2026-03-21' },
    ];

    return (
        <div className="p-8 space-y-8 bg-slate-50 min-h-full font-sans">
            {/* Header Section */}
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 leading-tight">Admin Dashboard</h1>
                    <p className="text-slate-500 font-medium">Monitoring ProWork Tech performance and enquiries.</p>
                </div>
                <button className="flex items-center gap-2 bg-primary-600 text-white px-5 py-3 rounded-2xl font-bold shadow-lg shadow-primary-600/20 hover:bg-primary-700 transition-all active:scale-95">
                    <Plus size={20} />
                    Create Newsletter
                </button>
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
                            <div className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full ${stat.increase.includes('+') ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                                {stat.increase.includes('+') ? <ArrowUpRight size={14} /> : <TrendingUp size={14} />}
                                {stat.increase}
                            </div>
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-slate-500 font-bold text-sm uppercase tracking-wider">{stat.label}</h3>
                            {loading && stat.label === 'Team Members' ? (
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
                        <button className="text-xs font-bold text-primary-600 hover:underline">View All</button>
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
                                {submissions.map((item, idx) => (
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
                                            <span className="flex items-center gap-1.5 text-xs font-bold text-amber-600">
                                                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                                                Pending Review
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-right font-medium text-slate-500 text-sm">
                                            {item.date}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Team Quick View */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6"
                >
                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tighter mb-6">Active Team</h2>
                    <div className="space-y-6">
                        {['Harshika Yadav', 'Ayush Jaiswal', 'Ajay Sahu'].map((member, i) => (
                            <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-2xl transition-all border border-transparent hover:border-slate-100">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${i % 2 === 0 ? 'from-primary-500 to-primary-700' : 'from-accent-500 to-amber-600'} flex items-center justify-center font-black text-white`}>
                                        {member[0]}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 leading-none">{member}</p>
                                        <p className="text-xs text-slate-500 mt-1">Founding Member</p>
                                    </div>
                                </div>
                                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]"></div>
                            </div>
                        ))}
                    </div>
                    <a href="/team" className="block text-center w-full mt-8 py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold text-sm hover:border-primary-300 hover:text-primary-600 transition-all">
                        Manage Full Team
                    </a>
                </motion.div>
            </div>
        </div>
    );
};

export default DashboardHome;
