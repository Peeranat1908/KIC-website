
import React from 'react';
import { Language } from '@/types/index';
import { PROJECTS, TRANSLATIONS } from '@/constants/index';
import { PageLayout } from '@/components/PageLayout';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';

interface PortfolioPageProps {
  lang: Language;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  return (
    <PageLayout title={t.navPortfolio} subtitle="Our contributions to the intersection of finance and technology.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map(proj => (
          <Card key={proj.id} className="group cursor-pointer">
            <div className="relative h-56 overflow-hidden">
              <img src={proj.imageUrl} alt={proj.title[lang]} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
              <div className="absolute top-4 left-4">
                <Badge color={proj.category === 'Tech' ? 'indigo' : 'blue'}>{proj.category}</Badge>
              </div>
            </div>
            <div className="p-6">
              <p className="text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-widest">{proj.date}</p>
              <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-blue-600 transition-colors">{proj.title[lang]}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{proj.description[lang]}</p>
            </div>
          </Card>
        ))}
      </div>
    </PageLayout>
  );
};
