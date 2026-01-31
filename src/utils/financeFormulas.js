// Helper to round to 2 decimals
const round = (num) => Math.round(num);

export const calculateEMI = (principal, rate, years) => {
    const monthlyRate = rate / 12 / 100;
    const months = years * 12;
    if (rate === 0) return { emi: principal / months, totalAmount: principal, totalInterest: 0, months };

    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, months) /
        (Math.pow(1 + monthlyRate, months) - 1);

    const totalAmount = emi * months;
    const totalInterest = totalAmount - principal;

    return {
        emi,
        totalAmount,
        totalInterest,
        months
    };
};

export const calculateSIP = (monthlyInvestment, rate, years) => {
    const monthlyRate = rate / 12 / 100;
    const months = years * 12;

    // Formula: P × [((1+r)^n - 1) / r] × (1+r)
    const totalAmount = monthlyInvestment *
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
        (1 + monthlyRate);

    const investedAmount = monthlyInvestment * months;
    const estReturns = totalAmount - investedAmount;

    // Generate Chart Data
    const chartData = [];
    for (let i = 0; i <= years; i++) {
        const m = i * 12;
        if (i === 0) {
            chartData.push({ year: i, invested: 0, value: 0 });
            continue;
        }
        const val = monthlyInvestment * ((Math.pow(1 + monthlyRate, m) - 1) / monthlyRate) * (1 + monthlyRate);
        const inv = monthlyInvestment * m;
        chartData.push({
            year: i,
            invested: round(inv),
            value: round(val)
        });
    }

    return {
        investedAmount,
        estReturns,
        totalAmount,
        chartData
    };
};

export const calculateFD = (principal, rate, years) => {
    // Annual compounding
    const totalAmount = principal * Math.pow((1 + rate / 100), years);
    const totalInterest = totalAmount - principal;

    const chartData = [];
    for (let i = 0; i <= years; i++) {
        const val = principal * Math.pow((1 + rate / 100), i);
        chartData.push({
            year: i,
            value: round(val),
            principal: principal
        });
    }

    return {
        maturityAmount: totalAmount,
        totalInterest,
        chartData
    };
};

export const calculateRD = (monthlyDeposit, rate, years) => {
    // Using monthly compounding
    const monthlyRate = rate / 12 / 100;
    const months = years * 12;

    const totalAmount = monthlyDeposit * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    const investedAmount = monthlyDeposit * months;
    const estReturns = totalAmount - investedAmount;

    const chartData = [];
    for (let i = 0; i <= years; i++) {
        const m = i * 12;
        if (i === 0) {
            chartData.push({ year: i, invested: 0, value: 0 });
            continue;
        }
        const val = monthlyDeposit * ((Math.pow(1 + monthlyRate, m) - 1) / monthlyRate) * (1 + monthlyRate);
        const inv = monthlyDeposit * m;
        chartData.push({
            year: i,
            invested: round(inv),
            value: round(val)
        });
    }

    return {
        maturityAmount: totalAmount,
        totalInvestment: investedAmount,
        totalInterest: estReturns,
        chartData
    };
};

export const calculateCAGR = (beginValue, endValue, years) => {
    // (Ending Value / Beginning Value)^(1/Years) - 1
    if (beginValue === 0 || years === 0) return { cagr: 0, chartData: [] };
    const cagr = (Math.pow(endValue / beginValue, 1 / years) - 1) * 100;

    const chartData = [];
    for (let i = 0; i <= years; i++) {
        // Interpolate value based on CAGR
        // V = P * (1 + r/100)^t
        // But we actually just want to show the smooth curve from start to end
        const val = beginValue * Math.pow((1 + cagr / 100), i);
        chartData.push({
            year: i,
            value: round(val)
        });
    }

    return { cagr, chartData };
};

export const calculateSalaryHike = (currentSalary, hikePercent, years = 1) => {
    // New Salary = Current Salary * (1 + Hike/100)^Years
    const growthFactor = 1 + (hikePercent / 100);
    const newSalary = currentSalary * Math.pow(growthFactor, years);
    const totalGrowth = newSalary - currentSalary;

    const chartData = [];
    for (let i = 0; i <= years; i++) {
        const salaries = currentSalary * Math.pow(growthFactor, i);
        chartData.push({
            year: i,
            salary: round(salaries)
        });
    }

    return {
        newSalary,
        totalGrowth,
        chartData
    };
};

export const calculateSimpleInterest = (principal, rate, years) => {
    // SI = (P * R * T) / 100
    const interest = (principal * rate * years) / 100;
    const totalAmount = principal + interest;

    const chartData = [];
    for (let i = 0; i <= years; i++) {
        const inte = (principal * rate * i) / 100;
        chartData.push({
            year: i,
            simple: round(principal + inte)
        });
    }

    return {
        interest,
        totalAmount,
        chartData
    };
};

export const calculateCompoundInterest = (principal, rate, years) => {
    // A = P * (1 + r/100)^t
    const amount = principal * Math.pow((1 + rate / 100), years);
    const interest = amount - principal;

    const chartData = [];
    for (let i = 0; i <= years; i++) {
        const amt = principal * Math.pow((1 + rate / 100), i);
        chartData.push({
            year: i,
            compound: round(amt)
        });
    }

    return {
        interest,
        totalAmount: amount,
        chartData
    };
};

export const calculateInterestComparison = (principal, rate, years) => {
    const si = calculateSimpleInterest(principal, rate, years);
    const ci = calculateCompoundInterest(principal, rate, years);

    const chartData = [];
    for (let i = 0; i <= years; i++) {
        chartData.push({
            year: i,
            simple: si.chartData[i].simple,
            compound: ci.chartData[i].compound
        });
    }

    return {
        simple: si,
        compound: ci,
        chartData
    };
};
