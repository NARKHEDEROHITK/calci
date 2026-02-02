import { useState, useMemo } from 'react';
import { FaUserTie } from 'react-icons/fa';
import Header from '../../../common/Header';
import CalculatorInput from '../../../common/CalculatorInput';
import { calculateIncomeTax } from '../../../../utils/taxFormulas';
import { formatCurrency } from '../../../../utils/formatters';

const IncomeTaxCalculator = () => {
    const [income, setIncome] = useState(1000000);
    const [age, setAge] = useState(30);
    const [regime, setRegime] = useState('new');

    const result = useMemo(() => calculateIncomeTax(income, age, regime), [income, age, regime]);

    return (
        <div className="flex flex-col items-center p-4 md:p-8">
            <Header
                icon={FaUserTie}
                title="Income Tax Calculator"
                subtitle="Calculate tax under New & Old Regime (FY 2024-25)"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl">
                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-100">
                    <h2 className="text-xl font-semibold mb-6">Tax Details</h2>

                    <CalculatorInput
                        label="Annual Income"
                        value={income}
                        onChange={setIncome}
                        min={0}
                        max={100000000}
                        step={1000}
                        unit="₹"
                        formatValue={formatCurrency}
                    />

                    <div className="mb-6">
                        <label className="block text-sm text-white/70 font-medium mb-2">Age</label>
                        <input
                            type="range"
                            className="range-slider w-full mb-2"
                            min="18"
                            max="100"
                            value={age}
                            onChange={(e) => setAge(Number(e.target.value))}
                        />
                        <div className="flex justify-between items-center bg-white/[0.08] border border-white/10 rounded-lg p-3">
                            <span className="text-white font-medium">{age} Years</span>
                            <span className="text-xs text-white/50">
                                {age < 60 ? 'General' : age < 80 ? 'Senior Citizen' : 'Super Senior'}
                            </span>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm text-white/70 font-medium mb-2">Tax Regime</label>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setRegime('new')}
                                className={`flex-1 py-3 rounded-xl border border-white/10 font-medium transition-all ${regime === 'new' ? 'bg-primary-500 text-white' : 'bg-white/5 text-white/70 hover:bg-white/10'}`}
                            >
                                New Regime
                            </button>
                            <button
                                onClick={() => setRegime('old')}
                                className={`flex-1 py-3 rounded-xl border border-white/10 font-medium transition-all ${regime === 'old' ? 'bg-primary-500 text-white' : 'bg-white/5 text-white/70 hover:bg-white/10'}`}
                            >
                                Old Regime
                            </button>
                        </div>
                    </div>
                </div>

                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-200">
                    <h2 className="text-xl font-semibold mb-6">Tax Liability</h2>

                    <div className="gradient-primary rounded-2xl p-5 text-center mb-6">
                        <div className="text-sm text-white/80 uppercase tracking-wide mb-1">Total Tax Payable</div>
                        <div className="text-4xl font-extrabold text-white tracking-tight">
                            {formatCurrency(result.totalTax)}
                        </div>
                        <div className="text-sm text-white/70 mt-1">
                            Effective Rate: {income > 0 ? ((result.totalTax / income) * 100).toFixed(1) : 0}%
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-white/10 pb-3">
                            <span className="text-white/60">Gross Income</span>
                            <span className="text-white font-medium">{formatCurrency(income)}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/10 pb-3">
                            <span className="text-white/60">Taxable Income</span>
                            <span className="text-white font-medium">{formatCurrency(result.taxableIncome)}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/10 pb-3">
                            <span className="text-white/60">Income Tax</span>
                            <span className="text-white font-medium">{formatCurrency(result.tax)}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/10 pb-3">
                            <span className="text-white/60">Health & Education Cess (4%)</span>
                            <span className="text-white font-medium">{formatCurrency(result.cess)}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                            <span className="text-emerald-400 font-medium">Net Income (In Hand)</span>
                            <span className="text-emerald-400 font-bold text-lg">{formatCurrency(result.payAfterTax)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IncomeTaxCalculator;
