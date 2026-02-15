
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { Language, Page } from '../types/index';
import { TRANSLATIONS } from '../constants/index';
import Logo from '../assets/logo.png';

interface HeaderProps {
  lang: Language;
  setLang: (l: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({ lang, setLang }) => {
  const t = TRANSLATIONS[lang];
  const location = useLocation();
  const navigate = useNavigate();
  const currentPage = location.pathname;

  const getPath = (page: Page) => {
    switch (page) {
      case Page.Home: return '/';
      case Page.Portfolio: return '/portfolio';
      case Page.Members: return '/members';
      case Page.Trading: return '/trading';
      case Page.News: return '/news';
      case Page.Login: return '/login';
      default: return '/';
    }
  };

  const isActive = (path: string) => {
    if (path === '/' && currentPage !== '/') return false;
    return currentPage === path; 
  };

  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-50 backdrop-blur-md bg-white/90">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div 
          className="flex items-center space-x-3 cursor-pointer group" 
          onClick={() => navigate('/')}
        >
          <img src={Logo} alt="KIC Logo" className="h-10 w-auto object-contain" />
          <div>
            <span className="text-xl font-bold text-slate-900 block leading-tight">KU Investment Club</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Investment Club</span>
          </div>
        </div>
        
        <nav className="hidden lg:flex space-x-8 text-sm font-semibold text-slate-600">
          {[
            { id: Page.Home, label: t.navHome, path: '/' },
            { id: Page.Portfolio, label: t.navPortfolio, path: '/portfolio' },
            { id: Page.Members, label: t.navMembers, path: '/members' },
            { id: Page.Trading, label: t.navTrading, path: '/trading' },
            { id: Page.News, label: t.navNews, path: '/news' },
          ].map((item) => (
            <Link 
              key={item.id}
              to={item.path} 
              className={`hover:text-blue-600 transition-colors relative py-1 ${isActive(item.path) ? 'text-blue-600' : ''}`}
            >
              {item.label}
              {isActive(item.path) && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setLang(lang === Language.TH ? Language.EN : Language.TH)}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 transition text-xs font-bold text-slate-700"
          >
            <span>{lang === Language.TH ? '🇹🇭 TH' : '🇺🇸 EN'}</span>
          </button>
          
          <Link
            to="/login"
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition font-bold text-sm"
          >
            <LogIn size={16} />
            <span>{lang === Language.TH ? 'เข้าสู่ระบบ' : 'Login'}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
