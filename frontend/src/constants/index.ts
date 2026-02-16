
import { ClubProject, Member, Stock } from '../types/index';

export const TRANSLATIONS = {
  TH: {
    navHome: 'หน้าแรก',
    navPortfolio: 'ผลงาน',
    navMembers: 'สมาชิก',
    navTrading: 'จำลองการเทรด',
    navNews: 'ข่าวสาร',
    heroTitle: 'ชมรมการลงทุนแห่งมหาวิทยาลัยเกษตรศาสตร์',
    heroSubtitle: 'สร้างอนาคตด้วยความรู้ด้านการเงินและนวัตกรรม',
    viewPortfolio: 'ดูผลงานของเรา',
    latestNews: 'ข่าวล่าสุด',
    searchPlaceholder: 'ค้นหาสมาชิก...',
    portfolioBalance: 'เงินสดคงเหลือ',
    totalEquity: 'มูลค่าพอร์ตรวม',
    buy: 'ซื้อ',
    sell: 'ขาย',
    quantity: 'จำนวน',
    price: 'ราคา',
    confirmTrade: 'ยืนยันการทำรายการ',
    history: 'ประวัติการเทรด',
    membersList: 'รายชื่อสมาชิก',
    filterDept: 'กรองตามฝ่าย',
    allDepts: 'ทุกฝ่าย',
    noTransactions: 'ยังไม่มีรายการธุรกรรม'
  },
  EN: {
    navHome: 'Home',
    navPortfolio: 'Portfolio',
    navMembers: 'Members',
    navTrading: 'Trading Sim',
    navNews: 'News',
    heroTitle: 'KU Investment Club',
    heroSubtitle: 'Building the future through finance and innovation',
    viewPortfolio: 'View Our Projects',
    latestNews: 'Latest News',
    searchPlaceholder: 'Search members...',
    portfolioBalance: 'Cash Balance',
    totalEquity: 'Total Equity',
    buy: 'Buy',
    sell: 'Sell',
    quantity: 'Quantity',
    price: 'Price',
    confirmTrade: 'Confirm Transaction',
    history: 'Trade History',
    membersList: 'Member Directory',
    filterDept: 'Filter by Dept',
    allDepts: 'All Departments',
    noTransactions: 'No transactions yet'
  }
};

export const PROJECTS: ClubProject[] = [
  {
    id: 1,
    title: { TH: 'AI เทรดดิ้งบอท', EN: 'AI Trading Bot' },
    description: { TH: 'การพัฒนาบอทเทรดโดยใช้ Machine Learning', EN: 'Developing a trading bot using Machine Learning algorithms.' },
    imageUrl: 'https://picsum.photos/seed/tech1/600/400',
    date: '2023-12-01',
    category: 'Tech'
  },
  {
    id: 2,
    title: { TH: 'สัมมนาการลงทุน 101', EN: 'Investment 101 Seminar' },
    description: { TH: 'พื้นฐานการลงทุนในตลาดหุ้นไทย', EN: 'Basic principles of investing in the Thai stock market.' },
    imageUrl: 'https://picsum.photos/seed/inv1/600/400',
    date: '2024-01-15',
    category: 'Investment'
  },
  {
    id: 3,
    title: { TH: 'บล็อกเชนเวิร์กชอป', EN: 'Blockchain Workshop' },
    description: { TH: 'เรียนรู้เบื้องต้นเกี่ยวกับ Smart Contracts', EN: 'Introductory hands-on session on Smart Contracts.' },
    imageUrl: 'https://picsum.photos/seed/tech2/600/400',
    date: '2024-02-10',
    category: 'Tech'
  }
];

export const MEMBERS: Member[] = [
  { id: '1', name: { TH: 'สมชาย รักเรียน', EN: 'Somchai Rakrean' }, role: { TH: 'ประธานชมรม', EN: 'President' }, department: 'Executive', email: 'somchai@invtech.club', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: '2', name: { TH: 'สมศรี พัฒนา', EN: 'Somsri Pattana' }, role: { TH: 'หัวหน้าฝ่ายเทคโนโลยี', EN: 'Tech Lead' }, department: 'Tech', email: 'somsri@invtech.club', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: '3', name: { TH: 'วิชัย มีกำไร', EN: 'Wichai Meegamrai' }, role: { TH: 'หัวหน้าฝ่ายการลงทุน', EN: 'Investment Lead' }, department: 'Investment', email: 'wichai@invtech.club', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: '4', name: { TH: 'นภา สายรุ้ง', EN: 'Napa Sairung' }, role: { TH: 'ฝ่ายประชาสัมพันธ์', EN: 'PR' }, department: 'PR', email: 'napa@invtech.club', avatar: 'https://i.pravatar.cc/150?u=4' },
];

export const INITIAL_STOCKS: Stock[] = [
  { symbol: 'PTT', name: 'PTT Public Company Limited', price: 34.50, change: 0.25, changePercent: 0.73 },
  { symbol: 'AAPL', name: 'Apple Inc.', price: 185.92, change: -1.24, changePercent: -0.66 },
  { symbol: 'TSLA', name: 'Tesla, Inc.', price: 175.34, change: 2.45, changePercent: 1.42 },
  { symbol: 'CPALL', name: 'CP ALL Public Company Limited', price: 58.25, change: 0.50, changePercent: 0.86 },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 822.79, change: 12.34, changePercent: 1.52 },
];
