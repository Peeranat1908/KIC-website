
export enum Language {
  TH = 'TH',
  EN = 'EN'
}

export enum Page {
  Home = 'home',
  Portfolio = 'portfolio',
  Members = 'members',
  Trading = 'trading',
  News = 'news',
  Login = 'login'
}

export interface ClubProject {
  id: number;
  title: { TH: string; EN: string };
  description: { TH: string; EN: string };
  imageUrl: string;
  date: string;
  category: 'Investment' | 'Tech' | 'Event';
}

export interface Member {
  id: string;
  name: { TH: string; EN: string };
  role: { TH: string; EN: string };
  department: string;
  email: string;
  avatar: string;
}

export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface Portfolio {
  balance: number;
  holdings: { [symbol: string]: number };
}

export interface Transaction {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  timestamp: number;
}
