import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Mail, User, Briefcase, FileText, CheckCircle2, XCircle, Clock, Search, Loader2, DownloadCloud } from 'lucide-react';
import { secureApiFetch } from '../utils/secureApi';
import toast from 'react-hot-toast';

const ManageSubmissions = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");

    const fetchEnquiries = async () => {
        try {
            const response = await secureApiFetch('/api/enquiries');
            if (response.ok) {
                const data = await response.json();
                setEnquiries(data);
            }
        } catch (error) {
            console.error("Error fetching enquiries:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEnquiries();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        try {
            const response = await secureApiFetch(`/api/enquiries/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ status: newStatus })
            });
            if (response.ok) {
                setEnquiries(enquiries.map(enq => enq._id === id ? { ...enq, status: newStatus } : enq));
                toast.success("Submission status updated.");
            } else {
                toast.error("Failed to update status.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Network error while updating status.");
        }
    };

    const filteredEnquiries = enquiries.filter(enq => {
        const matchesSearch = enq.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              enq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              enq.service.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === "All" || enq.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const getStatusStyle = (status) => {
        switch (status) {
            case 'New': return 'bg-blue-100 text-blue-700 ring-blue-500/30';
            case 'Read': return 'bg-amber-100 text-amber-700 ring-amber-500/30';
            case 'Replied': return 'bg-green-100 text-green-700 ring-green-500/30';
            case 'Closed': return 'bg-slate-100 text-slate-600 ring-slate-500/30';
            default: return 'bg-slate-100 text-slate-600 ring-slate-500/30';
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleExportCSV = () => {
        if (filteredEnquiries.length === 0) return toast.error("No data to export");
        
        const headers = ["Name", "Email", "Service", "Project Details", "Status", "Date Submitted"];
        const csvRows = [headers.join(",")];

        for (const row of filteredEnquiries) {
            const values = [
                `"${row.name.replace(/"/g, '""')}"`,
                `"${row.email.replace(/"/g, '""')}"`,
                `"${row.service.replace(/"/g, '""')}"`,
                `"${row.project.replace(/"/g, '""')}"`,
                `"${row.status}"`,
                `"${formatDate(row.createdAt)}"`
            ];
            csvRows.push(values.join(","));
        }

        const csvData = csvRows.join("\n");
        const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `prowork_leads_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("List exported successfully!");
    };

    return (
        <div className="p-8 space-y-8 bg-slate-50 min-h-full font-sans">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 leading-tight">Client Submissions</h1>
                    <p className="text-slate-500 font-medium tracking-tight">Manage incoming service enquiries and messages.</p>
                </div>
                <button 
                    onClick={handleExportCSV}
                    className="flex justify-center items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md shadow-emerald-500/20 active:scale-95 whitespace-nowrap"
                >
                    <DownloadCloud size={20} /> Export to CSV
                </button>
            </header>

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input 
                        type="text" 
                        placeholder="Search by name, email, or service..." 
                        className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all bg-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 bg-white p-1 rounded-2xl border border-slate-200">
                    {["All", "New", "Read", "Replied", "Closed"].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                                filterStatus === status 
                                ? 'bg-primary-50 text-primary-700 shadow-sm' 
                                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                            }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* List */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="animate-spin text-primary-600" size={40} />
                    <p className="font-bold text-slate-400">Loading submissions...</p>
                </div>
            ) : (
                <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
                    {filteredEnquiries.length === 0 ? (
                        <div className="p-12 text-center flex flex-col items-center text-slate-400">
                            <MessageSquare size={48} className="mb-4 text-slate-300" />
                            <h3 className="text-lg font-bold text-slate-600">No submissions found</h3>
                            <p>Try adjusting your search or filters.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            <AnimatePresence>
                                {filteredEnquiries.map((enq, idx) => (
                                    <motion.div
                                        key={enq._id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="p-6 md:p-8 hover:bg-slate-50 transition-colors group flex flex-col md:flex-row gap-6 md:items-start"
                                    >
                                        <div className="flex-grow space-y-4">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-md bg-gradient-to-br from-primary-500 to-primary-700`}>
                                                        {enq.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-black text-slate-900 leading-tight">{enq.name}</h3>
                                                        <a href={`mailto:${enq.email}`} className="text-sm font-medium text-slate-500 hover:text-primary-600 flex items-center gap-1 transition-colors">
                                                            <Mail size={14} /> {enq.email}
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className={`text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full ring-1 ${getStatusStyle(enq.status)}`}>
                                                        {enq.status}
                                                    </span>
                                                    <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                                                        <Clock size={14} /> {formatDate(enq.createdAt)}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                                                <div className="mb-3 flex items-center gap-2">
                                                    <Briefcase size={16} className="text-primary-500" />
                                                    <span className="font-bold text-slate-700">Service: <span className="text-slate-900">{enq.service}</span></span>
                                                </div>
                                                <div className="flex items-start gap-2 text-slate-600">
                                                    <FileText size={16} className="text-primary-500 mt-1 flex-shrink-0" />
                                                    <p className="leading-relaxed text-sm">{enq.project}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-row md:flex-col gap-2 shrink-0 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 w-full md:w-48">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Update Status</label>
                                            <select 
                                                value={enq.status}
                                                onChange={(e) => handleStatusChange(enq._id, e.target.value)}
                                                className="w-full bg-white border border-slate-200 text-slate-700 text-sm rounded-xl px-4 py-2.5 outline-none focus:border-primary-500 font-bold focus:ring-2 focus:ring-primary-500/20"
                                            >
                                                <option value="New">🏷️ Mark as New</option>
                                                <option value="Read">👀 Mark as Read</option>
                                                <option value="Replied">✉️ Marked as Replied</option>
                                                <option value="Closed">✅ Mark as Closed</option>
                                            </select>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ManageSubmissions;
