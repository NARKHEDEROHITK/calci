import { useState, useMemo } from 'react';
import { FaBriefcase } from 'react-icons/fa';
import Header from '../../../common/Header';
import CalculatorInput from '../../../common/CalculatorInput';
import ResultCard from '../../../common/ResultCard';
import { calculateSalaryHike } from '../../../../utils/financeFormulas';
import ComparisonBarChart from '../../../common/charts/ComparisonBarChart';

const SalaryHikeCalculator = () => {
    const [currentSalary, setCurrentSalary] = useState(500000); // 5 LPA
    const [hike, setHike] = useState(10); // 10%
    const [years, setYears] = useState(1);

    const results = useMemo(() => {
        return calculateSalaryHike(currentSalary, hike, years);
    }, [currentSalary, hike, years]);

    return (
        <div className="flex flex-col items-center p-4 md:p-8">
            <Header
                icon={FaBriefcase}
                title="Salary Hike Calculator"
                subtitle="Calculate your future salary after hike"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl">
                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-100">
                    <h2 className="text-xl font-semibold mb-6">Current Details</h2>

                    <CalculatorInput
                        label="Current Salary"
                        value={currentSalary}
                        onChange={setCurrentSalary}
                        min={10000}
                        max={10000000}
                        step={10000}
                        prefix="₹"
                        unit=""
                    />

                    <CalculatorInput
                        label="Hike Percentage"
                        value={hike}
                        onChange={setHike}
                        min={1}
                        max={200}
                        step={1}
                        unit="%"
                    />

                    <CalculatorInput
                        label="Years"
                        value={years}
                        onChange={setYears}
                        min={1}
                        max={10}
                        step={1}
                        unit="Yrs"
                        helperText="Compounded annually if > 1 year"
                    />
                </div>

                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-200">
                    <h2 className="text-xl font-semibold mb-6">New Salary Structure</h2>

                    <div className="gradient-primary rounded-2xl p-5 text-center mb-6">
                        <div className="text-sm text-white/80 uppercase tracking-wide mb-1">New Salary</div>
                        <div className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                            {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(results.newSalary)}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 mb-8">
                        <ResultCard
                            label="Total Growth"
                            value={results.totalGrowth}
                            subText={`Increase of ${((results.totalGrowth / currentSalary) * 100).toFixed(1)}%`}
                        />
                    </div>

                    <div className="mt-8 border-t border-white/10 pt-8">
                        <h3 className="text-lg font-semibold text-white/90 mb-4">Salary Progression</h3>
                        <ComparisonBarChart
                            data={results.chartData}
                            bars={[
                                { dataKey: 'salary', name: 'Annual Salary', color: '#10b981' }
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

export default SalaryHikeCalculator;
