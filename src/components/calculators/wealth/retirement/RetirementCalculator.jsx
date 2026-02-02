import { useState, useMemo } from 'react';
import { FaUmbrellaBeach } from 'react-icons/fa';
import Header from '../../../common/Header';
import CalculatorInput from '../../../common/CalculatorInput';
import { calculateRetirement } from '../../../../utils/wealthFormulas';
import { formatCurrency } from '../../../../utils/formatters';

const RetirementCalculator = () => {
    const [currentAge, setCurrentAge] = useState(30);
    const [retirementAge, setRetirementAge] = useState(60);
    const [monthlyExpenses, setMonthlyExpenses] = useState(30000);
    const [inflation, setInflation] = useState(6);

    const result = useMemo(() => calculateRetirement(currentAge, retirementAge, monthlyExpenses, inflation), [currentAge, retirementAge, monthlyExpenses, inflation]);

    return (
        <div className="flex flex-col items-center p-4 md:p-8">
            <Header
                icon={FaUmbrellaBeach}
                title="Retirement Calculator"
                subtitle="Calculate Retirement Corpus Required"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl">
                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-100">
                    <h2 className="text-xl font-semibold mb-6">Your Details</h2>

                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <CalculatorInput
                            label="Current Age"
                            value={currentAge}
                            onChange={(v) => {
                                setCurrentAge(v);
                                if (v >= retirementAge) setRetirementAge(v + 1);
                            }}
                            min={18}
                            max={60}
                            step={1}
                            unit="Yrs"
                        />
                        <CalculatorInput
                            label="Retirement Age"
                            value={retirementAge}
                            onChange={setRetirementAge}
                            min={currentAge + 1}
                            max={75}
                            step={1}
                            unit="Yrs"
                        />
                    </div>

                    <CalculatorInput
                        label="Current Monthly Expenses"
                        value={monthlyExpenses}
                        onChange={setMonthlyExpenses}
                        min={5000}
                        max={500000}
                        step={1000}
                        unit="₹"
                        formatValue={formatCurrency}
                    />
                    <CalculatorInput
                        label="Expected Inflation Rate"
                        value={inflation}
                        onChange={setInflation}
                        min={1}
                        max={15}
                        step={0.5}
                        unit="%"
                    />
                    <p className="text-xs text-white/40 mt-2">
                        Years to retire: {result.yearsToRetire}
                    </p>
                </div>

                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-200">
                    <h2 className="text-xl font-semibold mb-6">Retirement Goal</h2>

                    <div className="gradient-primary rounded-2xl p-5 text-center mb-6">
                        <div className="text-sm text-white/80 uppercase tracking-wide mb-1">Required Corpus</div>
                        <div className="text-4xl font-extrabold text-white tracking-tight">
                            {formatCurrency(result.requiredCorpus)}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-white/5 rounded-xl p-4">
                            <span className="block text-white/60 text-sm mb-1">Future Monthly Expenses (@{retirementAge} yrs)</span>
                            <span className="text-white font-bold text-xl">{formatCurrency(result.monthlyExpensesAtRetirement)}</span>
                            <div className="text-xs text-white/40 mt-1">Adjusted for {inflation}% annual inflation</div>
                        </div>

                        <div className="text-sm text-white/50 bg-blue-500/10 border border-blue-500/20 p-3 rounded-xl mt-4">
                            This calculation assumes you need 25x of your annual expenses at retirement to sustain a typical lifestyle (Rule of 25).
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RetirementCalculator;
