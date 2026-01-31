import { useState, useMemo } from 'react';
import { FaMoneyBillWave, FaHandHoldingUsd } from 'react-icons/fa';
import Header from '../../../common/Header';
import CalculatorInput from '../../../common/CalculatorInput';
import ResultCard from '../../../common/ResultCard';
import { calculateEMI } from '../../../../utils/financeFormulas';

const PersonalLoanCalculator = () => {
    const [principal, setPrincipal] = useState(200000); // 2 Lakh default
    const [rate, setRate] = useState(11); // 11% default for personal loan
    const [tenure, setTenure] = useState(3); // 3 years default

    const results = useMemo(() => {
        return calculateEMI(principal, rate, tenure);
    }, [principal, rate, tenure]);

    return (
        <div className="flex flex-col items-center p-4 md:p-8">
            <Header
                icon={FaHandHoldingUsd}
                title="Personal Loan Calculator"
                subtitle="Calculate your monthly personal loan payments"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl">
                {/* Inputs */}
                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-100">
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
                        <FaMoneyBillWave className="text-primary-500" />
                        Loan Details
                    </h2>

                    <CalculatorInput
                        label="Loan Amount"
                        value={principal}
                        onChange={setPrincipal}
                        min={10000}
                        max={5000000}
                        step={5000}
                        prefix="₹"
                        unit=""
                    />

                    <CalculatorInput
                        label="Interest Rate"
                        value={rate}
                        onChange={setRate}
                        min={5}
                        max={30}
                        step={0.1}
                        unit="%"
                    />

                    <CalculatorInput
                        label="Loan Tenure"
                        value={tenure}
                        onChange={setTenure}
                        min={1}
                        max={10}
                        step={1}
                        unit="Years"
                    />
                </div>

                {/* Results */}
                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-200">
                    <h2 className="text-xl font-semibold mb-6">Payment Breakdown</h2>

                    <div className="gradient-primary rounded-2xl p-5 text-center mb-6">
                        <div className="text-sm text-white/80 uppercase tracking-wide mb-1">Monthly EMI</div>
                        <div className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                            {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(results.emi)}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <ResultCard
                            label="Total Interest"
                            value={results.totalInterest}
                            subText="Amount you pay extra"
                        />
                        <ResultCard
                            label="Total Payable"
                            value={results.totalAmount}
                            subText="Principal + Interest"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalLoanCalculator;
