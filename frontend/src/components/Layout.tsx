
import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Language } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  lang: Language;
  setLang: (l: Language) => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  lang, 
  setLang, 
}) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <Header 
        lang={lang} 
        setLang={setLang} 
      />
      <main className="flex-grow">
        {children}
      </main>
      <Footer lang={lang} />
    </div>
  );
};
