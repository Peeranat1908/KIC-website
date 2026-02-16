
import React, { useState, useEffect, useMemo } from 'react';
import { Language, Stock, Portfolio, Transaction } from '../../types/index';
import { TRANSLATIONS, INITIAL_STOCKS } from '../../constants/index';
import { getInvestmentInsights } from '../../api/geminiService';
import { Card } from '../../components/Card';

interface TradingPageProps {
  lang: Language;
}

export const TradingPage: React.FC<TradingPageProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [stocks, setStocks] = useState<Stock[]>(INITIAL_STOCKS);
  const [portfolio, setPortfolio] = useState<Portfolio>(() => {
    const saved = localStorage.getItem('invtech_portfolio');
    return saved ? JSON.parse(saved) : { balance: 1000000, holdings: {} };
  });
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('invtech_history');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [tradeQty, setTradeQty] = useState(1);
  const [insights, setInsights] = useState('');
  const [loadingInsights, setLoadingInsights] = useState(false);

  useEffect(() => {
    localStorage.setItem('invtech_portfolio', JSON.stringify(portfolio));
    localStorage.setItem('invtech_history', JSON.stringify(transactions));
  }, [portfolio, transactions]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prev => prev.map(s => {
        const drift = 0.001; 
        const volatility = 0.01; 
        const change = s.price * (Math.random() * volatility * 2 - volatility + drift);
        const newPrice = Math.max(0.1, s.price + change);
        return {
          ...s,
          price: Number(newPrice.toFixed(2)),
          change: Number((newPrice - s.price).toFixed(2)),
          changePercent: Number(((newPrice / s.price - 1) * 100).toFixed(2))
        };
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const totalEquityValue = useMemo(() => {
    let value = portfolio.balance;
    Object.keys(portfolio.holdings).forEach(symbol => {
      const stock = stocks.find(s => s.symbol === symbol);
      if (stock) value += stock.price * portfolio.holdings[symbol];
    });
    return value;
  }, [portfolio, stocks]);

  const handleTrade = (type: 'BUY' | 'SELL') => {
    if (!selectedStock) return;
    const cost = selectedStock.price * tradeQty;
    if (type === 'BUY') {
      if (portfolio.balance < cost) { alert('Insufficient balance'); return; }
      setPortfolio(prev => ({
        balance: prev.balance - cost,
        holdings: { ...prev.holdings, [selectedStock.symbol]: (prev.holdings[selectedStock.symbol] || 0) + tradeQty }
      }));
    } else {
      const currentQty = portfolio.holdings[selectedStock.symbol] || 0;
      if (currentQty < tradeQty) { alert('Insufficient quantity'); return; }
      setPortfolio(prev => ({
        balance: prev.balance + cost,
        holdings: { ...prev.holdings, [selectedStock.symbol]: currentQty - tradeQty }
      }));
    }
    setTransactions(prev => [{
      id: Math.random().toString(36).substr(2, 9),
      symbol: selectedStock.symbol, type, quantity: tradeQty, price: selectedStock.price, timestamp: Date.now()
    }, ...prev]);
  };

  const getAIAdvice = async () => {
    setLoadingInsights(true);
    const summary = `Cash: ${portfolio.balance}, Portfolio: ${JSON.stringify(portfolio.holdings)}`;
    const result = await getInvestmentInsights(lang, summary);
    setInsights(result || '');
    setLoadingInsights(false);
  };

  return (
    <div className="py-12 container mx-auto px-4 max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="bg-slate-900 text-white p-8 relative overflow-hidden">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">{t.totalEquity}</p>
              <h2 className="text-4xl font-black">${totalEquityValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h2>
            </Card>
            <Card className="p-8 bg-white flex flex-col justify-center">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-800">AI Advisor</h3>
                <button onClick={getAIAdvice} disabled={loadingInsights} className="text-[10px] font-bold bg-blue-600 text-white px-3 py-1.5 rounded-lg">
                  {loadingInsights ? 'Analyzing...' : 'Analyze Now'}
                </button>
              </div>
              <p className="text-sm text-slate-500 italic">{insights || "Click Analyze to get insights."}</p>
            </Card>
          </div>
          <Card className="p-0">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase">
                <tr><th className="px-6 py-4">Symbol</th><th className="px-6 py-4 text-right">Price</th><th className="px-6 py-4 text-center">Action</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {stocks.map(stock => (
                  <tr key={stock.symbol} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-bold">{stock.symbol}</td>
                    <td className="px-6 py-4 text-right font-mono">${stock.price.toLocaleString()}</td>
                    <td className="px-6 py-4 text-center">
                      <button onClick={() => setSelectedStock(stock)} className="px-4 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold">Trade</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
        <div className="w-full lg:w-80 space-y-6">
          <Card className="p-6 border-2 border-slate-900">
            <h3 className="font-black mb-6 uppercase">Console</h3>
            {selectedStock ? (
              <div className="space-y-6">
                <div className="p-4 bg-slate-900 text-white rounded-xl flex justify-between">
                  <span>{selectedStock.symbol}</span><span>${selectedStock.price}</span>
                </div>
                <input type="number" value={tradeQty} onChange={e => setTradeQty(Math.max(1, parseInt(e.target.value) || 0))} className="w-full p-2 border rounded-lg" />
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => handleTrade('BUY')} className="py-3 bg-green-600 text-white rounded-xl font-bold">{t.buy}</button>
                  <button onClick={() => handleTrade('SELL')} className="py-3 bg-red-600 text-white rounded-xl font-bold">{t.sell}</button>
                </div>
              </div>
            ) : <p className="text-center text-slate-400">Select an asset</p>}
          </Card>
        </div>
      </div>
    </div>
  );
};
