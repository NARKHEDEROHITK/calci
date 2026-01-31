import { useState, useMemo } from 'react';
import { FaLandmark } from 'react-icons/fa'; // Changed from FaBank (deprecated) to FaLandmark
import Header from '../../../common/Header';
import CalculatorInput from '../../../common/CalculatorInput';
import ResultCard from '../../../common/ResultCard';
import { calculateFD, calculateRD } from '../../../../utils/financeFormulas';
import GrowthLineChart from '../../../common/charts/GrowthLineChart';

const FDRDCalculator = () => {
    const [mode, setMode] = useState('FD'); // 'FD' or 'RD'
    const [amount, setAmount] = useState(100000); // 1 Lakh default Principal / Deposit
    const [rate, setRate] = useState(6.5);
    const [tenure, setTenure] = useState(5);

    const results = useMemo(() => {
        if (mode === 'FD') {
            return calculateFD(amount, rate, tenure);
        } else {
            return calculateRD(amount, rate, tenure);
        }
    }, [mode, amount, rate, tenure]);

    return (
        <div className="flex flex-col items-center p-4 md:p-8">
            <Header
                icon={FaLandmark}
                title="FD & RD Calculator"
                subtitle="Calculate Maturity for Fixed and Recurring Deposits"
            />

            <div className="flex bg-white/5 p-1 rounded-xl mb-8">
                <button
                    className={`px-6 py-2 rounded-lg font-medium transition-all ${mode === 'FD' ? 'bg-primary-500 text-white shadow-lg' : 'text-white/70 hover:text-white'}`}
                    onClick={() => { setMode('FD'); setAmount(100000); }}
                >
                    Fixed Deposit (FD)
                </button>
                <button
                    className={`px-6 py-2 rounded-lg font-medium transition-all ${mode === 'RD' ? 'bg-primary-500 text-white shadow-lg' : 'text-white/70 hover:text-white'}`}
                    onClick={() => { setMode('RD'); setAmount(5000); }}
                >
                    Recurring Deposit (RD)
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl">
                {/* Inputs */}
                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-100">
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
                        <FaLandmark className="text-primary-500" />
                        {mode} Details
                    </h2>

                    <CalculatorInput
                        label={mode === 'FD' ? "Total Investment" : "Monthly Deposit"}
                        value={amount}
                        onChange={setAmount}
                        min={mode === 'FD' ? 5000 : 500}
                        max={mode === 'FD' ? 10000000 : 100000}
                        step={mode === 'FD' ? 5000 : 500}
                        prefix="₹"
                    />

                    <CalculatorInput
                        label="Interest Rate"
                        value={rate}
                        onChange={setRate}
                        min={3}
                        max={15}
                        step={0.1}
                        unit="%"
                    />

                    <CalculatorInput
                        label="Time Period"
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
                    <h2 className="text-xl font-semibold mb-6">Maturity Details</h2>

                    <div className="gradient-primary rounded-2xl p-5 text-center mb-6">
                        <div className="text-sm text-white/80 uppercase tracking-wide mb-1">Maturity Amount</div>
                        <div className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                            {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(results.maturityAmount)}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <ResultCard
                            label="Invested Amount"
                            value={mode === 'FD' ? amount : results.totalInvestment}
                            subText={mode === 'FD' ? "One-time" : `₹${amount} / month`}
                        />
                        <ResultCard
                            label="Interest Earned"
                            value={results.totalInterest}
                            subText="Total wealth gain"
                        />
                    </div>

                    <div className="mt-8 border-t border-white/10 pt-8">
                        <h3 className="text-lg font-semibold text-white/90 mb-4">Growth Over Time</h3>
                        <GrowthLineChart
                            data={results.chartData}
                            lines={[
                                { dataKey: mode === 'FD' ? 'principal' : 'invested', name: 'Invested', color: '#8884d8' },
                                { dataKey: 'value', name: 'Value', color: '#10b981' }
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

export default FDRDCalculator;
