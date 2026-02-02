import { useState, useMemo } from 'react';
import { FaTree } from 'react-icons/fa';
import Header from '../../../common/Header';
import CalculatorInput from '../../../common/CalculatorInput';
import { calculatePPF } from '../../../../utils/wealthFormulas';
import { formatCurrency } from '../../../../utils/formatters';
import GrowthLineChart from '../../../common/charts/GrowthLineChart';

const PPFCalculator = () => {
    const [investment, setInvestment] = useState(150000);
    const [rate, setRate] = useState(7.1);
    const [years, setYears] = useState(15);

    const result = useMemo(() => calculatePPF(investment, rate, years), [investment, rate, years]);

    return (
        <div className="flex flex-col items-center p-4 md:p-8">
            <Header
                icon={FaTree}
                title="PPF Calculator"
                subtitle="Calculate Public Provident Fund Returns"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl">
                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-100">
                    <h2 className="text-xl font-semibold mb-6">Investment Details</h2>

                    <CalculatorInput
                        label="Yearly Investment"
                        value={investment}
                        onChange={setInvestment}
                        min={500}
                        max={150000}
                        step={500}
                        unit="₹"
                        formatValue={formatCurrency}
                    />
                    <CalculatorInput
                        label="Interest Rate"
                        value={rate}
                        onChange={setRate}
                        min={1}
                        max={15}
                        step={0.1}
                        unit="%"
                    />
                    <div className="flex flex-wrap gap-2 mt-4 mb-6">
                        {[7.1, 8.0, 8.5].map(r => (
                            <button
                                key={r}
                                onClick={() => setRate(r)}
                                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${rate === r ? 'bg-primary-500 text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}
                            >
                                {r}%
                            </button>
                        ))}
                        <span className="text-xs text-white/40 self-center ml-2">Current PPF Rate: 7.1%</span>
                    </div>

                    <CalculatorInput
                        label="Duration"
                        value={years}
                        onChange={setYears}
                        min={15}
                        max={50}
                        step={5}
                        unit="Yr"
                    />
                    <p className="text-xs text-white/40 mt-2">Minimum 15 years lock-in period.</p>
                </div>

                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-200">
                    <h2 className="text-xl font-semibold mb-6">Returns Summary</h2>

                    <div className="gradient-primary rounded-2xl p-5 text-center mb-6">
                        <div className="text-sm text-white/80 uppercase tracking-wide mb-1">Maturity Amount</div>
                        <div className="text-4xl font-extrabold text-white tracking-tight">
                            {formatCurrency(result.maturityAmount)}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-white/10 pb-3">
                            <span className="text-white/60">Total Invested</span>
                            <span className="text-white font-medium">{formatCurrency(result.totalInvested)}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/10 pb-3">
                            <span className="text-white/60">Interest Earned</span>
                            <span className="text-white font-medium text-emerald-400">{formatCurrency(result.totalInterest)}</span>
                        </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-white/10">
                        <h4 className="text-sm font-semibold text-white/80 mb-4">Corpus Growth</h4>
                        <GrowthLineChart
                            data={result.chartData}
                            lines={[
                                { dataKey: 'invested', name: 'Total Invested', color: '#8884d8' },
                                { dataKey: 'value', name: 'Maturity Amount', color: '#10b981' }
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PPFCalculator;
