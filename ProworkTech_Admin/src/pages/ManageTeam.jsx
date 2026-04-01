import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Users, Plus, Search, MoreVertical, Edit2, Trash2, 
    Linkedin, Twitter, Mail, ExternalLink, Filter, CheckCircle2, X,
    Upload, Loader2
} from 'lucide-react';
import { secureApiFetch } from '../utils/secureApi';
import toast from 'react-hot-toast';

const ManageTeam = () => {
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingMemberId, setEditingMemberId] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        email: "",
        bio: "",
        image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`,
        status: "Active",
        linkedin: "#",
        twitter: "#"
    });
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const fetchTeam = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/team');
            if (response.ok) {
                const data = await response.json();
                setTeam(data);
            }
        } catch (error) {
            console.error("Error fetching team:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeam();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleEditClick = (member) => {
        setEditingMemberId(member._id);
        setFormData({
            name: member.name,
            role: member.role,
            email: member.email || "",
            bio: member.bio || "",
            image: member.image,
            status: member.status || "Active",
            linkedin: member.social?.linkedin || "#",
            twitter: member.social?.twitter || "#"
        });
        setPreviewUrl(member.image);
        setIsModalOpen(true);
    };

    const handleAddMember = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('role', formData.role);
            data.append('email', formData.email);
            data.append('bio', formData.bio);
            data.append('status', formData.status);
            data.append('linkedin', formData.linkedin);
            data.append('twitter', formData.twitter);
            
            if (imageFile) {
                data.append('imageFile', imageFile);
            } else {
                data.append('image', formData.image);
            }

            const method = editingMemberId ? 'PUT' : 'POST';

            const response = await secureApiFetch(editingMemberId ? `/api/team/${editingMemberId}` : '/api/team', {
                method: method,
                body: data
            });

            if (response.ok) {
                toast.success(editingMemberId ? "Team member updated successfully!" : "Team member added successfully!");
                await fetchTeam();
                closeModal();
            } else {
                toast.error(editingMemberId ? "Failed to update member" : "Failed to add member");
            }
        } catch (error) {
            console.error("Save error:", error);
            toast.error("Network error while saving");
        } finally {
            setIsSubmitting(false);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingMemberId(null);
        setFormData({
            name: "", role: "", email: "", bio: "",
            image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`,
            status: "Active", linkedin: "#", twitter: "#"
        });
        setImageFile(null);
        setPreviewUrl(null);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to remove this member?")) return;
        try {
            const response = await secureApiFetch(`/api/team/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                toast.success("Team member removed successfully!");
                setTeam(prev => prev.filter(m => m._id !== id));
            } else {
                toast.error("Failed to delete member");
            }
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("Network error while deleting");
        }
    };

    const filteredTeam = team.filter(member => {
        const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             member.role.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === "All" || member.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="p-8 space-y-8 bg-slate-50 min-h-full font-sans">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 leading-tight">Team Management</h1>
                    <p className="text-slate-500 font-medium">Add, edit or remove new members to the Prowork Tech team.</p>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-primary-600/20 hover:bg-primary-700 transition-all active:scale-95 whitespace-nowrap"
                >
                    <Plus size={20} />
                    New Team Member
                </button>
            </header>

            {/* toolbar */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input 
                        type="text" 
                        placeholder="Search by name or role..." 
                        className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all bg-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    {["All", "Active", "Away"].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px-5 py-3 rounded-2xl font-bold text-sm transition-all border ${
                                filterStatus === status 
                                ? 'bg-primary-50 border-primary-200 text-primary-700' 
                                : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                            }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence>
                    {!loading && filteredTeam.map((member, idx) => (
                        <motion.div
                            key={member._id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ delay: idx * 0.05 }}
                            className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden group hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col"
                        >
                            {/* Card Top / Image */}
                            <div className="relative h-32 bg-gradient-to-br from-primary-600 to-primary-800">
                                <div className="absolute -bottom-10 left-6">
                                    <div className="w-20 h-20 rounded-2xl border-4 border-white bg-white shadow-lg overflow-hidden flex items-center justify-center">
                                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                    </div>
                                </div>
                                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button 
                                        onClick={() => handleEditClick(member)}
                                        className="p-2 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-white/40 transition-all"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(member._id)}
                                        className="p-2 bg-red-500/20 backdrop-blur-md rounded-lg text-white hover:bg-red-500 transition-all"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="pt-12 p-6 flex-grow space-y-4">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-black text-slate-900 line-clamp-1">{member.name}</h3>
                                        <span className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full ${
                                            member.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                        }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${member.status === 'Active' ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                                            {member.status}
                                        </span>
                                    </div>
                                    <p className="text-primary-600 font-bold text-xs uppercase tracking-widest mt-1">{member.role}</p>
                                </div>

                                <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                                    {member.bio}
                                </p>

                                <div className="flex items-center gap-3 pt-2 text-slate-400">
                                    <Mail size={16} className="hover:text-primary-600 cursor-pointer" />
                                    <Linkedin size={16} className="hover:text-primary-600 cursor-pointer" />
                                    <Twitter size={16} className="hover:text-primary-600 cursor-pointer" />
                                    <div className="flex-grow"></div>
                                    <ExternalLink size={16} className="hover:text-slate-900 cursor-pointer" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Add New Placeholder Card */}
                {!loading && (
                    <motion.button
                        onClick={() => setIsModalOpen(true)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8 text-slate-400 hover:border-primary-300 hover:bg-primary-50/30 hover:text-primary-600 transition-all min-h-[320px]"
                    >
                        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors">
                            <Plus size={32} />
                        </div>
                        <span className="font-black uppercase tracking-tighter text-lg">Add Member</span>
                        <p className="text-xs font-medium mt-2">Grow the ProWork Team</p>
                    </motion.button>
                )}
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="animate-spin text-primary-600" size={40} />
                    <p className="font-bold text-slate-400">Fetching team members...</p>
                </div>
            )}

            {/* Add Member Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                    />
                    <motion.div 
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden"
                    >
                        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0">
                            <div>
                                <h2 className="text-2xl font-black text-slate-900">
                                    {editingMemberId ? "Edit Member" : "Add New Member"}
                                </h2>
                                <p className="text-slate-500 font-medium">
                                    {editingMemberId ? "Update details for the existing team member." : "Enter details to add them to the team."}
                                </p>
                            </div>
                            <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                                <X size={24} className="text-slate-400" />
                            </button>
                        </div>

                        <form onSubmit={handleAddMember} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                            {/* Image Upload Selection */}
                            <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 rounded-[2rem] bg-slate-50 group hover:border-primary-400 hover:bg-primary-50/30 transition-all relative overflow-hidden">
                                {previewUrl || formData.image ? (
                                    <div className="relative w-32 h-32 rounded-3xl overflow-hidden shadow-xl ring-4 ring-white mb-4">
                                        <img src={previewUrl || formData.image} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Upload className="text-white" size={24} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center border border-slate-100 mb-4 group-hover:scale-110 transition-transform shadow-sm">
                                        <Upload className="text-slate-400 group-hover:text-primary-600" size={32} />
                                    </div>
                                )}
                                <div className="text-center">
                                    <p className="text-sm font-black text-slate-900 uppercase tracking-tighter">
                                        {imageFile ? imageFile.name : (editingMemberId ? "Change Photo" : "Upload Member Photo")}
                                    </p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">PNG, JPG up to 5MB</p>
                                </div>
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                                    <input 
                                        required
                                        type="text" 
                                        className="w-full px-5 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium"
                                        placeholder="e.g. John Doe"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Professional Role</label>
                                    <input 
                                        required
                                        type="text" 
                                        className="w-full px-5 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium"
                                        placeholder="e.g. Senior Developer"
                                        value={formData.role}
                                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                                    <input 
                                        required
                                        type="email" 
                                        className="w-full px-5 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Status</label>
                                    <select 
                                        className="w-full px-5 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium bg-white"
                                        value={formData.status}
                                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Away">Away</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Short Bio</label>
                                <textarea 
                                    required
                                    rows="3"
                                    className="w-full px-5 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium resize-none"
                                    placeholder="Describe their expertise..."
                                    value={formData.bio}
                                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                                ></textarea>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">LinkedIn Profile</label>
                                    <input 
                                        type="text" 
                                        className="w-full px-5 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium"
                                        placeholder="URL or #"
                                        value={formData.linkedin}
                                        onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Twitter/X Profile</label>
                                    <input 
                                        type="text" 
                                        className="w-full px-5 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium"
                                        placeholder="URL or #"
                                        value={formData.twitter}
                                        onChange={(e) => setFormData({...formData, twitter: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex gap-4">
                                <button 
                                    type="button"
                                    onClick={closeModal}
                                    className="flex-1 px-6 py-4 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 px-6 py-4 rounded-2xl font-bold text-white bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-600/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : null}
                                    {isSubmitting ? (editingMemberId ? "Updating..." : "Adding...") : (editingMemberId ? "Update Member" : "Add Member")}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default ManageTeam;
