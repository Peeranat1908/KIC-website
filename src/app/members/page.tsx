
import React from 'react';
import { Language } from '@/types/index';
import { MEMBERS, TRANSLATIONS } from '@/constants/index';
import { PageLayout } from '@/components/PageLayout';
import { Card } from '@/components/Card';

interface MembersPageProps {
  lang: Language;
}

export const MembersPage: React.FC<MembersPageProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  return (
    <PageLayout title={t.membersList} subtitle="The diverse minds driving our innovation.">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {MEMBERS.map(m => (
          <Card key={m.id} className="p-8 text-center flex flex-col items-center hover:border-blue-200 transition-colors">
            <div className="relative mb-6">
              <div className="absolute -inset-1 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-full opacity-20 group-hover:opacity-100 transition duration-500 blur" />
              <img src={m.avatar} className="relative w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover" alt={m.name[lang]} />
            </div>
            <h3 className="font-bold text-lg text-slate-900">{m.name[lang]}</h3>
            <p className="text-blue-600 text-xs font-bold uppercase tracking-wider mt-1">{m.role[lang]}</p>
            <p className="text-slate-400 text-[10px] mt-4 font-bold uppercase tracking-widest">{m.department}</p>
            <a href={`mailto:${m.email}`} className="text-slate-500 text-xs mt-4 hover:underline">{m.email}</a>
          </Card>
        ))}
      </div>
    </PageLayout>
  );
};
