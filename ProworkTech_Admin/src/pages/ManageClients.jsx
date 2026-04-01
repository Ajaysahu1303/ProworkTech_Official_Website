import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, X, Upload, Loader2, Image as ImageIcon } from 'lucide-react';
import { secureApiFetch } from '../utils/secureApi';
import toast from 'react-hot-toast';

const ManageClients = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingId, setEditingId] = useState(null);

    // Form State
    const [formData, setFormData] = useState({ name: "", logo: "" });
    const [logoFile, setLogoFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const fetchClients = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/clients');
            if (response.ok) {
                const data = await response.json();
                setClients(data);
            } else {
                toast.error("Failed to load clients");
            }
        } catch (error) {
            console.error("Error fetching clients:", error);
            toast.error("Network error loading clients");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLogoFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleEdit = (client) => {
        setEditingId(client._id);
        setFormData({ name: client.name, logo: client.logo });
        setPreviewUrl(client.logo);
        setLogoFile(null);
        setIsModalOpen(true);
    };

    const handleDelete = async (e, id) => {
        if (e) e.stopPropagation();
        if (!id) return toast.error("Error: Client ID missing");

        if (!window.confirm("Delete this client logo?")) return;
        try {
            const response = await secureApiFetch(`/api/clients/${id}`, { method: 'DELETE' });
            if (response.ok) {
                setClients(prev => prev.filter(c => c._id !== id));
                toast.success("Client deleted successfully!");
            } else {
                toast.error("Failed to delete client");
            }
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("Network error deleting client");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const data = new FormData();
            data.append('name', formData.name);
            if (logoFile) {
                data.append('logoFile', logoFile);
            } else {
                data.append('logo', formData.logo);
            }

            const method = editingId ? 'PUT' : 'POST';
            const endpoint = editingId ? `/api/clients/${editingId}` : '/api/clients';

            const response = await secureApiFetch(endpoint, {
                method,
                body: data
            });

            if (response.ok) {
                toast.success(editingId ? "Client updated!" : "Client added!");
                await fetchClients();
                closeModal();
            } else {
                toast.error("Failed to save client");
            }
        } catch (error) {
            console.error("Save error:", error);
            toast.error("Network error saving client");
        } finally {
            setIsSubmitting(false);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
        setFormData({ name: "", logo: "" });
        setLogoFile(null);
        setPreviewUrl(null);
    };

    const filteredClients = clients.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="p-8 space-y-8 bg-slate-50 min-h-full font-sans">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 leading-tight">Client Logos</h1>
                    <p className="text-slate-500 font-medium tracking-tight">Manage trusted partners displayed on your website.</p>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex justify-center items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md shadow-primary-500/20 active:scale-95"
                >
                    <Plus size={20} /> Add Client
                </button>
            </header>

            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                    type="text" 
                    placeholder="Search client by name..." 
                    className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all bg-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="animate-spin text-primary-600" size={40} />
                    <p className="font-bold text-slate-400">Loading clients...</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {filteredClients.map((client) => (
                        <div key={client._id} className="group relative bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all flex flex-col items-center hover:border-primary-100">
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                <button onClick={() => handleEdit(client)} className="p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors">
                                    <Edit2 size={14} />
                                </button>
                                <button onClick={(e) => handleDelete(e, client._id)} className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
                                    <Trash2 size={14} />
                                </button>
                            </div>
                            <div className="h-24 w-full flex items-center justify-center mb-4 p-2 bg-slate-50 rounded-2xl border border-slate-100/50">
                                <img src={client.logo} alt={client.name} className="max-h-full max-w-full object-contain" />
                            </div>
                            <h3 className="font-bold text-slate-800 text-sm text-center">{client.name}</h3>
                        </div>
                    ))}
                </div>
            )}

            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={closeModal} />
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl">
                            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                                <div>
                                    <h2 className="text-2xl font-black text-slate-800">{editingId ? 'Edit Client' : 'Add New Client'}</h2>
                                </div>
                                <button onClick={closeModal} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
                                    <X size={20} />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className="p-8 space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Company Name *</label>
                                    <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium" placeholder="E.g. Trendzila" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Brand Logo * (Transparent PNG recommended)</label>
                                    <div className="relative group border-2 border-dashed border-slate-200 rounded-2xl hover:border-primary-400 transition-colors bg-slate-50 flex items-center justify-center overflow-hidden" style={{ minHeight: '160px' }}>
                                        <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                        {previewUrl ? (
                                            <div className="p-4 w-full h-full flex flex-col items-center justify-center">
                                                <img src={previewUrl} alt="Preview" className="h-20 object-contain mb-2" />
                                                <p className="text-xs font-bold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">Click to change image</p>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center text-slate-400 group-hover:text-primary-500 transition-colors pointer-events-none p-6">
                                                <Upload size={32} className="mb-3" />
                                                <p className="font-bold text-sm">Drop logo here or click</p>
                                                <p className="text-xs mt-1">PNG, JPG up to 2MB</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="pt-2 flex gap-3">
                                    <button type="button" onClick={closeModal} className="flex-1 px-4 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all">Cancel</button>
                                    <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-3 rounded-xl font-bold text-white bg-primary-600 hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                                        {isSubmitting && <Loader2 size={18} className="animate-spin" />}
                                        {editingId ? 'Update Client' : 'Add Client'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};
export default ManageClients;
