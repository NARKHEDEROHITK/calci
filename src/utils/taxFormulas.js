export const calculateIncomeTax = (income, ageValue, regime = 'new') => {
    // Simplified Tax Slabs for FY 2024-25 (AY 2025-26)
    // New Regime (Default)
    // 0-3L: 0%
    // 3-7L: 5% (Rebate u/s 87A up to 25k if income <= 7L. Effect: 0 tax up to 7L)
    // 7-10L: 10%
    // 10-12L: 15%
    // 12-15L: 20%
    // >15L: 30%
    // Cess: 4%

    // Old Regime (Under 60)
    // 0-2.5L: 0%
    // 2.5-5L: 5% (Rebate up to 12.5k if income <= 5L)
    // 5-10L: 20%
    // >10L: 30%

    let tax = 0;
    const taxableIncome = Math.max(0, income);

    // Standard Deduction
    // For simplicity, applying 50k standard deduction for salaried by default in calculation reference or assuming 'income' is Net Taxable Income. 
    // Let's assume 'income' is Gross and apply 50k deduction for both regimes (allowed in New from 2023)
    const standardDeduction = 75000; // Increased to 75k in recent inputs or keep 50k. Let's stick to 75k as per latest interim or 50k. Let's use 75000.
    const netIncome = Math.max(0, taxableIncome - standardDeduction);

    if (regime === 'new') {
        // New Regime Slabs (FY 2024-25)
        // 0-3L: Nil
        // 3-7L: 5%
        // 7-10L: 10%
        // 10-12L: 15%
        // 12-15L: 20%
        // 15L+: 30%

        if (netIncome <= 300000) {
            tax = 0;
        } else if (netIncome <= 700000) {
            tax = (netIncome - 300000) * 0.05;
        } else if (netIncome <= 1000000) {
            tax = (400000 * 0.05) + (netIncome - 700000) * 0.10;
        } else if (netIncome <= 1200000) {
            tax = (400000 * 0.05) + (300000 * 0.10) + (netIncome - 1000000) * 0.15;
        } else if (netIncome <= 1500000) {
            tax = (400000 * 0.05) + (300000 * 0.10) + (200000 * 0.15) + (netIncome - 1200000) * 0.20;
        } else {
            tax = (400000 * 0.05) + (300000 * 0.10) + (200000 * 0.15) + (300000 * 0.20) + (netIncome - 1500000) * 0.30;
        }

        // Rebate u/s 87A for New Regime: Income up to 7L is tax free.
        if (netIncome <= 700000) {
            tax = 0;
        }

    } else {
        // Old Regime
        // 0-2.5L: Nil
        // 2.5-5L: 5%
        // 5-10L: 20%
        // 10L+: 30%

        // Age Logic impacting Basic Exemption Limit
        let basicExemption = 250000;
        if (ageValue >= 60 && ageValue < 80) basicExemption = 300000; // Senior
        if (ageValue >= 80) basicExemption = 500000; // Super Senior

        if (netIncome <= basicExemption) {
            tax = 0;
        } else if (netIncome <= 500000) {
            tax = (netIncome - basicExemption) * 0.05;
        } else if (netIncome <= 1000000) {
            tax = (500000 - basicExemption) * 0.05 + (netIncome - 500000) * 0.20;
        } else {
            tax = (500000 - basicExemption) * 0.05 + (500000 * 0.20) + (netIncome - 1000000) * 0.30;
        }

        // Rebate u/s 87A for Old Regime: Income up to 5L is tax free.
        if (netIncome <= 500000) {
            tax = 0;
        }
    }

    // Cess 4%
    const cess = tax * 0.04;
    const totalTax = tax + cess;

    return {
        taxableIncome: netIncome,
        tax: Math.round(tax),
        cess: Math.round(cess),
        totalTax: Math.round(totalTax),
        payAfterTax: Math.round(income - totalTax)
    };
};

