import { useState, useMemo } from 'react';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import Header from '../../../common/Header';
import CalculatorInput from '../../../common/CalculatorInput';
import { calculateLumpsum } from '../../../../utils/wealthFormulas';
import { formatCurrency } from '../../../../utils/formatters';
import GrowthLineChart from '../../../common/charts/GrowthLineChart';

const LumpsumCalculator = () => {
    const [investment, setInvestment] = useState(100000);
    const [rate, setRate] = useState(12);
    const [years, setYears] = useState(10);

    const result = useMemo(() => calculateLumpsum(investment, rate, years), [investment, rate, years]);

    return (
        <div className="flex flex-col items-center p-4 md:p-8">
            <Header
                icon={FaMoneyCheckAlt}
                title="Lumpsum Calculator"
                subtitle="Calculate returns on one-time investment"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl">
                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-100">
                    <h2 className="text-xl font-semibold mb-6">Investment Details</h2>

                    <CalculatorInput
                        label="Total Investment"
                        value={investment}
                        onChange={setInvestment}
                        min={1000}
                        max={10000000}
                        step={1000}
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
                        max={40}
                        step={1}
                        unit="Yr"
                    />
                </div>

                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-200">
                    <h2 className="text-xl font-semibold mb-6">Projected Returns</h2>

                    <div className="gradient-primary rounded-2xl p-5 text-center mb-6">
                        <div className="text-sm text-white/80 uppercase tracking-wide mb-1">Maturity Value</div>
                        <div className="text-4xl font-extrabold text-white tracking-tight">
                            {formatCurrency(result.totalValue)}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-white/10 pb-3">
                            <span className="text-white/60">Invested Amount</span>
                            <span className="text-white font-medium">{formatCurrency(result.invested)}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/10 pb-3">
                            <span className="text-white/60">Est. Returns</span>
                            <span className="text-white font-medium text-emerald-400">{formatCurrency(result.wealthGained)}</span>
                        </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-white/10">
                        <h4 className="text-sm font-semibold text-white/80 mb-4">Growth Projection</h4>
                        <GrowthLineChart
                            data={result.chartData}
                            lines={[
                                { dataKey: 'invested', name: 'Invested', color: '#8884d8' },
                                { dataKey: 'value', name: 'Value', color: '#10b981' }
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LumpsumCalculator;
