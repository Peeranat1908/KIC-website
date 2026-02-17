import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Home } from 'lucide-react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { Language } from '@/types/index';

import api from '../../api/axios';

interface LoginPageProps {
  lang: Language;
}

export const LoginPage: React.FC<LoginPageProps> = ({ lang }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      const data = res.data;

      if (data.token) {
        localStorage.setItem('token', data.token);
        if (data.user?.first_name) {
            localStorage.setItem('user_firstName', data.user.first_name);
        }
        window.dispatchEvent(new Event('storage'));
        navigate('/');
      }
    } catch (error) {
      console.error('Login Error:', error);
      alert('Login Failed: ' + (error as any).response?.data?.error || 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    setIsLoading(true);
    try {
      const res = await api.post('/auth/google-login', { token: credentialResponse.credential });
      const data = res.data;

      console.log('Login success:', data);
      
      // Store token (adjust based on your auth implementation)
      if (data.token) {
        localStorage.setItem('token', data.token);
        if (data.user?.first_name) {
            localStorage.setItem('user_firstName', data.user.first_name);
        }
        window.dispatchEvent(new Event('storage'));
      }
      
      navigate('/');
    } catch (error) {
      console.error('Google Login Error:', error);
      alert('Google Login Failed');
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-[20%] left-[60%] w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[80px]" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-[1]" />
      
      {/* Login Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md p-8 m-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none" />

        <div className="relative z-10">
          <div className="flex justify-between items-center mb-8">
             <button 
              onClick={() => navigate('/')}
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm"
            >
              <Home size={16} />
              {lang === Language.TH ? 'กลับหน้าหลัก' : 'Back to Home'}
            </button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
               <div className="w-4 h-4 bg-white/20 rounded-full" />
            </div>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
              {lang === Language.TH ? 'ยินดีต้อนรับ' : 'Welcome Back'}
            </h1>
            <p className="text-slate-400 text-sm">
              {lang === Language.TH ? 'เข้าสู่ระบบเพื่อจัดการพอร์ตของคุณ' : 'Enter your credentials to access your account'}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider ml-1">
                {lang === Language.TH ? 'อีเมล' : 'Email Address'}
              </label>
              <div className="relative group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-700 text-white px-4 py-3 pl-11 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-slate-600"
                  placeholder="name@example.com"
                  required
                />
                <Mail className="absolute left-3 top-3.5 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={20} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider ml-1">
                {lang === Language.TH ? 'รหัสผ่าน' : 'Password'}
              </label>
              <div className="relative group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-600 bg-slate-800/50 text-blue-500 focus:ring-offset-0 focus:ring-blue-500/50" />
                <span className="text-slate-400 group-hover:text-slate-300 transition-colors">
                  {lang === Language.TH ? 'จดจำฉัน' : 'Remember me'}
                </span>
              </label>
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
                {lang === Language.TH ? 'ลืมรหัสผ่าน?' : 'Forgot Password?'}
              </a>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className={`w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-white shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all ${
                isLoading ? 'opacity-80 cursor-wait' : 'hover:shadow-blue-500/40'
              }`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {lang === Language.TH ? 'เข้าสู่ระบบ' : 'Sign In'}
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

          <div className="mt-8 text-center">
            <p className="text-slate-400 text-sm">
              {lang === Language.TH ? 'ยังไม่มีบัญชีใช่ไหม? ' : "Don't have an account? "}
              <button onClick={() => navigate('/register')} className="text-white hover:text-blue-300 font-semibold transition-colors">
                {lang === Language.TH ? 'สมัครสมาชิก' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
