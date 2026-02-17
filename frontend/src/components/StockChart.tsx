"use client";

import React, { useEffect, useRef, useState } from 'react';
import { createChart, ColorType, IChartApi, ISeriesApi, CandlestickData, Time } from 'lightweight-charts';
import { fetchStockHistory, StockHistory } from '../api/stockService';

interface StockChartProps {
    symbol: string;
}

const StockChart: React.FC<StockChartProps> = ({ symbol }) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!chartContainerRef.current) return;

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: 'transparent' },
                textColor: '#d1d5db',
            },
            grid: {
                vertLines: { color: 'rgba(42, 46, 57, 0.5)' },
                horzLines: { color: 'rgba(42, 46, 57, 0.5)' },
            },
            width: chartContainerRef.current.clientWidth,
            height: 400,
            timeScale: {
                timeVisible: true,
                secondsVisible: false,
            },
        });

        chartRef.current = chart;

        const candlestickSeries = (chart as any).addCandlestickSeries({
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderVisible: false,
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350',
        });

        const loadData = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchStockHistory(symbol);
                if (data && data.length > 0) {
                    const sortedData = data
                        .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())
                        .map(item => ({
                            time: item.time as Time,
                            open: item.open,
                            high: item.high,
                            low: item.low,
                            close: item.close,
                        }));
                    candlestickSeries.setData(sortedData);
                } else {
                    setError("No data available");
                }
            } catch (err) {
                console.error(err);
                setError("Failed to load chart data");
            } finally {
                setLoading(false);
            }
        };

        loadData();

        const handleResize = () => {
            if (chartContainerRef.current) {
                chart.applyOptions({ width: chartContainerRef.current.clientWidth });
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, [symbol]);

    return (
        <div className="w-full relative">
            {loading && <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 text-white z-10">Loading Chart...</div>}
            {error && <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 text-red-500 z-10">{error}</div>}
            <div ref={chartContainerRef} className="w-full h-[400px]" />
        </div>
    );
};

export default StockChart;
