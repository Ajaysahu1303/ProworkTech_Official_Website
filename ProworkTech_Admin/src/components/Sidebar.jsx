import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Briefcase, Users, MessageSquare, Settings, LogOut, ChevronRight, Star, Image as ImageIcon } from 'lucide-react';
import logo from '../assets/logo_prowork.png';

const AdminSidebar = () => {
    const menuItems = [
        { path: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { path: '/services', icon: <Briefcase size={20} />, label: 'Services' },
        { path: '/team', icon: <Users size={20} />, label: 'Team Members' },
        { path: '/testimonials', icon: <Star size={20} />, label: 'Testimonials' },
        { path: '/clients', icon: <ImageIcon size={20} />, label: 'Client Logos' },
        { path: '/submissions', icon: <MessageSquare size={20} />, label: 'Submissions' },
        { path: '/settings', icon: <Settings size={20} />, label: 'Settings' },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-slate-300 flex flex-col z-50">
            {/* Logo Section */}
            <div className="p-6 border-b border-slate-800 flex items-center gap-3">
                <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                    <img src={logo} alt="Prowork Tech" className="h-full w-auto object-contain" />
                </div>
                <div>
                    <h1 className="text-white font-black text-lg leading-none uppercase">PRO<span className="text-accent-500">work</span></h1>
                    <span className="text-[10px] font-bold tracking-[0.2em] text-slate-500 block">ADMIN PANEL</span>
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-grow p-4 space-y-2 mt-4">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `
                            flex items-center justify-between p-3 rounded-xl transition-all duration-300
                            ${isActive
                                ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20'
                                : 'hover:bg-slate-800 hover:text-white'
                            }
                        `}
                    >
                        <div className="flex items-center gap-3">
                            {item.icon}
                            <span className="font-medium text-sm">{item.label}</span>
                        </div>
                        <ChevronRight size={16} className={`${({ isActive }) => isActive ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 transition-opacity`} />
                    </NavLink>
                ))}
            </nav>

            {/* Footer / User Profile */}
            <div className="p-4 border-t border-slate-800 space-y-4">
                <div className="flex items-center gap-3 p-2">
                    <div className="h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center font-bold text-white shadow-inner">
                        A
                    </div>
                    <div className="flex-grow min-w-0">
                        <p className="text-sm font-bold text-white truncate">Admin Account</p>
                        <p className="text-xs text-slate-500 truncate">admin@proworktech.com</p>
                    </div>
                </div>
                <button onClick={() => {
                    localStorage.removeItem("adminToken");
                    window.location.href = "/login";
                }} className="flex items-center gap-3 w-full p-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all">
                    <LogOut size={20} />
                    <span className="text-sm font-medium">Logout System</span>
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
