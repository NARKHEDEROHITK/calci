import { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { FaChartLine, FaWallet, FaArrowTrendUp, FaCoins } from 'react-icons/fa6';
import Header from '../../common/Header';
import { formatCurrency, getSliderStyle } from '../../../utils/formatters';

const SIPCalculator = () => {
    const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
    const [returnRate, setReturnRate] = useState(12);
    const [years, setYears] = useState(10);

    const calculations = useMemo(() => {
        const i = returnRate / 100 / 12; // Monthly rate
        const n = years * 12; // Total months

        // FV = P × [((1 + i)^n - 1) / i] × (1 + i)
        const totalInvested = monthlyInvestment * n;
        const totalValue = monthlyInvestment * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
        const wealthGained = totalValue - totalInvested;

        return {
            totalInvested,
            totalValue: Math.round(totalValue),
            wealthGained: Math.round(wealthGained),
            investedPercentage: (totalInvested / totalValue) * 100,
            gainPercentage: (wealthGained / totalValue) * 100
        };
    }, [monthlyInvestment, returnRate, years]);

    const chartData = [
        { name: 'Invested Amount', value: calculations.totalInvested },
        { name: 'Wealth Gained', value: calculations.wealthGained }
    ];

    return (
        <div className="flex flex-col items-center p-4 md:p-8">
            <Header
                icon={FaChartLine}
                title="SIP Calculator"
                subtitle="Calculate the future value of your monthly investments"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl">
                {/* Inputs */}
                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-100">
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
                        <FaWallet className="text-primary-500" />
                        Investment Details
                    </h2>

                    {/* Monthly Investment */}
                    <div className="mb-8">
                        <label className="flex justify-between items-center mb-2 text-sm text-white/70 font-medium">
                            <span>Monthly Investment</span>
                            <span className="text-white font-semibold text-base">{formatCurrency(monthlyInvestment)}</span>
                        </label>
                        <input
                            type="range"
                            className="range-slider w-full"
                            min="500"
                            max="100000"
                            step="500"
                            value={monthlyInvestment}
                            onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                            style={getSliderStyle(monthlyInvestment, 500, 100000)}
                        />
                        <div className="relative mt-3">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 font-medium">₹</span>
                            <input
                                type="number"
                                className="w-full pl-10 pr-4 py-3 bg-white/[0.08] border border-white/10 rounded-lg text-white font-medium focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                                value={monthlyInvestment}
                                onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                            />
                        </div>
                    </div>

                    {/* Expected Return Rate */}
                    <div className="mb-8">
                        <label className="flex justify-between items-center mb-2 text-sm text-white/70 font-medium">
                            <span>Expected Return Rate (p.a)</span>
                            <span className="text-white font-semibold text-base">{returnRate}%</span>
                        </label>
                        <input
                            type="range"
                            className="range-slider w-full"
                            min="1"
                            max="30"
                            step="0.5"
                            value={returnRate}
                            onChange={(e) => setReturnRate(Number(e.target.value))}
                            style={getSliderStyle(returnRate, 1, 30)}
                        />
                        <div className="relative mt-3">
                            <input
                                type="number"
                                className="w-full pl-4 pr-10 py-3 bg-white/[0.08] border border-white/10 rounded-lg text-white font-medium focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                                value={returnRate}
                                onChange={(e) => setReturnRate(Number(e.target.value))}
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 font-medium">%</span>
                        </div>
                    </div>

                    {/* Time Period */}
                    <div className="mb-6">
                        <label className="flex justify-between items-center mb-2 text-sm text-white/70 font-medium">
                            <span>Time Period</span>
                            <span className="text-white font-semibold text-base">{years} Years</span>
                        </label>
                        <input
                            type="range"
                            className="range-slider w-full"
                            min="1"
                            max="40"
                            step="1"
                            value={years}
                            onChange={(e) => setYears(Number(e.target.value))}
                            style={getSliderStyle(years, 1, 40)}
                        />
                        <div className="relative mt-3">
                            <input
                                type="number"
                                className="w-full pl-4 pr-12 py-3 bg-white/[0.08] border border-white/10 rounded-lg text-white font-medium focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                                value={years}
                                onChange={(e) => setYears(Number(e.target.value))}
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 font-medium">Yrs</span>
                        </div>
                    </div>
                </div>

                {/* Results and Visualization */}
                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-200">
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
                        <FaArrowTrendUp className="text-primary-500" />
                        Returns Overview
                    </h2>

                    <div className="gradient-primary rounded-2xl p-5 text-center mb-6">
                        <div className="text-sm text-white/80 uppercase tracking-wide mb-1">Estimated Future Value</div>
                        <div className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                            {formatCurrency(calculations.totalValue)}
                        </div>
                    </div>

                    <div className="relative h-64 mb-6">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <defs>
                                    <linearGradient id="investedGradient" x1="0" y1="0" x2="1" y2="1">
                                        <stop offset="0%" stopColor="#667eea" />
                                        <stop offset="100%" stopColor="#764ba2" />
                                    </linearGradient>
                                    <linearGradient id="gainGradient" x1="0" y1="0" x2="1" y2="1">
                                        <stop offset="0%" stopColor="#10b981" />
                                        <stop offset="100%" stopColor="#059669" />
                                    </linearGradient>
                                </defs>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={95}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    <Cell fill="url(#investedGradient)" stroke="none" />
                                    <Cell fill="url(#gainGradient)" stroke="none" />
                                </Pie>
                                <Tooltip
                                    formatter={(value) => formatCurrency(value)}
                                    contentStyle={{
                                        backgroundColor: 'rgba(15, 23, 42, 0.95)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '12px',
                                        color: '#fff'
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <FaCoins className="text-3xl text-white/20 mb-1" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                            <div className="text-xs text-white/50 uppercase tracking-wider mb-1">Invested Amount</div>
                            <div className="text-lg font-bold text-white">{formatCurrency(calculations.totalInvested)}</div>
                        </div>
                        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                            <div className="text-xs text-white/50 uppercase tracking-wider mb-1">Est. Returns</div>
                            <div className="text-lg font-bold text-emerald-400">{formatCurrency(calculations.wealthGained)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SIPCalculator;
