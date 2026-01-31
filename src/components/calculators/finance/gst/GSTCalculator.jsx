import { useState, useMemo } from 'react';
import { FaPercent, FaCalculator, FaTags, FaReceipt } from 'react-icons/fa6';
import Header from '../../../common/Header';
import { formatCurrency, getSliderStyle } from '../../../../utils/formatters';

const GSTCalculator = () => {
    const [amount, setAmount] = useState(10000);
    const [gstRate, setGstRate] = useState(18);
    const [mode, setMode] = useState('add'); // 'add' or 'remove'

    const calculations = useMemo(() => {
        let gstAmount, baseAmount, totalAmount;

        if (mode === 'add') {
            gstAmount = (amount * gstRate) / 100;
            baseAmount = amount;
            totalAmount = amount + gstAmount;
        } else {
            gstAmount = amount - (amount * (100 / (100 + gstRate)));
            baseAmount = amount - gstAmount;
            totalAmount = amount;
        }

        const cgst = gstAmount / 2;
        const sgst = gstAmount / 2;

        return {
            gstAmount,
            baseAmount,
            totalAmount,
            cgst,
            sgst
        };
    }, [amount, gstRate, mode]);

    const commonRates = [5, 12, 18, 28];

    return (
        <div className="flex flex-col items-center p-4 md:p-8">
            <Header
                icon={FaPercent}
                title="GST Calculator"
                subtitle="Calculate GST amount and net prices instantly"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl">
                {/* Inputs */}
                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-100">
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
                        <FaCalculator className="text-primary-500" />
                        Calculation Input
                    </h2>

                    {/* Mode Toggle */}
                    <div className="flex bg-white/5 p-1 rounded-2xl mb-8">
                        <button
                            onClick={() => setMode('add')}
                            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all ${mode === 'add' ? 'gradient-primary text-white shadow-lg' : 'text-white/50 hover:text-white'
                                }`}
                        >
                            Add GST
                        </button>
                        <button
                            onClick={() => setMode('remove')}
                            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all ${mode === 'remove' ? 'gradient-primary text-white shadow-lg' : 'text-white/50 hover:text-white'
                                }`}
                        >
                            Remove GST
                        </button>
                    </div>

                    {/* Amount Input */}
                    <div className="mb-8">
                        <label className="flex justify-between items-center mb-2 text-sm text-white/70 font-medium">
                            <span>{mode === 'add' ? 'Original Amount' : 'Total Amount (Incl. GST)'}</span>
                            <span className="text-white font-semibold text-base">{formatCurrency(amount)}</span>
                        </label>
                        <input
                            type="range"
                            className="range-slider w-full"
                            min="100"
                            max="1000000"
                            step="100"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            style={getSliderStyle(amount, 100, 1000000)}
                        />
                        <div className="relative mt-3">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 font-medium">₹</span>
                            <input
                                type="number"
                                className="w-full pl-10 pr-4 py-3 bg-white/[0.08] border border-white/10 rounded-lg text-white font-medium focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                            />
                        </div>
                    </div>

                    {/* GST Rate Selection */}
                    <div className="mb-6">
                        <label className="block text-sm text-white/70 font-medium mb-3">GST Rate (%)</label>
                        <div className="grid grid-cols-4 gap-2 mb-4">
                            {commonRates.map(rate => (
                                <button
                                    key={rate}
                                    onClick={() => setGstRate(rate)}
                                    className={`py-2 rounded-xl text-sm font-bold transition-all border ${gstRate === rate
                                        ? 'gradient-primary border-transparent text-white shadow-md'
                                        : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                                        }`}
                                >
                                    {rate}%
                                </button>
                            ))}
                        </div>
                        <div className="relative mt-2">
                            <input
                                type="number"
                                className="w-full pl-4 pr-10 py-3 bg-white/[0.08] border border-white/10 rounded-lg text-white font-medium focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                                value={gstRate}
                                onChange={(e) => setGstRate(Number(e.target.value))}
                                placeholder="Custom Rate"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 font-medium">%</span>
                        </div>
                    </div>
                </div>

                {/* Results Card */}
                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-200">
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
                        <FaReceipt className="text-primary-500" />
                        Tax Breakdown
                    </h2>

                    <div className="bg-white/5 rounded-2xl p-6 mb-6 flex flex-col items-center border border-white/10">
                        <div className="text-sm text-white/50 uppercase tracking-widest mb-1">
                            {mode === 'add' ? 'Total Amount (Net)' : 'Base Amount (Excl. GST)'}
                        </div>
                        <div className="text-4xl font-black text-white mb-4">
                            {formatCurrency(mode === 'add' ? calculations.totalAmount : calculations.baseAmount)}
                        </div>
                        <div className="w-full h-px bg-white/10 my-4"></div>
                        <div className="grid grid-cols-2 w-full gap-4">
                            <div className="text-center">
                                <div className="text-xs text-white/40 uppercase mb-1">Total GST</div>
                                <div className="text-lg font-bold text-primary-400">{formatCurrency(calculations.gstAmount)}</div>
                            </div>
                            <div className="text-center">
                                <div className="text-xs text-white/40 uppercase mb-1">GST Rate</div>
                                <div className="text-lg font-bold text-white">{gstRate}%</div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-white/[0.03] rounded-xl border border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-8 bg-sky-500 rounded-full"></div>
                                <span className="text-white/70">Central GST (CGST 50%)</span>
                            </div>
                            <span className="font-bold text-white">{formatCurrency(calculations.cgst)}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-white/[0.03] rounded-xl border border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-8 bg-indigo-500 rounded-full"></div>
                                <span className="text-white/70">State GST (SGST 50%)</span>
                            </div>
                            <span className="font-bold text-white">{formatCurrency(calculations.sgst)}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-primary-500/10 rounded-xl border border-primary-500/20 mt-4">
                            <span className="font-bold text-white">Full Post-Tax Price</span>
                            <span className="text-xl font-bold text-white">{formatCurrency(calculations.totalAmount)}</span>
                        </div>
                    </div>

                    <div className="mt-8 p-4 rounded-2xl bg-gradient-to-br from-primary-500/10 to-transparent border border-white/5">
                        <div className="flex items-start gap-4">
                            <FaTags className="text-2xl text-primary-400 mt-1" />
                            <div>
                                <h4 className="text-sm font-bold text-white mb-1">Pro Tip</h4>
                                <p className="text-xs text-white/50 leading-relaxed">
                                    GST in India is usually split into CGST and SGST for intrastate trade, or levied as IGST for interstate trade. All these rates are calculated on the same taxable value.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GSTCalculator;
