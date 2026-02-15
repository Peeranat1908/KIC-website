
import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Language, Page } from '../types/index';

interface LayoutProps {
  children: React.ReactNode;
  lang: Language;
  setLang: (l: Language) => void;
  currentPage: Page;
  setCurrentPage: (p: Page) => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  lang, 
  setLang, 
  currentPage, 
  setCurrentPage 
}) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <Header 
        lang={lang} 
        setLang={setLang} 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
      />
      <main className="flex-grow">
        {children}
      </main>
      <Footer lang={lang} />
    </div>
  );
};
