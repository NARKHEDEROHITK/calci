import { useState, useMemo } from 'react';
import { FaHandHoldingUsd } from 'react-icons/fa';
import Header from '../../../common/Header';
import CalculatorInput from '../../../common/CalculatorInput';
import { calculateSWP } from '../../../../utils/wealthFormulas';
import { formatCurrency } from '../../../../utils/formatters';
import GrowthLineChart from '../../../common/charts/GrowthLineChart';

const SWPCalculator = () => {
    const [investment, setInvestment] = useState(1000000);
    const [withdrawal, setWithdrawal] = useState(10000);
    const [rate, setRate] = useState(10);
    const [years, setYears] = useState(10);

    const result = useMemo(() => calculateSWP(investment, withdrawal, rate, years), [investment, withdrawal, rate, years]);

    return (
        <div className="flex flex-col items-center p-4 md:p-8">
            <Header
                icon={FaHandHoldingUsd}
                title="SWP Calculator"
                subtitle="Systematic Withdrawal Plan & Balance"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl">
                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-100">
                    <h2 className="text-xl font-semibold mb-6">Plan Details</h2>

                    <CalculatorInput
                        label="Total Investment"
                        value={investment}
                        onChange={setInvestment}
                        min={10000}
                        max={100000000}
                        step={5000}
                        unit="₹"
                        formatValue={formatCurrency}
                    />
                    <CalculatorInput
                        label="Monthly Withdrawal"
                        value={withdrawal}
                        onChange={setWithdrawal}
                        min={500}
                        max={500000}
                        step={500}
                        unit="₹"
                        formatValue={formatCurrency}
                    />
                    <CalculatorInput
                        label="Expected Return Rate (p.a)"
                        value={rate}
                        onChange={setRate}
                        min={1}
                        max={30}
                        step={0.1}
                        unit="%"
                    />
                    <CalculatorInput
                        label="Time Period"
                        value={years}
                        onChange={setYears}
                        min={1}
                        max={30}
                        step={1}
                        unit="Yr"
                    />
                </div>

                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-200">
                    <h2 className="text-xl font-semibold mb-6">Result Analysis</h2>

                    <div className="gradient-primary rounded-2xl p-5 text-center mb-6">
                        <div className="text-sm text-white/80 uppercase tracking-wide mb-1">Total Withdrawn</div>
                        <div className="text-4xl font-extrabold text-white tracking-tight">
                            {formatCurrency(result.totalWithdrawn)}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-white/10 pb-3">
                            <span className="text-white/60">Final Balance Left</span>
                            <span className={`font-semibold text-lg ${result.finalValue > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                {formatCurrency(result.finalValue)}
                            </span>
                        </div>
                        {result.finalValue === 0 && (
                            <div className="text-xs text-red-300 bg-red-500/10 p-2 rounded-lg border border-red-500/20">
                                Warning: Corpus depleted before end of period. Reduce withdrawal amount.
                            </div>
                        )}
                    </div>

                    <div className="mt-8 pt-4 border-t border-white/10">
                        <h4 className="text-sm font-semibold text-white/80 mb-4">Balance Depletion Chart</h4>
                        <GrowthLineChart
                            data={result.chartData}
                            lines={[
                                { dataKey: 'balance', name: 'Remaining Balance', color: '#10b981' },
                                { dataKey: 'withdrawn', name: 'Total Withdrawn', color: '#f59e0b' }
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SWPCalculator;
