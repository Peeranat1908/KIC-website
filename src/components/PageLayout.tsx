
import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children, title, subtitle }) => (
  <div className="py-16 container mx-auto px-4 max-w-6xl animate-in fade-in slide-in-from-bottom-2 duration-700">
    <div className="mb-12">
      <h2 className="text-4xl font-black text-slate-900 tracking-tight">{title}</h2>
      {subtitle && <p className="text-slate-500 mt-2 font-medium">{subtitle}</p>}
    </div>
    {children}
  </div>
);
