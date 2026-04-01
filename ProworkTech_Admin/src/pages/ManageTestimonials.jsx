import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, X, Upload, Loader2, Star, CheckCircle, XCircle } from 'lucide-react';
import { secureApiFetch } from '../utils/secureApi';
import toast from 'react-hot-toast';

const ManageTestimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({ name: "", role: "", text: "", rating: 5, avatar: "", isApproved: true });
    const [avatarFile, setAvatarFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const fetchTestimonials = async () => {
        try {
            const response = await secureApiFetch('/api/admin/testimonials');
            if (response.ok) {
                const data = await response.json();
                setTestimonials(data);
            } else {
                toast.error("Failed to load testimonials");
            }
        } catch (error) {
            console.error(error);
            toast.error("Network error loading testimonials");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleEdit = (test) => {
        setEditingId(test._id);
        setFormData({ name: test.name, role: test.role, text: test.text, rating: test.rating, avatar: test.avatar, isApproved: test.isApproved ?? true });
        setPreviewUrl(test.avatar);
        setAvatarFile(null);
        setIsModalOpen(true);
    };

    const handleToggleApproval = async (e, review) => {
        if (e) e.stopPropagation();
        try {
            const data = new FormData();
            data.append('name', review.name);
            data.append('role', review.role);
            data.append('text', review.text);
            data.append('rating', review.rating);
            data.append('avatar', review.avatar);
            data.append('isApproved', !review.isApproved);

            const response = await secureApiFetch(`/api/testimonials/${review._id}`, { method: 'PUT', body: data });
            if (response.ok) {
                toast.success(review.isApproved ? "Review hidden" : "Review approved!");
                setTestimonials(prev => prev.map(t => t._id === review._id ? { ...t, isApproved: !t.isApproved } : t));
            } else {
                toast.error("Failed to update status");
            }
        } catch (error) {
            toast.error("Network error");
        }
    };

    const handleDelete = async (e, id) => {
        if (e) e.stopPropagation();
        if (!window.confirm("Delete this testimonial?")) return;
        try {
            const response = await secureApiFetch(`/api/testimonials/${id}`, { method: 'DELETE' });
            if (response.ok) {
                setTestimonials(prev => prev.filter(t => t._id !== id));
                toast.success("Testimonial deleted");
            } else {
                toast.error("Failed to delete");
            }
        } catch (error) {
            toast.error("Network error");
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
            data.append('isApproved', formData.isApproved);
            if (avatarFile) data.append('avatarFile', avatarFile);
            else data.append('avatar', formData.avatar);

            const method = editingId ? 'PUT' : 'POST';
            const endpoint = editingId ? `/api/testimonials/${editingId}` : '/api/testimonials';

            const response = await secureApiFetch(endpoint, { method, body: data });
            if (response.ok) {
                toast.success(editingId ? "Review updated!" : "Review added!");
                await fetchTestimonials();
                closeModal();
            } else {
                toast.error("Failed to save");
            }
        } catch (error) {
            toast.error("Network error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
        setFormData({ name: "", role: "", text: "", rating: 5, avatar: "", isApproved: true });
        setAvatarFile(null);
        setPreviewUrl(null);
    };

    const filteredTestimonials = testimonials.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="p-8 space-y-8 bg-slate-50 min-h-full font-sans">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 leading-tight">Testimonials</h1>
                    <p className="text-slate-500 font-medium tracking-tight">Manage client reviews and insights.</p>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md shadow-primary-500/20 active:scale-95">
                    <Plus size={20} /> Add Review
                </button>
            </header>

            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input type="text" placeholder="Search by name..." className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:border-primary-500 transition-all bg-white" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="animate-spin text-primary-600" size={40} />
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {filteredTestimonials.map((review) => (
                        <div key={review._id} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all relative group flex flex-col">
                            <div className="absolute top-4 left-4">
                                {review.isApproved ? (
                                    <span className="px-2 py-1 text-xs font-bold bg-green-100 text-green-700 rounded-lg">Approved</span>
                                ) : (
                                    <span className="px-2 py-1 text-xs font-bold bg-amber-100 text-amber-700 rounded-lg">Pending Review</span>
                                )}
                            </div>
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                <button onClick={(e) => handleToggleApproval(e, review)} className={`p-2 rounded-lg ${review.isApproved ? 'bg-amber-50 text-amber-600 hover:bg-amber-100' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}>
                                    {review.isApproved ? <XCircle size={16} title="Hide Review" /> : <CheckCircle size={16} title="Approve Review" />}
                                </button>
                                <button onClick={() => handleEdit(review)} className="p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100"><Edit2 size={16}/></button>
                                <button onClick={(e) => handleDelete(e, review._id)} className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"><Trash2 size={16}/></button>
                            </div>
                            <div className="flex gap-1 mb-4 text-accent-500">
                                {[...Array(Number(review.rating))].map((_, i) => <Star key={i} size={16} className="fill-accent-500" />)}
                            </div>
                            <p className="text-slate-600 italic leading-relaxed mb-6 flex-grow text-sm">"{review.text}"</p>
                            <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
                                <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-50" />
                                <div>
                                    <h4 className="font-bold text-slate-800 text-sm">{review.name}</h4>
                                    <p className="text-xs text-slate-500">{review.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={closeModal} />
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl">
                            <div className="px-8 py-6 border-b border-slate-100 flex justify-between bg-slate-50/50">
                                <h2 className="text-2xl font-black text-slate-800">{editingId ? 'Edit Review' : 'Add New Review'}</h2>
                                <button onClick={closeModal} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
                            </div>
                            <form onSubmit={handleSubmit} className="p-8 space-y-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div><label className="block text-sm font-bold text-slate-700 mb-2">Client Name</label><input required className="w-full px-4 py-3 border rounded-xl" value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} /></div>
                                    <div><label className="block text-sm font-bold text-slate-700 mb-2">Role/Company</label><input required className="w-full px-4 py-3 border rounded-xl" value={formData.role} onChange={e=>setFormData({...formData, role: e.target.value})} /></div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Review Content</label>
                                    <textarea required rows={4} className="w-full px-4 py-3 border rounded-xl" value={formData.text} onChange={e=>setFormData({...formData, text: e.target.value})} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Rating (1-5)</label>
                                        <input type="number" min="1" max="5" required className="w-full px-4 py-3 border rounded-xl" value={formData.rating} onChange={e=>setFormData({...formData, rating: e.target.value})} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Avatar Image</label>
                                        <input type="file" accept="image/*" onChange={handleFileChange} className="w-full text-sm font-medium" />
                                        {previewUrl && <img src={previewUrl} className="mt-2 h-10 w-10 rounded-full object-cover" />}
                                    </div>
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mt-2 cursor-pointer">
                                        <input type="checkbox" checked={formData.isApproved} onChange={e=>setFormData({...formData, isApproved: e.target.checked})} className="w-5 h-5 rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
                                        Approved for public display
                                    </label>
                                </div>
                                <div className="pt-4 flex gap-3">
                                    <button type="button" onClick={closeModal} className="flex-1 py-3 rounded-xl font-bold bg-slate-100 text-slate-600">Cancel</button>
                                    <button type="submit" disabled={isSubmitting} className="flex-1 py-3 rounded-xl font-bold bg-primary-600 text-white">{editingId ? 'Update' : 'Add'}</button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};
export default ManageTestimonials;
