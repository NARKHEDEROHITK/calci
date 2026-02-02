// Utility functions for Wealth & Investment Calculators

// 1. Lumpsum Calculator
export const calculateLumpsum = (investment, rate, years) => {
    // Formula: A = P * (1 + r/100)^t
    // Assuming annual compounding for simple mutual fund lumpsum estimation
    const totalValue = investment * Math.pow((1 + rate / 100), years);
    const wealthGained = totalValue - investment;

    // Generate chart data (yearly growth)
    const chartData = [];
    for (let i = 0; i <= years; i++) {
        const val = investment * Math.pow((1 + rate / 100), i);
        chartData.push({
            year: i,
            value: Math.round(val),
            invested: investment
        });
    }

    return {
        totalValue: Math.round(totalValue),
        wealthGained: Math.round(wealthGained),
        invested: investment,
        chartData
    };
};

// 2. PPF Calculator
export const calculatePPF = (yearlyInvestment, interestRate, years) => {
    // PPF Formula: A = P * [((1 + i)^n - 1) / i] * (1 + i)
    // P = Annual Installment
    // i = Interest rate / 100
    // n = Number of years
    // Note: PPF interest is compounded annually.

    const i = interestRate / 100;
    const maturityAmount = yearlyInvestment * ((Math.pow(1 + i, years) - 1) / i) * (1 + i);
    const totalInvested = yearlyInvestment * years;
    const totalInterest = maturityAmount - totalInvested;

    const chartData = [];
    let currentBalance = 0;
    let cumInvested = 0;

    for (let y = 1; y <= years; y++) {
        cumInvested += yearlyInvestment;
        // Formula for specific year balance:
        // Balance = PreviousBalance * (1+i) + CurrentInvestment * (1+i)
        // Or just using the standard formula for 'y' years
        const val = yearlyInvestment * ((Math.pow(1 + i, y) - 1) / i) * (1 + i);
        chartData.push({
            year: y,
            value: Math.round(val),
            invested: cumInvested
        });
    }

    return {
        maturityAmount: Math.round(maturityAmount),
        totalInvested: Math.round(totalInvested),
        totalInterest: Math.round(totalInterest),
        chartData
    };
};

// 3. NPS Calculator
export const calculateNPS = (monthlyContribution, expectedReturn, age, retirementAge = 60) => {
    const years = Math.max(1, retirementAge - age);
    const months = years * 12;
    const monthlyRate = expectedReturn / 12 / 100;

    // SIP Formula for corpus
    // M = P × ({[1 + i]^n - 1} / i) × (1 + i)
    const totalCorpus = monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    const totalInvested = monthlyContribution * months;
    const wealthGained = totalCorpus - totalInvested;

    // Chart Data
    const chartData = [];
    for (let i = 0; i <= years; i++) {
        const m = i * 12;
        let val = 0;
        let inv = monthlyContribution * m;
        if (i > 0) {
            val = monthlyContribution * ((Math.pow(1 + monthlyRate, m) - 1) / monthlyRate) * (1 + monthlyRate);
        }
        chartData.push({
            year: i,
            value: Math.round(val),
            invested: Math.round(inv)
        });
    }

    return {
        totalCorpus: Math.round(totalCorpus),
        totalInvested: Math.round(totalInvested),
        wealthGained: Math.round(wealthGained),
        yearsInvested: years,
        chartData
    };
};

// 4. SWP Calculator
export const calculateSWP = (initialInvestment, monthlyWithdrawal, rate, years) => {
    // Monthly compounding and withdrawal
    const monthlyRate = rate / 12 / 100;
    const totalMonths = years * 12;

    let balance = initialInvestment;
    let totalWithdrawn = 0;
    const chartData = [];

    // Push initial state
    chartData.push({ year: 0, balance: Math.round(balance), withdrawn: 0 });

    for (let m = 1; m <= totalMonths; m++) {
        // Interest earned this month
        const interest = balance * monthlyRate;
        // Balance before withdrawal
        balance += interest;
        // Withdrawal
        balance -= monthlyWithdrawal;
        totalWithdrawn += monthlyWithdrawal;

        // If depleted
        if (balance < 0) balance = 0;

        // Record yearly (or every 12th month)
        if (m % 12 === 0) {
            chartData.push({
                year: m / 12,
                balance: Math.round(balance),
                withdrawn: totalWithdrawn
            });
        }
    }

    const finalValue = Math.max(0, balance);

    return {
        totalWithdrawn: Math.round(totalWithdrawn),
        finalValue: Math.round(finalValue),
        chartData
    };
};

// 5. Retirement Calculator
export const calculateRetirement = (currentAge, retirementAge, monthlyExpenses, inflationRate) => {
    const yearsToRetire = Math.max(1, retirementAge - currentAge);

    // Future Value of Monthly Expenses
    // FV = PV * (1 + r)^n
    const fvExpensesMonthly = monthlyExpenses * Math.pow((1 + inflationRate / 100), yearsToRetire);

    // Corpus Required (Simplified Rule of 300 or 4% withdrawal rate logic, usually 25x annual expenses)
    // Or more accurate: Standard Annuity calculation assuming post-retirement life expectancy (say 20-25 years)
    // Let's use a standard multiplier assumption: 20 years of expenses roughly.
    // Or simplified: Corpus = AnnualExpenses / SafeWithdrawalRate (usually 4% or 5%)
    // Let's use 25x rule (Rule of 25) adjusted for inflation.
    // Corpus = (FV_Monthly * 12) * 25

    const annualExpensesRetirement = fvExpensesMonthly * 12;
    const requiredCorpus = annualExpensesRetirement * 25;

    return {
        requiredCorpus: Math.round(requiredCorpus),
        monthlyExpensesAtRetirement: Math.round(fvExpensesMonthly),
        yearsToRetire
    };
};

// 6. Inflation Calculator
export const calculateInflation = (currentAmount, inflationRate, years) => {
    const futureValue = currentAmount * Math.pow((1 + inflationRate / 100), years);

    // Chart
    const chartData = [];
    for (let i = 0; i <= years; i++) {
        chartData.push({
            year: i,
            amount: Math.round(currentAmount * Math.pow((1 + inflationRate / 100), i))
        });
    }

    return {
        futureValue: Math.round(futureValue),
        chartData
    };
};
