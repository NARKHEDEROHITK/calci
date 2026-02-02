import { useState, useMemo } from 'react';
import { FaChartLine } from 'react-icons/fa';
import Header from '../../../common/Header';
import CalculatorInput from '../../../common/CalculatorInput';
import { calculateInflation } from '../../../../utils/wealthFormulas';
import { formatCurrency } from '../../../../utils/formatters';
import GrowthLineChart from '../../../common/charts/GrowthLineChart';

const InflationCalculator = () => {
    const [amount, setAmount] = useState(10000);
    const [rate, setRate] = useState(6);
    const [years, setYears] = useState(10);

    const result = useMemo(() => calculateInflation(amount, rate, years), [amount, rate, years]);

    return (
        <div className="flex flex-col items-center p-4 md:p-8">
            <Header
                icon={FaChartLine}
                title="Inflation Calculator"
                subtitle="Future Value of Money"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl">
                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-100">
                    <h2 className="text-xl font-semibold mb-6">Scenario</h2>

                    <CalculatorInput
                        label="Current Amount"
                        value={amount}
                        onChange={setAmount}
                        min={100}
                        max={10000000}
                        step={100}
                        unit="₹"
                        formatValue={formatCurrency}
                    />
                    <CalculatorInput
                        label="Average Inflation Rate"
                        value={rate}
                        onChange={setRate}
                        min={1}
                        max={20}
                        step={0.1}
                        unit="%"
                    />
                    <CalculatorInput
                        label="Time Period"
                        value={years}
                        onChange={setYears}
                        min={1}
                        max={50}
                        step={1}
                        unit="Yrs"
                    />
                </div>

                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-200">
                    <h2 className="text-xl font-semibold mb-6">Future Cost</h2>

                    <div className="gradient-primary rounded-2xl p-5 text-center mb-6">
                        <div className="text-sm text-white/80 uppercase tracking-wide mb-1">Required Amount in Future</div>
                        <div className="text-4xl font-extrabold text-white tracking-tight">
                            {formatCurrency(result.futureValue)}
                        </div>
                    </div>

                    <div className="text-white/60 text-sm mb-6">
                        To buy what <strong>{formatCurrency(amount)}</strong> buys today, you will need <strong>{formatCurrency(result.futureValue)}</strong> after {years} years.
                    </div>

                    <div className="mt-8 pt-4 border-t border-white/10">
                        <h4 className="text-sm font-semibold text-white/80 mb-4">Cost Escalation Chart</h4>
                        <GrowthLineChart
                            data={result.chartData}
                            lines={[
                                { dataKey: 'amount', name: 'Future Cost', color: '#f59e0b' }
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InflationCalculator;
