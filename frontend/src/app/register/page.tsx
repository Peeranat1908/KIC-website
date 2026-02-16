import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Home, CheckCircle, XCircle } from 'lucide-react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { Language } from '@/types/index';

interface RegisterPageProps {
  lang: Language;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ lang }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
      if (formData.password !== formData.confirmPassword) {
      alert(lang === Language.TH ? 'รหัสผ่านไม่ตรงกัน' : 'Passwords do not match');
      return;
    }
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // For now, navigate to login or home
      navigate('/login');
    }, 2000);
  };

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:8080/api/auth/google-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });

      if (!res.ok) {
        throw new Error('Google Login failed');
      }

      const data = await res.json();
      console.log('Login success:', data);
      
      // Store token
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      
      navigate('/');
    } catch (error) {
      console.error('Google Login Error:', error);
      alert('Google Login Failed');
    } finally {
        setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-[40%] right-[30%] w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[80px]" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-[1]" />
      
      {/* Register Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md p-8 m-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 pointer-events-none" />

        <div className="relative z-10">
          <div className="flex justify-between items-center mb-6">
             <button 
              onClick={() => navigate('/')}
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm"
            >
              <Home size={16} />
              {lang === Language.TH ? 'กลับหน้าหลัก' : 'Back to Home'}
            </button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
               <div className="w-4 h-4 bg-white/20 rounded-full" />
            </div>
          </div>

          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
              {lang === Language.TH ? 'สร้างบัญชีใหม่' : 'Create Account'}
            </h1>
            <p className="text-slate-400 text-sm">
              {lang === Language.TH ? 'เข้าร่วมกับเราเพื่อเริ่มต้นการลงทุน' : 'Join us to start your investment journey'}
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
             <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider ml-1">
                {lang === Language.TH ? 'ชื่อ-นามสกุล' : 'Full Name'}
              </label>
              <div className="relative group">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full bg-slate-800/50 border border-slate-700 text-white px-4 py-3 pl-11 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-slate-600"
                  placeholder="John Doe"
                  required
                />
                <User className="absolute left-3 top-3.5 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={20} />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider ml-1">
                {lang === Language.TH ? 'อีเมล' : 'Email Address'}
              </label>
              <div className="relative group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-slate-800/50 border border-slate-700 text-white px-4 py-3 pl-11 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-slate-600"
                  placeholder="name@example.com"
                  required
                />
                <Mail className="absolute left-3 top-3.5 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={20} />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider ml-1">
                {lang === Language.TH ? 'รหัสผ่าน' : 'Password'}
              </label>
              <div className="relative group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-slate-800/50 border border-slate-700 text-white px-4 py-3 pl-11 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all placeholder:text-slate-600"
                  placeholder="••••••••"
                  required
                />
                <Lock className="absolute left-3 top-3.5 text-slate-500 group-focus-within:text-purple-400 transition-colors" size={20} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

             <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider ml-1">
                {lang === Language.TH ? 'ยืนยันรหัสผ่าน' : 'Confirm Password'}
              </label>
              <div className="relative group">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full bg-slate-800/50 border text-white px-4 py-3 pl-11 rounded-xl focus:outline-none focus:ring-2 transition-all placeholder:text-slate-600 ${
                    formData.confirmPassword && formData.password !== formData.confirmPassword 
                      ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50' 
                      : 'border-slate-700 focus:ring-purple-500/50 focus:border-purple-500/50'
                  }`}
                  placeholder="••••••••"
                  required
                />
                <Lock className="absolute left-3 top-3.5 text-slate-500 group-focus-within:text-purple-400 transition-colors" size={20} />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3.5 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
               {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-red-400 text-xs mt-1 ml-1 flex items-center gap-1">
                  <XCircle size={12} />
                  {lang === Language.TH ? 'รหัสผ่านไม่ตรงกัน' : 'Passwords do not match'}
                </p>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className={`w-full py-3.5 px-4 mt-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-bold text-white shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 transition-all ${
                isLoading ? 'opacity-80 cursor-wait' : 'hover:shadow-purple-500/40'
              }`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {lang === Language.TH ? 'สมัครสมาชิก' : 'Sign Up'}
                  <ArrowRight size={20} />
                </>
              )}
            </motion.button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700/50"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-900 text-slate-400">
                {lang === Language.TH ? 'หรือ' : 'Or'}
              </span>
            </div>
          </div>

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => {
                console.log('Login Failed');
              }}
              theme="filled_black"
              shape="pill"
              width="100%"
            />
          </div>

          <div className="mt-6 text-center">
            <p className="text-slate-400 text-sm">
              {lang === Language.TH ? 'มีบัญชีอยู่แล้ว? ' : "Already have an account? "}
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/login'); }} className="text-white hover:text-purple-300 font-semibold transition-colors">
                {lang === Language.TH ? 'เข้าสู่ระบบ' : 'Sign In'}
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
