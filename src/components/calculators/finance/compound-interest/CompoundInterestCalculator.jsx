import { useState, useMemo } from 'react';
import { FaCoins } from 'react-icons/fa';
import Header from '../../../common/Header';
import CalculatorInput from '../../../common/CalculatorInput';
import ResultCard from '../../../common/ResultCard';
import { calculateInterestComparison } from '../../../../utils/financeFormulas';
import GrowthLineChart from '../../../common/charts/GrowthLineChart';

const CompoundInterestCalculator = () => {
    const [principal, setPrincipal] = useState(10000);
    const [rate, setRate] = useState(8);
    const [time, setTime] = useState(5);

    const results = useMemo(() => {
        return calculateInterestComparison(principal, rate, time);
    }, [principal, rate, time]);

    return (
        <div className="flex flex-col items-center p-4 md:p-8">
            <Header
                icon={FaCoins}
                title="Compound Interest"
                subtitle="Calculate Compound Interest (CI)"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl">
                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-100">
                    <h2 className="text-xl font-semibold mb-6">Principal Details</h2>

                    <CalculatorInput
                        label="Principal Amount"
                        value={principal}
                        onChange={setPrincipal}
                        min={100}
                        max={10000000}
                        step={1000}
                        prefix="₹"
                    />

                    <CalculatorInput
                        label="Interest Rate (p.a)"
                        value={rate}
                        onChange={setRate}
                        min={1}
                        max={50}
                        step={0.1}
                        unit="%"
                    />

                    <CalculatorInput
                        label="Time Period"
                        value={time}
                        onChange={setTime}
                        min={1}
                        max={30}
                        step={0.5}
                        unit="Years"
                    />
                </div>

                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-200">
                    <h2 className="text-xl font-semibold mb-6">Interest Breakdown</h2>

                    <div className="gradient-primary rounded-2xl p-5 text-center mb-6">
                        <div className="text-sm text-white/80 uppercase tracking-wide mb-1">Total Interest</div>
                        <div className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                            {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(results.compound.interest)}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 mb-8">
                        <ResultCard
                            label="Total Amount"
                            value={results.compound.totalAmount}
                            subText="Principal + Compounded Interest"
                        />
                    </div>

                    <div className="mt-8 border-t border-white/10 pt-8">
                        <h3 className="text-lg font-semibold text-white/90 mb-4">Growth Comparison</h3>
                        <GrowthLineChart
                            data={results.chartData}
                            lines={[
                                { dataKey: 'compound', name: 'Compound Interest', color: '#10b981' },
                                { dataKey: 'simple', name: 'Simple Interest', color: '#94a3b8' }
                            ]}
                            xAxisKey="year"
                            height={250}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompoundInterestCalculator;
