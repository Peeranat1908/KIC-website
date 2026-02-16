
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Language } from '@/types/index';
import { TRANSLATIONS } from '@/constants/index';
import { Badge } from '@/components/Badge';
import { Card } from '@/components/Card';

interface HomePageProps {
  lang: Language;
}

export const HomePage: React.FC<HomePageProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const navigate = useNavigate();
  return (
    <div className="animate-in fade-in duration-500">
      <section className="relative overflow-hidden bg-slate-900 py-24 lg:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge color="blue">Professional Community</Badge>
          <h1 className="text-4xl lg:text-7xl font-black text-white mt-6 mb-8 tracking-tight">
            {t.heroTitle}
          </h1>
          <p className="text-lg lg:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            {t.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => navigate('/portfolio')}
              className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition shadow-xl shadow-blue-500/20"
            >
              {t.viewPortfolio}
            </button>
            <button 
              onClick={() => navigate('/trading')}
              className="px-10 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition backdrop-blur-md"
            >
              {t.navTrading}
            </button>
          </div>
        </div>
      </section>
      <section className="py-12 -mt-12 container mx-auto px-4 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Active Members', value: '150+' },
            { label: 'Tech Projects', value: '25' },
            { label: 'Assets Simulated', value: '$10M+' },
            { label: 'Global Network', value: '12' },
          ].map((stat, i) => (
            <Card key={i} className="p-6 text-center">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
              <h4 className="text-2xl font-black text-slate-900">{stat.value}</h4>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};
