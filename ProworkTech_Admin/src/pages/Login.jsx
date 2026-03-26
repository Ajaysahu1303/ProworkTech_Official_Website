import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ChevronRight, ShieldCheck, Asterisk } from 'lucide-react';
import logo from '../assets/logo_prowork.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('adminToken', data.token);
                // Can also store user info if needed
                navigate('/');
            } else {
                setError(data.message || 'Invalid credentials');
            }
        } catch (err) {
            setError('System error: unable to connect to server.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex text-slate-900 bg-slate-50 items-center justify-center relative overflow-hidden font-sans">
            {/* Background Decorations */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-500/20 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-500/20 blur-[100px] rounded-full pointer-events-none" />

            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white/60 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl overflow-hidden relative z-10 mx-4">
                
                {/* Visual Side */}
                <div className="hidden md:flex flex-col justify-between bg-slate-900 text-white p-12 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-900/50 to-slate-900 z-0"></div>
                    <div className="absolute -right-[20%] top-[10%] w-[80%] h-[80%] bg-primary-600/30 blur-[80px] rounded-full z-0 font-bold mix-blend-screen" />
                    
                    <div className="relative z-10 flex items-center gap-3">
                         <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center overflow-hidden shrink-0 shadow-lg">
                            <img src={logo} alt="Logo" className="h-full w-auto object-contain" />
                        </div>
                        <div>
                            <h1 className="text-white font-black text-xl leading-none uppercase">PRO<span className="text-accent-500">work</span></h1>
                            <span className="text-[10px] font-bold tracking-[0.2em] text-slate-400 block">INTERNAL SYSTEMS</span>
                        </div>
                    </div>

                    <div className="relative z-10 mt-12">
                        <ShieldCheck size={48} className="text-primary-400 mb-6 drop-shadow-md" />
                        <h2 className="text-4xl font-black mb-4 leading-tight">Secure <br/> Admin Access</h2>
                        <p className="text-slate-400 font-medium text-lg max-w-xs">
                            Manage your digital ecosystem, view analytics, and update content in one unified space.
                        </p>
                    </div>

                    <div className="relative z-10 mt-12 pt-8 border-t border-slate-700/50">
                        <p className="text-xs text-slate-500 font-semibold tracking-wider uppercase">
                            Protected by Advanced Encryption
                        </p>
                    </div>
                </div>

                {/* Form Side */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="mb-8 md:hidden flex items-center gap-3">
                        <div className="h-10 w-10 bg-slate-900 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                            <img src={logo} alt="Logo" className="h-[80%] w-auto object-contain brightness-0 invert" />
                        </div>
                        <h1 className="font-black text-xl uppercase">PRO<span className="text-primary-600">work</span></h1>
                    </div>

                    <div className="mb-10">
                        <h3 className="text-3xl font-black text-slate-800 mb-2">Welcome Back</h3>
                        <p className="text-slate-500 font-medium">Please enter your credentials to continue.</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-600 text-sm font-semibold border border-red-100 flex items-center gap-2 animate-[pulse_0.3s_ease-out]">
                            <Asterisk size={16} />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-slate-700 ml-1">Admin Email</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                    <Mail size={20} />
                                </span>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-200 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all font-medium text-slate-800 shadow-sm"
                                    placeholder="Enter your email address"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex justify-between tracking-wide items-baseline ml-1">
                                <label className="text-sm font-bold text-slate-700">Password</label>
                            </div>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                    <Lock size={20} />
                                </span>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-200 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all font-medium text-slate-800 shadow-sm"
                                    placeholder="••••••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 mt-4 rounded-2xl bg-slate-900 text-white font-bold text-lg flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 group ${loading ? 'opacity-70 cursor-wait' : ''}`}
                        >
                            {loading ? 'Authenticating...' : 'Sign In'}
                            {!loading && <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
