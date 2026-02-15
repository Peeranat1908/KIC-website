
import React from 'react';
import { Language } from '@/types/index';
import { TRANSLATIONS } from '@/constants/index';
import { PageLayout } from '@/components/PageLayout';
import { Badge } from '@/components/Badge';

interface NewsPageProps {
  lang: Language;
}

export const NewsPage: React.FC<NewsPageProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  return (
    <PageLayout title={t.navNews} subtitle="Updates, announcements, and market analysis.">
      <div className="max-w-4xl mx-auto space-y-12">
        {[1, 2, 3].map(i => (
          <article key={i} className="flex flex-col md:flex-row gap-8 items-center group cursor-pointer">
            <div className="w-full md:w-64 h-48 shrink-0 overflow-hidden rounded-2xl shadow-xl shadow-slate-200/50">
              <img src={`https://picsum.photos/seed/n${i}/600/400`} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt="News thumbnail" />
            </div>
            <div className="flex-grow">
              <div className="flex items-center space-x-3 mb-3">
                <Badge color="slate">Announcement</Badge>
                <span className="text-[10px] text-slate-400 font-bold uppercase">March {15+i}, 2024</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">Accelerating Financial Inclusion through AI Workshop</h3>
              <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                Last week, the InvTech Tech department hosted a hands-on workshop on the integration of Large Language Models in portfolio management...
              </p>
              <button className="mt-6 text-xs font-bold text-slate-900 border-b-2 border-slate-900 hover:text-blue-600 hover:border-blue-600 transition-all pb-1">Read Full Story</button>
            </div>
          </article>
        ))}
      </div>
    </PageLayout>
  );
};
