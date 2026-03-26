import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, Search, Edit2, Trash2, Globe, Smartphone, Share2,
    BarChart3, Palette, Pentagon, Zap, Shield, X, Upload, Loader2, ArrowRight
} from 'lucide-react';

const availableIcons = {
    Globe: <Globe size={24} />,
    Smartphone: <Smartphone size={24} />,
    Share2: <Share2 size={24} />,
    BarChart3: <BarChart3 size={24} />,
    Search: <Search size={24} />,
    Palette: <Palette size={24} />,
    Pentagon: <Pentagon size={24} />,
    Zap: <Zap size={24} />,
    Shield: <Shield size={24} />
};

const ManageServices = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingId, setEditingId] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        desc: "",
        icon: "Globe",
        color: "bg-primary-50 text-primary-600",
        link: "/services"
    });
    const [iconFile, setIconFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const fetchServices = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/services');
            if (response.ok) {
                const data = await response.json();
                setServices(data);
            }
        } catch (error) {
            console.error("Error fetching services:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setIconFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleEditClick = (service) => {
        setEditingId(service._id);
        setFormData({
            title: service.title,
            desc: service.desc,
            icon: service.icon,
            color: service.color,
            link: service.link
        });
        setPreviewUrl(service.icon.startsWith('http') ? service.icon : null);
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('desc', formData.desc);
            data.append('color', formData.color);
            data.append('link', formData.link);

            if (iconFile) {
                data.append('iconFile', iconFile);
            } else {
                data.append('icon', formData.icon);
            }

            const url = editingId
                ? `http://localhost:5000/api/services/${editingId}`
                : 'http://localhost:5000/api/services';

            const method = editingId ? 'PUT' : 'POST';

            const response = await fetch(url, { 
                method, 
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                },
                body: data 
            });

            if (response.ok) {
                await fetchServices();
                closeModal();
            }
        } catch (error) {
            alert("Failed to save service");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (e, id) => {
        if (e) e.stopPropagation();
        console.log("Attempting to delete service with ID:", id);
        if (!id) return alert("Error: Service ID is missing");

        if (!window.confirm("Delete this service?")) return;
        try {
            const response = await fetch(`http://localhost:5000/api/services/${id}`, { 
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                }
            });
            console.log("Delete response status:", response.status);
            if (response.ok) {
                setServices(prev => prev.filter(s => s._id !== id));
            } else {
                const errorData = await response.json();
                alert(`Delete failed: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Delete error:", error);
            alert("Delete failed due to network error");
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
        setFormData({ title: "", desc: "", icon: "Globe", color: "bg-primary-50 text-primary-600", link: "/services" });
        setIconFile(null);
        setPreviewUrl(null);
    };

    const filteredServices = services.filter(s =>
        (s.title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (s.desc?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-8 space-y-8 bg-slate-50 min-h-full font-sans">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 leading-tight">Service Management</h1>
                    <p className="text-slate-500 font-medium">Manage the solutions offered by Prowork Tech.</p>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-primary-600/20 hover:bg-primary-700 transition-all active:scale-95">
                    <Plus size={20} /> New Service
                </button>
            </header>

            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                    type="text"
                    placeholder="Search services..."
                    className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-500/20 shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {!loading && filteredServices.map((service, idx) => (
                        <motion.div
                            key={service._id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden group p-6 flex flex-col gap-4 relative hover:shadow-xl transition-all"
                        >
                            <div className="flex justify-between items-start">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${service.color}`}>
                                    {service.icon?.startsWith('http') ? (
                                        <img src={service.icon} alt={service.title} className="w-8 h-8 object-contain" />
                                    ) : (
                                        availableIcons[service.icon] || <Pentagon size={24} />
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleEditClick(service)} className="p-2 bg-slate-50 text-slate-400 hover:text-primary-600 rounded-xl transition-colors">
                                        <Edit2 size={16} />
                                    </button>
                                    <button onClick={(e) => handleDelete(e, service._id)} className="p-2 bg-slate-50 text-slate-400 hover:text-red-500 rounded-xl transition-colors">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-slate-900 mb-2">{service.title}</h3>
                                <p className="text-slate-500 text-sm line-clamp-3 leading-relaxed">{service.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {!loading && (
                    <button onClick={() => setIsModalOpen(true)} className="border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8 text-slate-400 hover:border-primary-300 hover:bg-primary-50/20 transition-all min-h-[250px]">
                        <Plus size={40} className="mb-2" />
                        <span className="font-bold">Add Service</span>
                    </button>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div onClick={closeModal} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
                    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl p-8 overflow-hidden max-h-[90vh]">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-black text-slate-900">{editingId ? "Edit Service" : "New Service"}</h2>
                            <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-xl transition-colors"><X size={24} className="text-slate-400" /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6 overflow-y-auto max-h-[70vh] pr-2 custom-scrollbar">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Service Title</label>
                                <input required type="text" className="w-full px-5 py-3 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-500/20 transition-all font-medium" placeholder="e.g. Meta Ads Management" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                            </div>

                            <div className="space-y-4">
                                <label className="text-sm font-bold text-slate-700 ml-1">Service Icon</label>
                                <div className="grid grid-cols-5 gap-3">
                                    {Object.keys(availableIcons).map(iconName => (
                                        <button key={iconName} type="button" onClick={() => { setFormData({ ...formData, icon: iconName }); setIconFile(null); setPreviewUrl(null); }} className={`p-4 rounded-2xl flex items-center justify-center transition-all ${formData.icon === iconName && !iconFile ? 'bg-primary-600 text-white shadow-lg' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}>
                                            {availableIcons[iconName]}
                                        </button>
                                    ))}
                                    <div className={`relative p-4 rounded-2xl flex items-center justify-center border-2 border-dashed ${iconFile ? 'border-primary-600 bg-primary-50 text-primary-600' : 'border-slate-200 text-slate-400 hover:border-primary-300'}`}>
                                        {previewUrl ? <img src={previewUrl} className="w-6 h-6 object-contain" alt="" /> : <Upload size={20} />}
                                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Description</label>
                                <textarea required rows="4" className="w-full px-5 py-3 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-500/20 transition-all font-medium resize-none" placeholder="Explain what this service provides..." value={formData.desc} onChange={e => setFormData({ ...formData, desc: e.target.value })} />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Badge Style (Tailwind Classes)</label>
                                    <input type="text" className="w-full px-5 py-3 rounded-2xl border bg-slate-50 font-medium" value={formData.color} onChange={e => setFormData({ ...formData, color: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Page Link</label>
                                    <input type="text" className="w-full px-5 py-3 rounded-2xl border bg-slate-50 font-medium" value={formData.link} onChange={e => setFormData({ ...formData, link: e.target.value })} />
                                </div>
                            </div>

                            <div className="pt-4 flex gap-4">
                                <button type="button" onClick={closeModal} className="flex-1 py-4 font-bold text-slate-400 hover:text-slate-600">Cancel</button>
                                <button type="submit" disabled={isSubmitting} className="flex-2 bg-primary-600 text-white px-10 py-4 rounded-2xl font-bold shadow-lg shadow-primary-600/20 flex items-center justify-center gap-2">
                                    {isSubmitting && <Loader2 className="animate-spin" size={20} />}
                                    {isSubmitting ? "Saving..." : (editingId ? "Update Service" : "Create Service")}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default ManageServices;
