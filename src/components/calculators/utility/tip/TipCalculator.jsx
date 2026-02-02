import { useState, useMemo } from 'react';
import { FaUtensils } from 'react-icons/fa';
import Header from '../../../common/Header';
import CalculatorInput from '../../../common/CalculatorInput';
import { calculateTip } from '../../../../utils/utilityFormulas';
import { formatCurrency } from '../../../../utils/formatters';

const TipCalculator = () => {
    const [bill, setBill] = useState(2000);
    const [tipPercent, setTipPercent] = useState(10);
    const [people, setPeople] = useState(2);

    const result = useMemo(() => calculateTip(bill, tipPercent, people), [bill, tipPercent, people]);

    return (
        <div className="flex flex-col items-center p-4 md:p-8">
            <Header
                icon={FaUtensils}
                title="Tip Calculator"
                subtitle="Split Bill & Calculate Tip"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl">
                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-100">
                    <h2 className="text-xl font-semibold mb-6">Bill Details</h2>

                    <CalculatorInput
                        label="Bill Amount"
                        value={bill}
                        onChange={setBill}
                        min={0}
                        max={100000}
                        step={100}
                        unit="₹"
                        formatValue={formatCurrency}
                    />

                    <CalculatorInput
                        label="Tip Percentage"
                        value={tipPercent}
                        onChange={setTipPercent}
                        min={0}
                        max={50}
                        step={1}
                        unit="%"
                    />
                    <div className="flex flex-wrap gap-2 mt-4 mb-6">
                        {[0, 5, 10, 15, 20].map(p => (
                            <button
                                key={p}
                                onClick={() => setTipPercent(p)}
                                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${tipPercent === p ? 'bg-primary-500 text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}
                            >
                                {p}%
                            </button>
                        ))}
                    </div>

                    <CalculatorInput
                        label="Number of People"
                        value={people}
                        onChange={setPeople}
                        min={1}
                        max={50}
                        step={1}
                        unit="Pax"
                    />
                </div>

                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-200">
                    <h2 className="text-xl font-semibold mb-6">Payment Summary</h2>

                    <div className="gradient-primary rounded-2xl p-5 text-center mb-6">
                        <div className="text-sm text-white/80 uppercase tracking-wide mb-1">Total Pay / Person</div>
                        <div className="text-4xl font-extrabold text-white tracking-tight">
                            {formatCurrency(result.perPerson)}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-white/10 pb-3">
                            <span className="text-white/60">Total Tip</span>
                            <span className="text-white font-medium">{formatCurrency(result.tipAmount)}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/10 pb-3">
                            <span className="text-white/60">Total Bill (Inc. Tip)</span>
                            <span className="text-white font-medium text-emerald-400">{formatCurrency(result.totalAmount)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TipCalculator;
