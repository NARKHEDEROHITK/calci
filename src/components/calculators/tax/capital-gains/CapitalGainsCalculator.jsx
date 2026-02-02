import { useState, useMemo } from 'react';
import { FaChartArea } from 'react-icons/fa';
import Header from '../../../common/Header';
import CalculatorInput from '../../../common/CalculatorInput';
import { calculateCapitalGains } from '../../../../utils/taxFormulas';
import { formatCurrency } from '../../../../utils/formatters';

const CapitalGainsCalculator = () => {
    const [buyPrice, setBuyPrice] = useState(100000);
    const [sellPrice, setSellPrice] = useState(150000);
    const [duration, setDuration] = useState(15);
    const [unit, setUnit] = useState('months');

    const result = useMemo(() => calculateCapitalGains(buyPrice, sellPrice, duration, unit), [buyPrice, sellPrice, duration, unit]);

    return (
        <div className="flex flex-col items-center p-4 md:p-8">
            <Header
                icon={FaChartArea}
                title="Capital Gains"
                subtitle="Calculate Profit/Loss and Capital Gains Tax"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl">
                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-100">
                    <h2 className="text-xl font-semibold mb-6">Asset Details</h2>

                    <CalculatorInput
                        label="Purchase Price"
                        value={buyPrice}
                        onChange={setBuyPrice}
                        min={0}
                        max={100000000}
                        step={1000}
                        unit="₹"
                        formatValue={formatCurrency}
                    />
                    <CalculatorInput
                        label="Selling Price"
                        value={sellPrice}
                        onChange={setSellPrice}
                        min={0}
                        max={100000000}
                        step={1000}
                        unit="₹"
                        formatValue={formatCurrency}
                    />

                    <div className="mb-6">
                        <label className="block text-sm text-white/70 font-medium mb-2">Holding Period</label>
                        <div className="flex gap-4 mb-2">
                            <input
                                type="number"
                                className="flex-1 bg-white/[0.08] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary-500 outline-none"
                                value={duration}
                                onChange={(e) => setDuration(Number(e.target.value))}
                            />
                            <select
                                className="bg-white/[0.08] border border-white/10 rounded-lg px-4 py-3 text-white outline-none"
                                value={unit}
                                onChange={(e) => setUnit(e.target.value)}
                            >
                                <option value="months" className="bg-slate-800">Months</option>
                                <option value="years" className="bg-slate-800">Years</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-200">
                    <h2 className="text-xl font-semibold mb-6">Gains Summary</h2>

                    <div className={`rounded-2xl p-5 text-center mb-6 ${result.isGain ? 'gradient-primary' : 'bg-red-500/20 border border-red-500/30'}`}>
                        <div className="text-sm text-white/80 uppercase tracking-wide mb-1">
                            {result.isGain ? 'Total Capital Gain' : 'Capital Loss'}
                        </div>
                        <div className={`text-4xl font-extrabold tracking-tight ${result.isGain ? 'text-white' : 'text-red-400'}`}>
                            {formatCurrency(Math.abs(result.capitalGain))}
                        </div>
                        <div className="text-sm text-white/70 mt-1">
                            {result.type} Asset
                        </div>
                    </div>

                    {result.isGain && (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-white/10 pb-3">
                                <span className="text-white/60">Estimated Tax</span>
                                <span className="text-white font-medium text-red-400">{formatCurrency(result.estimatedTax)}</span>
                            </div>
                            <div className="flex justify-between items-center pt-2">
                                <span className="text-emerald-400 font-medium">Net Profit (Post Tax)</span>
                                <span className="text-emerald-400 font-bold text-lg">{formatCurrency(result.netProfit)}</span>
                            </div>
                            <p className="text-xs text-white/40 mt-2">
                                *Tax estimate assumes standard equity tax rates (STCG 20%, LTCG 12.5% &gt; 1.25L). Actual tax varies by asset type and slabs.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CapitalGainsCalculator;
