import { useState, useMemo } from 'react';
import { FaBuilding } from 'react-icons/fa';
import Header from '../../../common/Header';
import CalculatorInput from '../../../common/CalculatorInput';
import { calculateHRA } from '../../../../utils/taxFormulas';
import { formatCurrency } from '../../../../utils/formatters';

const HRACalculator = () => {
    const [basic, setBasic] = useState(500000); // Annual
    const [hraReceived, setHraReceived] = useState(250000);
    const [rentPaid, setRentPaid] = useState(240000);
    const [isMetro, setIsMetro] = useState(true);

    const result = useMemo(() => calculateHRA(basic, hraReceived, rentPaid, isMetro), [basic, hraReceived, rentPaid, isMetro]);

    return (
        <div className="flex flex-col items-center p-4 md:p-8">
            <Header
                icon={FaBuilding}
                title="HRA Calculator"
                subtitle="Calculate House Rent Allowance Exemption"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl">
                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-100">
                    <h2 className="text-xl font-semibold mb-6">Salary Details</h2>

                    <CalculatorInput
                        label="Basic Salary (Yearly)"
                        value={basic}
                        onChange={setBasic}
                        min={0}
                        max={10000000}
                        step={1000}
                        unit="₹"
                        formatValue={formatCurrency}
                    />
                    <CalculatorInput
                        label="HRA Received (Yearly)"
                        value={hraReceived}
                        onChange={setHraReceived}
                        min={0}
                        max={5000000}
                        step={1000}
                        unit="₹"
                        formatValue={formatCurrency}
                    />
                    <CalculatorInput
                        label="Rent Paid (Yearly)"
                        value={rentPaid}
                        onChange={setRentPaid}
                        min={0}
                        max={5000000}
                        step={1000}
                        unit="₹"
                        formatValue={formatCurrency}
                    />

                    <div className="mb-6">
                        <label className="block text-sm text-white/70 font-medium mb-2">City Type</label>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setIsMetro(true)}
                                className={`flex-1 py-3 rounded-xl border border-white/10 font-medium transition-all ${isMetro ? 'bg-primary-500 text-white' : 'bg-white/5 text-white/70 hover:bg-white/10'}`}
                            >
                                Metro (50%)
                            </button>
                            <button
                                onClick={() => setIsMetro(false)}
                                className={`flex-1 py-3 rounded-xl border border-white/10 font-medium transition-all ${!isMetro ? 'bg-primary-500 text-white' : 'bg-white/5 text-white/70 hover:bg-white/10'}`}
                            >
                                Non-Metro (40%)
                            </button>
                        </div>
                        <p className="text-xs text-white/40 mt-2">Metro cities: Delhi, Mumbai, Kolkata, Chennai</p>
                    </div>
                </div>

                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-200">
                    <h2 className="text-xl font-semibold mb-6">Exemption Calculation</h2>

                    <div className="gradient-primary rounded-2xl p-5 text-center mb-6">
                        <div className="text-sm text-white/80 uppercase tracking-wide mb-1">HRA Exemption Amount</div>
                        <div className="text-4xl font-extrabold text-white tracking-tight">
                            {formatCurrency(result.exemption)}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-white/10 pb-3">
                            <span className="text-white/60">Taxable HRA</span>
                            <span className="text-white font-medium text-red-400">{formatCurrency(result.taxable)}</span>
                        </div>

                        <div className="mt-4">
                            <h4 className="text-sm font-semibold text-white/80 mb-2">Exemption is lowest of:</h4>
                            <ul className="space-y-2 text-sm text-white/60">
                                <li className="flex justify-between">
                                    <span>1. Actual HRA Received</span>
                                    <span>{formatCurrency(result.breakdown.actual)}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>2. Rent Paid - 10% Basic</span>
                                    <span>{formatCurrency(result.breakdown.rentMinusBasic)}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>3. {isMetro ? '50%' : '40%'} of Basic</span>
                                    <span>{formatCurrency(result.breakdown.metroLimit)}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HRACalculator;
