import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Language } from './types';
import { Layout } from './components/Layout';
import { HomePage } from './app/home/page';
import { PortfolioPage } from './app/portfolio/page';
import { MembersPage } from './app/members/page';
import { TradingPage } from './app/trading/page';
import { NewsPage } from './app/news/page';
import { LoginPage } from './app/login/page';
import { RegisterPage } from './app/register/page';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(Language.TH);

  return (
    <Layout lang={lang} setLang={setLang}>
        <Routes>
          <Route path="/" element={<HomePage lang={lang} />} />
          <Route path="/portfolio" element={<PortfolioPage lang={lang} />} />
          <Route path="/members" element={<MembersPage lang={lang} />} />
          <Route path="/trading" element={<TradingPage lang={lang} />} />
          <Route path="/news" element={<NewsPage lang={lang} />} />
          <Route path="/login" element={<LoginPage lang={lang} />} />
          <Route path="/register" element={<RegisterPage lang={lang} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </Layout>
  );
};

export default App;
