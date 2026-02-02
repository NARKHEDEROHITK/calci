import { useState, useMemo } from 'react';
import { FaPiggyBank } from 'react-icons/fa';
import Header from '../../../common/Header';
import CalculatorInput from '../../../common/CalculatorInput';
import { calculatePF } from '../../../../utils/taxFormulas';
import { formatCurrency } from '../../../../utils/formatters';
import GrowthLineChart from '../../../common/charts/GrowthLineChart';

const PFCalculator = () => {
    const [basic, setBasic] = useState(50000); // Monthly
    const [empContrib, setEmpContrib] = useState(12);
    const [employerContrib, setEmployerContrib] = useState(3.67);
    const [years, setYears] = useState(15);

    const result = useMemo(() => calculatePF(basic, empContrib, employerContrib, years), [basic, empContrib, employerContrib, years]);

    return (
        <div className="flex flex-col items-center p-4 md:p-8">
            <Header
                icon={FaPiggyBank}
                title="PF Calculator"
                subtitle="Estimate Provident Fund Accumulation"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl">
                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-100">
                    <h2 className="text-xl font-semibold mb-6">Investment Details</h2>

                    <CalculatorInput
                        label="Monthly Basic Salary"
                        value={basic}
                        onChange={setBasic}
                        min={1000}
                        max={1000000}
                        step={500}
                        unit="₹"
                        formatValue={formatCurrency}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <CalculatorInput
                            label="Your Contribution"
                            value={empContrib}
                            onChange={setEmpContrib}
                            min={1}
                            max={20}
                            step={0.5}
                            unit="%"
                        />
                        <CalculatorInput
                            label="Employer Contrib"
                            value={employerContrib}
                            onChange={setEmployerContrib}
                            min={0}
                            max={12}
                            step={0.01}
                            unit="%"
                        />
                    </div>
                    <p className="text-xs text-white/40 mb-6 -mt-2">Employer usually contributes 12% total (3.67% to PF, 8.33% to EPS)</p>

                    <CalculatorInput
                        label="Duration"
                        value={years}
                        onChange={setYears}
                        min={1}
                        max={40}
                        step={1}
                        unit="Yrs"
                    />
                </div>

                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-200">
                    <h2 className="text-xl font-semibold mb-6">Maturity Estimation</h2>

                    <div className="gradient-primary rounded-2xl p-5 text-center mb-6">
                        <div className="text-sm text-white/80 uppercase tracking-wide mb-1">Total PF Balance</div>
                        <div className="text-4xl font-extrabold text-white tracking-tight">
                            {formatCurrency(result.totalBalance)}
                        </div>
                        <div className="text-sm text-white/70 mt-1">
                            @ 8.25% Interest Rate
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-white/10 pb-3">
                            <span className="text-white/60">Total Invested</span>
                            <span className="text-white font-medium">{formatCurrency(result.totalInvested)}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/10 pb-3">
                            <span className="text-white/60">Interest Earned</span>
                            <span className="text-white font-medium text-emerald-400">{formatCurrency(result.totalInterest)}</span>
                        </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-white/10">
                        <h4 className="text-sm font-semibold text-white/80 mb-4">Growth Chart</h4>
                        <GrowthLineChart
                            data={result.chartData}
                            lines={[
                                { dataKey: 'invested', name: 'Total Invested', color: '#8884d8' },
                                { dataKey: 'balance', name: 'Total Balance', color: '#10b981' }
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PFCalculator;
