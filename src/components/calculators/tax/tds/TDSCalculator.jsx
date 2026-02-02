import { useState, useMemo } from 'react';
import { FaCut } from 'react-icons/fa';
import Header from '../../../common/Header';
import CalculatorInput from '../../../common/CalculatorInput';
import { calculateTDS } from '../../../../utils/taxFormulas';
import { formatCurrency } from '../../../../utils/formatters';

const TDSCalculator = () => {
    const [amount, setAmount] = useState(100000);
    const [rate, setRate] = useState(10); // Standard 10%

    const result = useMemo(() => calculateTDS(amount, rate), [amount, rate]);

    return (
        <div className="flex flex-col items-center p-4 md:p-8">
            <Header
                icon={FaCut}
                title="TDS Calculator"
                subtitle="Calculate Tax Deducted at Source"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl">
                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-100">
                    <h2 className="text-xl font-semibold mb-6">Payment Details</h2>

                    <CalculatorInput
                        label="Payment Amount"
                        value={amount}
                        onChange={setAmount}
                        min={0}
                        max={100000000}
                        step={1000}
                        unit="₹"
                        formatValue={formatCurrency}
                    />

                    <CalculatorInput
                        label="TDS Rate"
                        value={rate}
                        onChange={setRate}
                        min={0}
                        max={100}
                        step={0.1}
                        unit="%"
                    />

                    <div className="flex flex-wrap gap-2 mt-4">
                        {[1, 2, 5, 10, 20, 30].map(r => (
                            <button
                                key={r}
                                onClick={() => setRate(r)}
                                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${rate === r ? 'bg-primary-500 text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}
                            >
                                {r}%
                            </button>
                        ))}
                    </div>
                </div>

                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-200">
                    <h2 className="text-xl font-semibold mb-6">Deduction Summary</h2>

                    <div className="gradient-primary rounded-2xl p-5 text-center mb-6">
                        <div className="text-sm text-white/80 uppercase tracking-wide mb-1">TDS To Deduct</div>
                        <div className="text-4xl font-extrabold text-white tracking-tight">
                            {formatCurrency(result.tdsAmount)}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-white/10 pb-3">
                            <span className="text-white/60">Gross Payment</span>
                            <span className="text-white font-medium">{formatCurrency(amount)}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                            <span className="text-emerald-400 font-medium">Net Amount Payable</span>
                            <span className="text-emerald-400 font-bold text-lg">{formatCurrency(result.netAmount)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TDSCalculator;
