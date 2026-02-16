
import React, { useState } from 'react';
import { Language, Page } from '@/types/index';
import { Layout } from './Layout';
import { HomePage } from '@/app/page';
import { PortfolioPage } from '@/app/portfolio/page';
import { MembersPage } from '@/app/members/page';
import { TradingPage } from '@/app/trading/page';
import { NewsPage } from '@/app/news/page';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(Language.TH);
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);

  const renderPage = () => {
    switch (currentPage) {
      case Page.Home: return <HomePage lang={lang} setCurrentPage={setCurrentPage} />;
      case Page.Portfolio: return <PortfolioPage lang={lang} />;
      case Page.Members: return <MembersPage lang={lang} />;
      case Page.Trading: return <TradingPage lang={lang} />;
      case Page.News: return <NewsPage lang={lang} />;
      default: return <HomePage lang={lang} setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <Layout 
      lang={lang} 
      setLang={setLang} 
      currentPage={currentPage} 
      setCurrentPage={setCurrentPage}
    >
      {renderPage()}
    </Layout>
  );
};

export default App;
