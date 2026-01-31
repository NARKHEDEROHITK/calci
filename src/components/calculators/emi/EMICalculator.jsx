import { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import {
    FaChartPie,
    FaPiggyBank,
    FaChevronDown,
    FaMoneyBillWave,
    FaExchangeAlt,
    FaListAlt
} from 'react-icons/fa';
import {
    HiCash
} from 'react-icons/hi';
import {
    BsGraphUp
} from 'react-icons/bs';
import Header from '../../common/Header';
import { formatCurrency, formatTime, getSliderStyle } from '../../../utils/formatters';

const EMICalculator = () => {
    const [principal, setPrincipal] = useState(5000000); // Default: 50 Lakh
    const [interestRate, setInterestRate] = useState(8.5);
    const [tenure, setTenure] = useState(20); // Default: 20 years
    const [extraEMIFrequency, setExtraEMIFrequency] = useState(null);
    const [emiStepUpPercent, setEmiStepUpPercent] = useState(0); // EMI increase % per year
    const [isComparisonOpen, setIsComparisonOpen] = useState(true);
    const [isScheduleOpen, setIsScheduleOpen] = useState(false);

    // Extra EMI frequency options
    const extraEMIOptions = [
        { value: 'quarterly', label: 'Quarterly', monthsInterval: 3 },
        { value: 'half-yearly', label: 'Half-Yearly', monthsInterval: 6 },
        { value: 'yearly', label: 'Yearly', monthsInterval: 12 }
    ];

    // Toggle handler for extra EMI buttons
    const handleExtraEMIToggle = (value) => {
        setExtraEMIFrequency(prev => prev === value ? null : value);
    };

    const calculations = useMemo(() => {
        const monthlyRate = interestRate / 12 / 100;
        const months = tenure * 12;

        const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, months) /
            (Math.pow(1 + monthlyRate, months) - 1);

        const totalAmount = emi * months;
        const totalInterest = totalAmount - principal;
        const principalPercentage = (principal / totalAmount) * 100;
        const interestPercentage = (totalInterest / totalAmount) * 100;

        return {
            emi: isNaN(emi) ? 0 : emi,
            totalAmount: isNaN(totalAmount) ? 0 : totalAmount,
            totalInterest: isNaN(totalInterest) ? 0 : totalInterest,
            principalPercentage: isNaN(principalPercentage) ? 0 : principalPercentage,
            interestPercentage: isNaN(interestPercentage) ? 0 : interestPercentage,
            months
        };
    }, [principal, interestRate, tenure]);

    // Generate detailed EMI schedule with SEPARATE rows for regular and extra EMI
    const emiSchedule = useMemo(() => {
        const monthlyRate = interestRate / 12 / 100;
        const baseEMI = calculations.emi;
        const selectedOption = extraEMIOptions.find(opt => opt.value === extraEMIFrequency);
        const extraEMIInterval = selectedOption?.monthsInterval || 0;
        const stepUpRate = emiStepUpPercent / 100;

        if (baseEMI === 0) return [];

        let remainingPrincipal = principal;
        let schedule = [];
        let monthCount = 0;
        let cumulativeInterest = 0;
        let cumulativePrincipal = 0;
        let currentYear = 1;
        let currentEMI = baseEMI;

        while (remainingPrincipal > 0 && monthCount < calculations.months * 2) {
            monthCount++;
            const year = Math.ceil(monthCount / 12);
            const monthInYear = ((monthCount - 1) % 12) + 1;

            // Step-Up: Increase EMI at the start of each new year (after first year)
            if (year > currentYear && stepUpRate > 0) {
                currentEMI = currentEMI * (1 + stepUpRate);
                currentYear = year;
            }

            // Calculate step-up increase from base EMI
            const stepUpIncrease = currentEMI - baseEMI;

            // Calculate interest for this month
            const monthlyInterest = remainingPrincipal * monthlyRate;

            // Calculate principal paid - if remaining is less than (EMI - interest), pay only remaining
            const maxPrincipalFromEMI = currentEMI - monthlyInterest;
            const principalPaid = Math.min(maxPrincipalFromEMI, remainingPrincipal);

            // Actual amount paid this month (could be less than EMI in final month)
            const actualAmountPaid = principalPaid + monthlyInterest;

            remainingPrincipal -= principalPaid;

            cumulativeInterest += monthlyInterest;
            cumulativePrincipal += principalPaid;

            const isLoanClosedAfterRegular = remainingPrincipal <= 0;

            // Add Regular EMI row
            schedule.push({
                month: monthCount,
                year,
                monthInYear,
                paymentType: 'regular',
                amount: actualAmountPaid,
                baseEMI: baseEMI,
                currentEMI: currentEMI,
                stepUpIncrease: stepUpIncrease,
                principal: principalPaid,
                interest: monthlyInterest,
                balance: Math.max(0, remainingPrincipal),
                cumulativeInterest,
                cumulativePrincipal,
                isExtraPaymentRow: false,
                isLastMonth: isLoanClosedAfterRegular
            });

            // Check if extra EMI is paid this month - add SEPARATE row (only if loan not already closed)
            if (extraEMIInterval > 0 && monthCount % extraEMIInterval === 0 && remainingPrincipal > 0) {
                // Extra EMI: pay remaining principal or current EMI, whichever is less
                const extraPrincipalPaid = Math.min(currentEMI, remainingPrincipal);
                remainingPrincipal -= extraPrincipalPaid;
                cumulativePrincipal += extraPrincipalPaid;

                // Add Extra EMI row (separate from regular)
                schedule.push({
                    month: monthCount,
                    year,
                    monthInYear,
                    paymentType: 'extra',
                    amount: extraPrincipalPaid,
                    baseEMI: baseEMI,
                    currentEMI: currentEMI,
                    stepUpIncrease: stepUpIncrease,
                    principal: extraPrincipalPaid,
                    interest: 0,
                    balance: Math.max(0, remainingPrincipal),
                    cumulativeInterest,
                    cumulativePrincipal,
                    isExtraPaymentRow: true,
                    isLastMonth: remainingPrincipal <= 0
                });
            }

            if (remainingPrincipal < 1) remainingPrincipal = 0;
        }

        return schedule;
    }, [principal, interestRate, tenure, extraEMIFrequency, emiStepUpPercent, calculations]);

    // Combined calculations for Extra EMI + Step-Up
    const extraEMICalculations = useMemo(() => {
        const monthlyRate = interestRate / 12 / 100;
        const baseEMI = calculations.emi;
        const selectedOption = extraEMIOptions.find(opt => opt.value === extraEMIFrequency);
        const extraEMIInterval = selectedOption?.monthsInterval || 0;
        const stepUpRate = emiStepUpPercent / 100;

        // If no extra features are active, return base values
        if (extraEMIInterval === 0 && stepUpRate === 0) {
            return {
                newTenureMonths: calculations.months,
                interestSaved: 0,
                timeSavedMonths: 0,
                totalExtraEMIs: 0,
                newTotalInterest: calculations.totalInterest,
                newTotalAmount: calculations.totalAmount,
                totalAmountPaid: calculations.totalAmount
            };
        }

        let remainingPrincipal = principal;
        let totalInterestPaid = 0;
        let totalAmountPaid = 0;
        let monthCount = 0;
        let extraEMICount = 0;
        let currentYear = 1;
        let currentEMI = baseEMI;

        while (remainingPrincipal > 0 && monthCount < calculations.months * 2) {
            monthCount++;
            const year = Math.ceil(monthCount / 12);

            // Step-Up: Increase EMI at the start of each new year
            if (year > currentYear && stepUpRate > 0) {
                currentEMI = currentEMI * (1 + stepUpRate);
                currentYear = year;
            }

            const monthlyInterest = remainingPrincipal * monthlyRate;
            totalInterestPaid += monthlyInterest;

            const maxPrincipalFromEMI = currentEMI - monthlyInterest;
            const principalPaid = Math.min(maxPrincipalFromEMI, remainingPrincipal);
            const actualEMIPaid = principalPaid + monthlyInterest;
            totalAmountPaid += actualEMIPaid;
            remainingPrincipal -= principalPaid;

            // Extra EMI logic
            if (extraEMIInterval > 0 && monthCount % extraEMIInterval === 0 && remainingPrincipal > 0) {
                extraEMICount++;
                const extraPrincipalPaid = Math.min(currentEMI, remainingPrincipal);
                totalAmountPaid += extraPrincipalPaid;
                remainingPrincipal -= extraPrincipalPaid;
            }

            if (remainingPrincipal < 1) remainingPrincipal = 0;
        }

        const interestSaved = calculations.totalInterest - totalInterestPaid;
        const timeSavedMonths = calculations.months - monthCount;
        const newTotalAmount = principal + totalInterestPaid;

        return {
            newTenureMonths: monthCount,
            interestSaved: isNaN(interestSaved) ? 0 : Math.max(0, interestSaved),
            timeSavedMonths: isNaN(timeSavedMonths) ? 0 : Math.max(0, timeSavedMonths),
            totalExtraEMIs: extraEMICount,
            newTotalInterest: totalInterestPaid,
            newTotalAmount: newTotalAmount,
            totalAmountPaid: totalAmountPaid
        };
    }, [principal, interestRate, tenure, extraEMIFrequency, emiStepUpPercent, calculations]);

    return (
        <div className="flex flex-col items-center p-4 md:p-8">
            {/* Header */}
            <Header
                icon={FaChartPie}
                title="EMI Calculator"
                subtitle="Plan your loan with precision"
            />

            {/* Main Calculator Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl">

                {/* Loan Details Card */}
                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-100">
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
                        <FaMoneyBillWave className="text-primary-500" />
                        Loan Details
                    </h2>

                    {/* Loan Amount */}
                    <div className="mb-6">
                        <label className="flex justify-between items-center mb-2 text-sm text-white/70 font-medium">
                            <span>Loan Amount</span>
                            <span className="text-white font-semibold text-base">{formatCurrency(principal)}</span>
                        </label>
                        <input
                            type="range"
                            className="range-slider w-full"
                            min="100000"
                            max="50000000"
                            step="100000"
                            value={principal}
                            onChange={(e) => setPrincipal(Number(e.target.value))}
                            style={getSliderStyle(principal, 100000, 50000000)}
                        />
                        <div className="relative mt-3">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 font-medium">₹</span>
                            <input
                                type="number"
                                className="w-full pl-10 pr-4 py-3 bg-white/[0.08] border border-white/10 rounded-lg text-white font-medium focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                                value={principal}
                                onChange={(e) => setPrincipal(Number(e.target.value))}
                                min="10000"
                                max="100000000"
                            />
                        </div>
                    </div>

                    {/* Interest Rate */}
                    <div className="mb-6">
                        <label className="flex justify-between items-center mb-2 text-sm text-white/70 font-medium">
                            <span>Interest Rate (% p.a.)</span>
                            <span className="text-white font-semibold text-base">{interestRate}%</span>
                        </label>
                        <input
                            type="range"
                            className="range-slider w-full"
                            min="1"
                            max="20"
                            step="0.1"
                            value={interestRate}
                            onChange={(e) => setInterestRate(Number(e.target.value))}
                            style={getSliderStyle(interestRate, 1, 20)}
                        />
                        <div className="relative mt-3">
                            <input
                                type="number"
                                className="w-full pl-4 pr-10 py-3 bg-white/[0.08] border border-white/10 rounded-lg text-white font-medium focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                                value={interestRate}
                                onChange={(e) => setInterestRate(Number(e.target.value))}
                                min="1"
                                max="30"
                                step="0.1"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 font-medium">%</span>
                        </div>
                    </div>

                    {/* Loan Tenure */}
                    <div className="mb-6">
                        <label className="flex justify-between items-center mb-2 text-sm text-white/70 font-medium">
                            <span>Loan Tenure</span>
                            <span className="text-white font-semibold text-base">{tenure} Years ({calculations.months} Months)</span>
                        </label>
                        <input
                            type="range"
                            className="range-slider w-full"
                            min="1"
                            max="30"
                            step="1"
                            value={tenure}
                            onChange={(e) => setTenure(Number(e.target.value))}
                            style={getSliderStyle(tenure, 1, 30)}
                        />
                        <div className="relative mt-3">
                            <input
                                type="number"
                                className="w-full pl-4 pr-12 py-3 bg-white/[0.08] border border-white/10 rounded-lg text-white font-medium focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                                value={tenure}
                                onChange={(e) => setTenure(Number(e.target.value))}
                                min="1"
                                max="30"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 font-medium">Yrs</span>
                        </div>
                    </div>

                    {/* Extra EMI Options */}
                    <div>
                        <label className="block text-sm text-white/70 font-medium mb-2">
                            Pay Extra EMI <span className="text-white/40 text-xs">(click to toggle)</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {extraEMIOptions.map((option) => (
                                <button
                                    key={option.value}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer
                                        ${extraEMIFrequency === option.value
                                            ? 'gradient-primary text-white shadow-lg shadow-primary-500/40'
                                            : 'bg-white/[0.08] border border-white/10 text-white/70 hover:bg-white/[0.12] hover:text-white'
                                        }`}
                                    onClick={() => handleExtraEMIToggle(option.value)}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* EMI Step-Up Input */}
                    <div className="mt-6">
                        <label className="flex justify-between items-center mb-2 text-sm text-white/70 font-medium">
                            <span className="flex items-center gap-2">
                                📈 EMI Step-Up (% per year)
                                {emiStepUpPercent > 0 && (
                                    <span className="text-emerald-400 text-xs">Active</span>
                                )}
                            </span>
                            <span className={`font-semibold text-base ${emiStepUpPercent > 0 ? 'text-emerald-400' : 'text-white'}`}>
                                {emiStepUpPercent}%
                            </span>
                        </label>
                        <input
                            type="range"
                            className="range-slider w-full"
                            min="0"
                            max="20"
                            step="1"
                            value={emiStepUpPercent}
                            onChange={(e) => setEmiStepUpPercent(Number(e.target.value))}
                            style={getSliderStyle(emiStepUpPercent, 0, 20)}
                        />
                        <div className="flex justify-between text-xs text-white/40 mt-1">
                            <span>0%</span>
                            <span>Max 20%</span>
                        </div>
                    </div>
                </div>

                {/* Payment Breakdown Card */}
                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-200">
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-3 flex-wrap">
                        <BsGraphUp className="text-primary-500 text-xl" />
                        Payment Breakdown
                        {(extraEMIFrequency || emiStepUpPercent > 0) && (
                            <div className="flex gap-2 ml-auto">
                                {extraEMIFrequency && (
                                    <span className="gradient-success text-white text-xs px-2 py-1 rounded-full font-semibold">
                                        Extra EMI
                                    </span>
                                )}
                                {emiStepUpPercent > 0 && (
                                    <span className="bg-sky-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                                        Step-Up {emiStepUpPercent}%
                                    </span>
                                )}
                            </div>
                        )}
                    </h2>

                    {/* EMI Highlight */}
                    <div className="gradient-primary rounded-2xl p-5 text-center mb-4">
                        <div className="text-sm text-white/80 uppercase tracking-wide mb-1">
                            {emiStepUpPercent > 0 ? 'Base Monthly EMI' : 'Monthly EMI'}
                        </div>
                        <div className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                            {formatCurrency(calculations.emi)}
                        </div>
                        <div className="text-sm text-white/70">
                            {emiStepUpPercent > 0 ? `Year 1 (increases ${emiStepUpPercent}% yearly)` : 'per month'}
                        </div>
                    </div>

                    {/* Savings Banner - shows for Extra EMI or Step-Up */}
                    {(extraEMIFrequency || emiStepUpPercent > 0) && extraEMICalculations.interestSaved > 0 && (
                        <div className="flex items-center gap-4 bg-emerald-500/20 border border-emerald-500/30 rounded-xl p-4 mb-4">
                            <FaPiggyBank className="text-3xl text-emerald-400" />
                            <div>
                                <div className="text-lg font-bold text-emerald-400">
                                    You Save {formatCurrency(extraEMICalculations.interestSaved)}
                                </div>
                                <div className="text-sm text-white/60">
                                    {extraEMIFrequency && emiStepUpPercent > 0
                                        ? `with ${extraEMIOptions.find(o => o.value === extraEMIFrequency)?.label.toLowerCase()} extra EMI + ${emiStepUpPercent}% step-up`
                                        : extraEMIFrequency
                                            ? `by paying ${extraEMIOptions.find(o => o.value === extraEMIFrequency)?.label.toLowerCase()} extra EMI`
                                            : `with ${emiStepUpPercent}% yearly EMI step-up`
                                    }
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Recharts Pie Chart */}
                    <div className="my-6">
                        <div className="relative" style={{ height: '280px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <defs>
                                        <linearGradient id="principalGradient" x1="0" y1="0" x2="1" y2="1">
                                            <stop offset="0%" stopColor="#667eea" />
                                            <stop offset="100%" stopColor="#764ba2" />
                                        </linearGradient>
                                        <linearGradient id="interestGradient" x1="0" y1="0" x2="1" y2="1">
                                            <stop offset="0%" stopColor="#f093fb" />
                                            <stop offset="100%" stopColor="#f5576c" />
                                        </linearGradient>
                                    </defs>
                                    <Pie
                                        data={[
                                            { name: 'Principal', value: principal, color: 'url(#principalGradient)' },
                                            { name: 'Interest', value: (extraEMIFrequency || emiStepUpPercent > 0) ? extraEMICalculations.newTotalInterest : calculations.totalInterest, color: 'url(#interestGradient)' }
                                        ]}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={70}
                                        outerRadius={100}
                                        paddingAngle={3}
                                        dataKey="value"
                                        animationBegin={0}
                                        animationDuration={800}
                                        animationEasing="ease-out"
                                    >
                                        <Cell key="principal" fill="url(#principalGradient)" stroke="none" />
                                        <Cell key="interest" fill="url(#interestGradient)" stroke="none" />
                                    </Pie>
                                    <Tooltip
                                        formatter={(value) => formatCurrency(value)}
                                        contentStyle={{
                                            backgroundColor: 'rgba(15, 23, 42, 0.95)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '12px',
                                            color: '#fff',
                                            padding: '12px 16px'
                                        }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            {/* Center Text */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <div className="text-xs text-white/50 uppercase tracking-wide">Total</div>
                                <div className="text-lg font-bold text-white">
                                    {formatCurrency((extraEMIFrequency || emiStepUpPercent > 0) ? extraEMICalculations.newTotalAmount : calculations.totalAmount)}
                                </div>
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="flex justify-center gap-8 mt-2">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600"></div>
                                <div className="text-sm">
                                    <span className="text-white font-medium">Principal</span>
                                    <span className="text-white/50 ml-2">({calculations.principalPercentage.toFixed(1)}%)</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-pink-400 to-rose-500"></div>
                                <div className="text-sm">
                                    <span className="text-white font-medium">Interest</span>
                                    <span className="text-white/50 ml-2">({calculations.interestPercentage.toFixed(1)}%)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Breakdown Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 text-center hover:scale-[1.02] transition-transform">
                            <div className="text-sm text-white/50 uppercase tracking-wide mb-1">Principal</div>
                            <div className="text-lg font-bold gradient-text-primary">{formatCurrency(principal)}</div>
                        </div>
                        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 text-center hover:scale-[1.02] transition-transform">
                            <div className="text-sm text-white/50 uppercase tracking-wide mb-1">
                                {(extraEMIFrequency || emiStepUpPercent > 0) ? 'New Interest' : 'Total Interest'}
                            </div>
                            <div className={`text-lg font-bold ${(extraEMIFrequency || emiStepUpPercent > 0) ? 'text-emerald-400' : 'gradient-text-secondary'}`}>
                                {formatCurrency((extraEMIFrequency || emiStepUpPercent > 0) ? extraEMICalculations.newTotalInterest : calculations.totalInterest)}
                            </div>
                            {(extraEMIFrequency || emiStepUpPercent > 0) && extraEMICalculations.interestSaved > 0 && (
                                <div className="text-sm text-white/50 mt-1">
                                    Was: <span className="line-through text-red-400">{formatCurrency(calculations.totalInterest)}</span>
                                </div>
                            )}
                        </div>
                        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 text-center hover:scale-[1.02] transition-transform">
                            <div className="text-sm text-white/50 uppercase tracking-wide mb-1">
                                {(extraEMIFrequency || emiStepUpPercent > 0) ? 'New Tenure' : 'Tenure'}
                            </div>
                            <div className={`text-lg font-bold ${(extraEMIFrequency || emiStepUpPercent > 0) ? 'text-sky-400' : 'text-white'}`}>
                                {formatTime((extraEMIFrequency || emiStepUpPercent > 0) ? extraEMICalculations.newTenureMonths : calculations.months)}
                            </div>
                            {(extraEMIFrequency || emiStepUpPercent > 0) && extraEMICalculations.timeSavedMonths > 0 && (
                                <div className="text-sm text-white/50 mt-1">
                                    Was: <span className="line-through text-red-400">{formatTime(calculations.months)}</span>
                                </div>
                            )}
                        </div>
                        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 text-center hover:scale-[1.02] transition-transform">
                            <div className="text-sm text-white/50 uppercase tracking-wide mb-1">
                                {(extraEMIFrequency || emiStepUpPercent > 0) ? 'New Total' : 'Total Payable'}
                            </div>
                            <div className="text-lg font-bold text-white">
                                {formatCurrency((extraEMIFrequency || emiStepUpPercent > 0) ? extraEMICalculations.newTotalAmount : calculations.totalAmount)}
                            </div>
                            {(extraEMIFrequency || emiStepUpPercent > 0) && extraEMICalculations.interestSaved > 0 && (
                                <div className="text-sm text-white/50 mt-1">
                                    Was: <span className="line-through text-red-400">{formatCurrency(calculations.totalAmount)}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Savings Summary Card */}
                    {(extraEMIFrequency || emiStepUpPercent > 0) && extraEMICalculations.interestSaved > 0 && (
                        <div className="flex items-center gap-4 bg-gradient-to-r from-emerald-500/15 to-primary-500/10 border border-emerald-500/30 rounded-xl p-4 mt-4 flex-wrap">
                            <HiCash className="text-4xl text-emerald-400" />
                            <div className="flex-1 min-w-[70px] text-center">
                                <div className="text-xs text-white/50 uppercase tracking-wide">Interest Saved</div>
                                <div className="text-lg font-bold text-emerald-400">{formatCurrency(extraEMICalculations.interestSaved)}</div>
                            </div>
                            <div className="flex-1 min-w-[70px] text-center">
                                <div className="text-xs text-white/50 uppercase tracking-wide">Time Saved</div>
                                <div className="text-lg font-bold text-sky-400">{formatTime(extraEMICalculations.timeSavedMonths)}</div>
                            </div>
                            {extraEMIFrequency && (
                                <div className="flex-1 min-w-[70px] text-center">
                                    <div className="text-xs text-white/50 uppercase tracking-wide">Extra EMIs</div>
                                    <div className="text-lg font-bold text-white">{extraEMICalculations.totalExtraEMIs}</div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Side-by-Side Comparison Accordion */}
            {(extraEMIFrequency || emiStepUpPercent > 0) && (
                <div className="glass-card rounded-3xl w-full max-w-5xl mt-8 animate-fade-in-up delay-300 overflow-hidden">
                    {/* Accordion Header */}
                    <button
                        className="w-full p-6 md:p-8 flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
                        onClick={() => setIsComparisonOpen(!isComparisonOpen)}
                    >
                        <div className="flex items-center gap-3 flex-wrap">
                            <FaExchangeAlt className="text-2xl text-primary-400" />
                            <h2 className="text-xl md:text-2xl font-bold text-white">
                                Side-by-Side Comparison
                            </h2>
                            <span className="gradient-primary text-white text-xs px-3 py-1 rounded-full font-semibold">
                                {extraEMIOptions.find(o => o.value === extraEMIFrequency)?.label} Extra EMI
                            </span>
                        </div>
                        <FaChevronDown className={`text-xl text-white/70 transition-transform duration-300 ${isComparisonOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Accordion Content */}
                    <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isComparisonOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="px-6 pb-6 md:px-8 md:pb-8">
                            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-6 items-stretch">
                                {/* Without Extra EMI */}
                                <div className="bg-white/[0.03] border border-red-500/20 rounded-2xl overflow-hidden">
                                    <div className="bg-gradient-to-r from-red-500/10 to-transparent px-4 py-3 border-b border-white/10 flex items-center gap-2">
                                        <span className="text-lg">📋</span>
                                        <h3 className="text-base font-semibold text-white">Without Extra EMI</h3>
                                    </div>
                                    <div className="p-4 space-y-3">
                                        <div className="flex justify-between items-center py-2 border-b border-white/10">
                                            <span className="text-sm text-white/60">Loan Tenure</span>
                                            <span className="text-base font-semibold text-white">{formatTime(calculations.months)}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-white/10">
                                            <span className="text-sm text-white/60">Total Interest</span>
                                            <span className="text-base font-semibold text-red-400">{formatCurrency(calculations.totalInterest)}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-white/10">
                                            <span className="text-sm text-white/60">Total Payable</span>
                                            <span className="text-base font-semibold text-white">{formatCurrency(calculations.totalAmount)}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2">
                                            <span className="text-sm text-white/60">Extra EMIs</span>
                                            <span className="text-base font-semibold text-white">0</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Arrow */}
                                <div className="flex items-center justify-center py-4 md:py-0">
                                    <div className="flex flex-col items-center gap-2">
                                        <span className="text-3xl text-emerald-400 animate-arrow-pulse md:rotate-0 rotate-90">→</span>
                                        <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-xl px-3 py-2 text-center">
                                            <div className="text-xs text-emerald-400 uppercase tracking-wide">You Save</div>
                                            <div className="text-sm font-bold text-emerald-400">{formatCurrency(extraEMICalculations.interestSaved)}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* With Extra EMI */}
                                <div className="bg-gradient-to-br from-emerald-500/[0.08] to-emerald-500/[0.02] border border-emerald-500/30 rounded-2xl overflow-hidden">
                                    <div className="bg-gradient-to-r from-emerald-500/15 to-transparent px-4 py-3 border-b border-white/10 flex items-center gap-2">
                                        <span className="text-lg">🎯</span>
                                        <h3 className="text-base font-semibold text-white">With Extra EMI</h3>
                                    </div>
                                    <div className="p-4 space-y-3">
                                        <div className="flex justify-between items-center py-2 border-b border-white/10">
                                            <span className="text-sm text-white/60">Loan Tenure</span>
                                            <div className="text-right">
                                                <span className="text-base font-semibold text-emerald-400">{formatTime(extraEMICalculations.newTenureMonths)}</span>
                                                <div className="text-xs text-emerald-400">(-{formatTime(extraEMICalculations.timeSavedMonths)})</div>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-white/10">
                                            <span className="text-sm text-white/60">Total Interest</span>
                                            <span className="text-base font-semibold text-emerald-400">{formatCurrency(extraEMICalculations.newTotalInterest)}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-white/10">
                                            <span className="text-sm text-white/60">Total Payable</span>
                                            <span className="text-base font-semibold text-white">{formatCurrency(extraEMICalculations.newTotalAmount)}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2">
                                            <span className="text-sm text-white/60">Extra EMIs</span>
                                            <span className="text-base font-semibold text-white">{extraEMICalculations.totalExtraEMIs}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Summary Stats */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
                                <div className="flex items-center gap-3 p-4 bg-emerald-500/15 border border-emerald-500/30 rounded-xl hover:scale-[1.02] transition-transform">
                                    <span className="text-2xl">💰</span>
                                    <div>
                                        <div className="text-lg font-bold text-emerald-400">{formatCurrency(extraEMICalculations.interestSaved)}</div>
                                        <div className="text-xs text-white/50 uppercase tracking-wide">Interest Saved</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-sky-500/15 border border-sky-500/30 rounded-xl hover:scale-[1.02] transition-transform">
                                    <span className="text-2xl">⏱️</span>
                                    <div>
                                        <div className="text-lg font-bold text-sky-400">{formatTime(extraEMICalculations.timeSavedMonths)}</div>
                                        <div className="text-xs text-white/50 uppercase tracking-wide">Time Saved</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-white/[0.03] border border-white/10 rounded-xl hover:scale-[1.02] transition-transform">
                                    <span className="text-2xl">📅</span>
                                    <div>
                                        <div className="text-lg font-bold text-white">{extraEMICalculations.totalExtraEMIs}</div>
                                        <div className="text-xs text-white/50 uppercase tracking-wide">Extra EMIs to Pay</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* EMI Schedule Accordion */}
            {(extraEMIFrequency || emiStepUpPercent > 0) && (
                <div className="glass-card rounded-3xl w-full max-w-5xl mt-6 animate-fade-in-up delay-300 overflow-hidden">
                    {/* Accordion Header */}
                    <button
                        className="w-full p-6 md:p-8 flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
                        onClick={() => setIsScheduleOpen(!isScheduleOpen)}
                    >
                        <div className="flex items-center gap-3 flex-wrap">
                            <FaListAlt className="text-2xl text-primary-400" />
                            <h2 className="text-xl md:text-2xl font-bold text-white">
                                EMI Payment Schedule
                            </h2>
                            <span className="bg-white/10 text-white/70 text-xs px-3 py-1 rounded-full font-semibold">
                                {emiSchedule.length} Payments
                            </span>
                        </div>
                        <FaChevronDown className={`text-xl text-white/70 transition-transform duration-300 ${isScheduleOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Accordion Content */}
                    <div className={`transition-all duration-500 ease-in-out ${isScheduleOpen ? 'block' : 'hidden'}`}>
                        <div className="px-6 pb-6 md:px-8 md:pb-8">
                            {/* Legend */}
                            <div className="flex flex-wrap gap-4 mb-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded bg-emerald-500"></div>
                                    <span className="text-white/70">Extra EMI Payment</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded bg-amber-500"></div>
                                    <span className="text-white/70">Loan Closes</span>
                                </div>
                                <div className="ml-auto text-white/50 text-xs">
                                    Total: {emiSchedule.filter(r => !r.isExtraPaymentRow).length} months ({emiSchedule.length} payments)
                                </div>
                            </div>

                            {/* Note about extra EMI */}
                            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 mb-4 text-sm text-emerald-300">
                                <span className="font-semibold">💡 Note:</span> Extra EMI goes 100% to Principal (₹0 Interest) - reducing your loan faster!
                            </div>

                            {/* Step-Up Note */}
                            {emiStepUpPercent > 0 && (
                                <div className="bg-sky-500/10 border border-sky-500/30 rounded-lg p-3 mb-4 text-sm text-sky-300">
                                    <span className="font-semibold">📈 Step-Up Active ({emiStepUpPercent}% yearly):</span> EMI increases each year. Green text below amount shows increase from base EMI.
                                </div>
                            )}

                            {/* Table Container with scrolling */}
                            <div className="overflow-auto max-h-[600px] rounded-xl border border-white/10">
                                <table className="w-full text-sm">
                                    <thead className="sticky top-0 z-10">
                                        <tr className="bg-slate-900/95 backdrop-blur-sm">
                                            <th className="px-3 py-3 text-left text-xs font-semibold text-white/70 uppercase tracking-wide">Month</th>
                                            <th className="px-3 py-3 text-left text-xs font-semibold text-white/70 uppercase tracking-wide">Year</th>
                                            <th className="px-3 py-3 text-center text-xs font-semibold text-white/70 uppercase tracking-wide">Type</th>
                                            <th className="px-3 py-3 text-right text-xs font-semibold text-white/70 uppercase tracking-wide">EMI Paid</th>
                                            {emiStepUpPercent > 0 && (
                                                <th className="px-3 py-3 text-right text-xs font-semibold text-emerald-400 uppercase tracking-wide">Step-Up +</th>
                                            )}
                                            <th className="px-3 py-3 text-right text-xs font-semibold text-sky-400 uppercase tracking-wide">→ Principal</th>
                                            <th className="px-3 py-3 text-right text-xs font-semibold text-rose-400 uppercase tracking-wide">→ Interest</th>
                                            <th className="px-3 py-3 text-right text-xs font-semibold text-amber-400 uppercase tracking-wide">Balance</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {emiSchedule.map((row, index) => (
                                            <tr
                                                key={index}
                                                className={`
                                                    ${row.isExtraPaymentRow ? 'bg-emerald-500/20 border-l-4 border-l-emerald-500' : 'hover:bg-white/[0.02]'}
                                                    ${row.isLastMonth ? 'bg-amber-500/15' : ''}
                                                    transition-colors
                                                `}
                                            >
                                                <td className="px-3 py-2 text-white font-medium">
                                                    {row.month}
                                                    {row.isLastMonth && <span className="ml-1 text-amber-400">🎉</span>}
                                                </td>
                                                <td className="px-3 py-2 text-white/70">
                                                    Y{row.year} - M{row.monthInYear}
                                                </td>
                                                <td className="px-3 py-2 text-center">
                                                    {row.isExtraPaymentRow ? (
                                                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-500/30 text-emerald-300 text-xs font-bold rounded-full">
                                                            ⭐ EXTRA
                                                        </span>
                                                    ) : (
                                                        <span className="text-white/50 text-xs">Regular</span>
                                                    )}
                                                </td>
                                                <td className="px-3 py-2 text-right text-white font-medium">
                                                    {formatCurrency(row.amount)}
                                                </td>
                                                {emiStepUpPercent > 0 && (
                                                    <td className="px-3 py-2 text-right text-emerald-400 font-medium">
                                                        {row.stepUpIncrease > 0 && !row.isExtraPaymentRow
                                                            ? `+${formatCurrency(row.stepUpIncrease)}`
                                                            : '-'
                                                        }
                                                    </td>
                                                )}
                                                <td className={`px-3 py-2 text-right font-bold ${row.isExtraPaymentRow ? 'text-emerald-400' : 'text-sky-400'}`}>
                                                    {formatCurrency(row.principal)}
                                                </td>
                                                <td className={`px-3 py-2 text-right font-medium ${row.isExtraPaymentRow ? 'text-emerald-400/50' : 'text-rose-400'}`}>
                                                    {row.isExtraPaymentRow ? '₹0' : formatCurrency(row.interest)}
                                                </td>
                                                <td className="px-3 py-2 text-right text-amber-400 font-medium">
                                                    {formatCurrency(row.balance)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr className="bg-white/[0.08] font-semibold">
                                            <td colSpan="3" className="px-3 py-3 text-white uppercase text-xs">Total</td>
                                            <td className="px-3 py-3 text-right text-white">
                                                {formatCurrency(emiSchedule.reduce((sum, r) => sum + r.amount, 0))}
                                            </td>
                                            {emiStepUpPercent > 0 && (
                                                <td className="px-3 py-3 text-right text-emerald-400">
                                                    +{formatCurrency(emiSchedule.filter(r => !r.isExtraPaymentRow).reduce((sum, r) => sum + r.stepUpIncrease, 0))}
                                                </td>
                                            )}
                                            <td className="px-3 py-3 text-right text-sky-400">
                                                {formatCurrency(emiSchedule.reduce((sum, r) => sum + r.principal, 0))}
                                            </td>
                                            <td className="px-3 py-3 text-right text-rose-400">
                                                {formatCurrency(emiSchedule.reduce((sum, r) => sum + r.interest, 0))}
                                            </td>
                                            <td className="px-3 py-3 text-right text-amber-400">Closed!</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>

                            {/* Summary below table */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-3 text-center">
                                    <div className="text-xs text-white/50 uppercase">Total Payments</div>
                                    <div className="text-lg font-bold text-white">{emiSchedule.length}</div>
                                </div>
                                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 text-center">
                                    <div className="text-xs text-emerald-400 uppercase">Extra EMIs Paid</div>
                                    <div className="text-lg font-bold text-emerald-400">{emiSchedule.filter(r => r.isExtraPaymentRow).length}</div>
                                </div>
                                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-3 text-center">
                                    <div className="text-xs text-white/50 uppercase">Original Tenure</div>
                                    <div className="text-lg font-bold text-white/70 line-through">{calculations.months} months</div>
                                </div>
                                <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 text-center">
                                    <div className="text-xs text-amber-400 uppercase">Months Saved</div>
                                    <div className="text-lg font-bold text-amber-400">{calculations.months - emiSchedule.filter(r => !r.isExtraPaymentRow).length}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EMICalculator;
