import { Stock } from '../types';

import api from './axios';

export const fetchStocks = async (): Promise<Stock[]> => {
    try {
        const response = await api.get('/stocks');
        const data = response.data;

        // Map backend response to frontend Stock type if necessary
        // Assuming backend returns data matching Stock interface mostly
        return data.map((item: any) => ({
            symbol: item.symbol,
            name: item.name,
            price: item.current_price,
            change: item.change,
            changePercent: item.change_percent,
            high: item.current_price * 1.05, // Mock high/low for now if not in DB
            low: item.current_price * 0.95,
            volume: '10M', // Mock volume
            marketCap: '1T', // Mock cap
            peRatio: 20, // Mock PE
            dividendYield: 1.5, // Mock yield
            description: `Description for ${item.name}`
        }));
    } catch (error) {
        console.error('Error fetching stocks:', error);
        return [];
    }
};

export interface StockHistory {
    time: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

export const fetchStockHistory = async (symbol: string, period: string = '1mo', interval: string = '1d'): Promise<StockHistory[]> => {
    try {
        const response = await api.get(`/stocks/${symbol}/history`, {
            params: { period, interval }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching stock history:', error);
        return [];
    }
};
