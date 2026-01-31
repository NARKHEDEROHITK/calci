import { useState, useMemo } from 'react';
import { FaChartLine } from 'react-icons/fa';
import Header from '../../../common/Header';
import CalculatorInput from '../../../common/CalculatorInput';
import ResultCard from '../../../common/ResultCard';
import { calculateCAGR } from '../../../../utils/financeFormulas';
import GrowthLineChart from '../../../common/charts/GrowthLineChart';

const CAGRCalculator = () => {
    const [beginningValue, setBeginningValue] = useState(10000);
    const [endingValue, setEndingValue] = useState(25000);
    const [years, setYears] = useState(5);

    const results = useMemo(() => {
        return calculateCAGR(beginningValue, endingValue, years);
    }, [beginningValue, endingValue, years]);

    return (
        <div className="flex flex-col items-center p-4 md:p-8">
            <Header
                icon={FaChartLine}
                title="CAGR Calculator"
                subtitle="Calculate Compound Annual Growth Rate"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl">
                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-100">
                    <h2 className="text-xl font-semibold mb-6">Investment Details</h2>

                    <CalculatorInput
                        label="Beginning Value"
                        value={beginningValue}
                        onChange={setBeginningValue}
                        min={100}
                        max={10000000}
                        step={1000}
                        prefix="₹"
                        unit=""
                    />

                    <CalculatorInput
                        label="Ending Value"
                        value={endingValue}
                        onChange={setEndingValue}
                        min={100}
                        max={100000000}
                        step={1000}
                        prefix="₹"
                        unit=""
                    />

                    <CalculatorInput
                        label="Duration"
                        value={years}
                        onChange={setYears}
                        min={1}
                        max={50}
                        step={1}
                        unit="Years"
                    />
                </div>

                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-200">
                    <h2 className="text-xl font-semibold mb-6">Result</h2>

                    <div className="gradient-primary rounded-2xl p-5 text-center mb-6">
                        <div className="text-sm text-white/80 uppercase tracking-wide mb-1">CAGR</div>
                        <div className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                            {results.cagr.toFixed(2)}%
                        </div>
                        <div className="text-sm text-white/60 mt-2">Annualized Return</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <ResultCard
                            label="Absolute Return"
                            value={endingValue - beginningValue}
                            subText="Total Profit"
                        />
                        <ResultCard
                            label="Growth Multiple"
                            value={(endingValue / beginningValue).toFixed(2) + 'x'}
                            isCurrency={false}
                            subText="Total Multiplier"
                        />
                    </div>

                    <div className="mt-8 border-t border-white/10 pt-8">
                        <h3 className="text-lg font-semibold text-white/90 mb-4">Growth Projection</h3>
                        <GrowthLineChart
                            data={results.chartData}
                            lines={[
                                { dataKey: 'value', name: 'Investment Value', color: '#10b981' }
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

export default CAGRCalculator;