export const calculateHRA = (basic, hraReceived, rentPaid, isMetro) => {
    // 1. Actual HRA Received
    const condition1 = hraReceived;

    // 2. Rent Paid - 10% of Basic
    const condition2 = Math.max(0, rentPaid - (0.10 * basic));

    // 3. 50% of Basic (Metro) or 40% (Non-Metro)
    const condition3 = isMetro ? (0.50 * basic) : (0.40 * basic);

    const exemptions = Math.min(condition1, condition2, condition3);
    const taxableHRA = Math.max(0, hraReceived - exemptions);

    return {
        exemption: Math.round(exemptions),
        taxable: Math.round(taxableHRA),
        breakdown: {
            actual: Math.round(condition1),
            rentMinusBasic: Math.round(condition2),
            metroLimit: Math.round(condition3)
        }
    };
};

export const calculatePF = (basic, empContrib, employerContrib, years) => {
    const interestRate = 8.25; // Current EPFO Rate %
    let balance = 0;
    let totalInvested = 0;
    let totalInterest = 0;

    const monthlyEmpContrib = (basic * empContrib) / 100;
    const monthlyEmployerContrib = (basic * employerContrib) / 100;
    const monthlyTotal = monthlyEmpContrib + monthlyEmployerContrib;

    const chartData = [];

    for (let i = 0; i <= years; i++) {
        if (i > 0) {
            // Yearly calculation for simplicity (normally monthly compounding)
            // Balance at start * (1+r) + Contributions * (1+r/2 approx for avg)
            // Let's do a simple yearly approximation:
            // Year End Balance = PrevBalance + YearlyContrib + Interest On (PrevBalance + YearlyContrib/2)

            const yearlyContrib = monthlyTotal * 12;
            const interest = (balance * (interestRate / 100)) + (yearlyContrib * (interestRate / 100) / 2); // approximate

            balance += yearlyContrib + interest;
            totalInvested += yearlyContrib;
            totalInterest += interest;
        }

        chartData.push({
            year: i,
            balance: Math.round(balance),
            invested: Math.round(totalInvested),
            interest: Math.round(totalInterest)
        });
    }

    return {
        totalBalance: Math.round(balance),
        totalInvested: Math.round(totalInvested),
        totalInterest: Math.round(totalInterest),
        chartData
    };
};

export const calculateGratuity = (salary, years) => {
    // Formula: (Last Drawn Salary * Years * 15) / 26
    // Note: Years usually rounded off.
    const eligible = years >= 5;
    const amount = (salary * years * 15) / 26;

    return {
        gratuityAmount: Math.round(amount),
        eligible
    };
};

export const calculateTDS = (amount, rate) => {
    const tds = (amount * rate) / 100;
    return {
        tdsAmount: Math.round(tds),
        netAmount: Math.round(amount - tds)
    };
};

export const calculateCapitalGains = (buyPrice, sellPrice, timePeriodValue, timePeriodUnit = 'years') => {
    // Determine Simple Gain
    const gain = sellPrice - buyPrice;
    const isGain = gain >= 0;

    // Estimate Tax
    // If Years > 1 (Equity) -> Long Term (assume 10% > 1L, ignore 1L limit for simplicity or apply flat 10)
    // If Years < 1 (Equity) -> Short Term (15%)
    // Let's assume standard Equity rates for a generic calculator: STCG 15%, LTCG 12.5% (New FY24 update)

    let estimatedTax = 0;
    let type = 'Short Term';

    // Normalize time to years
    let years = timePeriodUnit === 'months' ? timePeriodValue / 12 : timePeriodValue;

    if (years >= 1) {
        type = 'Long Term (LTCG)';
        // LTCG > 1.25L is taxed at 12.5% (New budget 2024), previously 10% > 1L.
        // Let's implement generic 12.5% on total gain for simplicity or 0 if Loss.
        if (isGain) estimatedTax = gain * 0.125;
    } else {
        type = 'Short Term (STCG)';
        // STCG 20% (New budget 2024) or 15% old. Let's use 20% to be safe/current.
        if (isGain) estimatedTax = gain * 0.20;
    }

    return {
        capitalGain: Math.round(gain),
        estimatedTax: Math.round(estimatedTax),
        netProfit: Math.round(gain - estimatedTax),
        type,
        isGain
    };
};
