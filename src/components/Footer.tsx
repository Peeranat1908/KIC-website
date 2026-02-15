import React from 'react';
import { Language } from '../types/index';
import Logo from '../assets/Logo.png';

export const Footer: React.FC<{ lang: Language }> = () => {
  return (
    <footer className="bg-white border-t border-slate-100 py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-6">
              <img src={Logo} alt="KIC Logo" className="h-10 w-auto object-contain" />
              <span className="text-xl font-black tracking-tight">KIC</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">Pioneering the future of investment and technology through education, community, and innovation.</p>
          </div>
          <div className="flex flex-col space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">Platform</h4>
            <nav className="flex flex-col space-y-2 text-sm text-slate-500 font-medium">
              <a href="#" className="hover:text-blue-600 transition">Simulator Documentation</a>
              <a href="#" className="hover:text-blue-600 transition">Membership Tiers</a>
              <a href="#" className="hover:text-blue-600 transition">Privacy Policy</a>
            </nav>
          </div>
          <div className="flex flex-col space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">Connect</h4>
            <nav className="flex flex-col space-y-2 text-sm text-slate-500 font-medium">
              <a href="#" className="hover:text-blue-600 transition">LinkedIn</a>
              <a href="#" className="hover:text-blue-600 transition">Instagram</a>
              <a href="#" className="hover:text-blue-600 transition">Contact Support</a>
            </nav>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-slate-50 text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">&copy; 2026 KU Investment Club. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};
