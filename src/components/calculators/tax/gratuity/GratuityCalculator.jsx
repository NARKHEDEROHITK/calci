import { useState, useMemo } from 'react';
import { FaHandHoldingHeart } from 'react-icons/fa';
import Header from '../../../common/Header';
import CalculatorInput from '../../../common/CalculatorInput';
import { calculateGratuity } from '../../../../utils/taxFormulas';
import { formatCurrency } from '../../../../utils/formatters';

const GratuityCalculator = () => {
    const [salary, setSalary] = useState(100000); // Last Drawn Monthly
    const [years, setYears] = useState(5);

    const result = useMemo(() => calculateGratuity(salary, years), [salary, years]);

    return (
        <div className="flex flex-col items-center p-4 md:p-8">
            <Header
                icon={FaHandHoldingHeart}
                title="Gratuity Calculator"
                subtitle="Calculate Retirement Gratuity Benefit"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl">
                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-100">
                    <h2 className="text-xl font-semibold mb-6">Service Details</h2>

                    <CalculatorInput
                        label="Last Drawn Monthly Salary"
                        value={salary}
                        onChange={setSalary}
                        min={1000}
                        max={10000000}
                        step={1000}
                        unit="₹"
                        formatValue={formatCurrency}
                    />
                    <p className="text-xs text-white/40 mb-6 -mt-2">Basic + DA</p>

                    <CalculatorInput
                        label="Years of Service"
                        value={years}
                        onChange={setYears}
                        min={1}
                        max={60}
                        step={1}
                        unit="Yrs"
                    />
                </div>

                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-200">
                    <h2 className="text-xl font-semibold mb-6">Gratuity Payable</h2>

                    <div className="gradient-primary rounded-2xl p-5 text-center mb-6">
                        <div className="text-sm text-white/80 uppercase tracking-wide mb-1">Total Gratuity</div>
                        <div className="text-4xl font-extrabold text-white tracking-tight">
                            {formatCurrency(result.gratuityAmount)}
                        </div>
                        {!result.eligible && (
                            <div className="text-sm text-red-200 mt-2 bg-red-500/20 py-1 px-3 rounded-lg inline-block">
                                Minimum 5 years required for eligibility
                            </div>
                        )}
                    </div>

                    <div className="bg-white/5 rounded-xl p-4 text-sm text-white/60">
                        <p className="mb-2 font-semibold text-white">How it is calculated:</p>
                        <p>(Last Drawn Salary × Years × 15) / 26</p>
                        <p className="mt-2 text-white/40">Note: Max gratuity tax-exempt limit is usually ₹20 Lakhs.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GratuityCalculator;
