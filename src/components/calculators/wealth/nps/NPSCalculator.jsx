import { useState, useMemo } from 'react';
import { FaBlind } from 'react-icons/fa';
import Header from '../../../common/Header';
import CalculatorInput from '../../../common/CalculatorInput';
import { calculateNPS } from '../../../../utils/wealthFormulas';
import { formatCurrency } from '../../../../utils/formatters';
import GrowthLineChart from '../../../common/charts/GrowthLineChart';

const NPSCalculator = () => {
    const [monthlyContribution, setMonthlyContribution] = useState(5000);
    const [rate, setRate] = useState(10);
    const [age, setAge] = useState(30);
    const [retirementAge, setRetirementAge] = useState(60);

    const result = useMemo(() => calculateNPS(monthlyContribution, rate, age, retirementAge), [monthlyContribution, rate, age, retirementAge]);

    return (
        <div className="flex flex-col items-center p-4 md:p-8">
            <Header
                icon={FaBlind}
                title="NPS Calculator"
                subtitle="National Pension System Corpus Estimator"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl">
                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-100">
                    <h2 className="text-xl font-semibold mb-6">Details</h2>

                    <CalculatorInput
                        label="Monthly Contribution"
                        value={monthlyContribution}
                        onChange={setMonthlyContribution}
                        min={500}
                        max={200000}
                        step={500}
                        unit="₹"
                        formatValue={formatCurrency}
                    />
                    <CalculatorInput
                        label="Expected Return (ROI)"
                        value={rate}
                        onChange={setRate}
                        min={5}
                        max={20}
                        step={0.5}
                        unit="%"
                    />
                    <div className="grid grid-cols-2 gap-6 mt-6">
                        <CalculatorInput
                            label="Current Age"
                            value={age}
                            onChange={(v) => {
                                setAge(v);
                                if (v >= retirementAge) setRetirementAge(v + 1);
                            }}
                            min={18}
                            max={70}
                            step={1}
                            unit="Yrs"
                        />
                        <CalculatorInput
                            label="Retirement Age"
                            value={retirementAge}
                            onChange={setRetirementAge}
                            min={age + 1} // Must be > age
                            max={75}
                            step={1}
                            unit="Yrs"
                        />
                    </div>
                    <p className="text-xs text-white/40 mt-2">Invested for {result.yearsInvested} years.</p>
                </div>

                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-200">
                    <h2 className="text-xl font-semibold mb-6">Pension Corpus</h2>

                    <div className="gradient-primary rounded-2xl p-5 text-center mb-6">
                        <div className="text-sm text-white/80 uppercase tracking-wide mb-1">Total Corpus</div>
                        <div className="text-4xl font-extrabold text-white tracking-tight">
                            {formatCurrency(result.totalCorpus)}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-white/10 pb-3">
                            <span className="text-white/60">Total Invested</span>
                            <span className="text-white font-medium">{formatCurrency(result.totalInvested)}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/10 pb-3">
                            <span className="text-white/60">Wealth Gained</span>
                            <span className="text-white font-medium text-emerald-400">{formatCurrency(result.wealthGained)}</span>
                        </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-white/10">
                        <h4 className="text-sm font-semibold text-white/80 mb-4">Investment Growth</h4>
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

export default NPSCalculator;
