import {
    FaHome,
    FaChartLine,
    FaPercentage,
    FaHandHoldingUsd,
    FaLandmark,
    FaBriefcase,
    FaCoins,
    FaWeight,
    FaFire,
    FaRulerVertical,
    FaBirthdayCake,
    FaUserCircle,
    FaTint,
    FaCalculator,
    FaHeartbeat,
    FaFileInvoiceDollar,
    FaUserTie,
    FaBuilding,
    FaPiggyBank,
    FaHandHoldingHeart,
    FaCut,
    FaChartArea,
    FaTree,
    FaUmbrellaBeach,
    FaMoneyCheckAlt,
    FaBlind,
    FaTags,
    FaGasPump,
    FaLightbulb,
    FaUtensils,
    FaExchangeAlt,
    FaTools
} from 'react-icons/fa';

export const CATEGORIES = {
    FINANCE: 'finance',
    HEALTH: 'health',
    TAX: 'tax',
    WEALTH: 'wealth',
    UTILITY: 'utility'
};

export const NAV_CONFIG = [
    {
        id: CATEGORIES.UTILITY,
        label: 'Utility Tools',
        path: '/utility',
        icon: FaTools,
        items: [
            { label: 'Discount Calculator', path: '/utility/discount', icon: FaTags },
            { label: 'Percentage Calculator', path: '/utility/percentage', icon: FaPercentage },
            { label: 'Fuel Cost', path: '/utility/fuel', icon: FaGasPump },
            { label: 'Electricity Bill', path: '/utility/electricity', icon: FaLightbulb },
            { label: 'Tip Calculator', path: '/utility/tip', icon: FaUtensils },
            { label: 'Unit Converter', path: '/utility/converter', icon: FaExchangeAlt },
        ]
    },
    {
        id: CATEGORIES.WEALTH,
        label: 'Investment & Wealth',
        path: '/wealth',
        icon: FaChartLine,
        items: [
            { label: 'Lumpsum Calculator', path: '/wealth/lumpsum', icon: FaMoneyCheckAlt },
            { label: 'PPF Calculator', path: '/wealth/ppf', icon: FaTree },
            { label: 'NPS Calculator', path: '/wealth/nps', icon: FaBlind },
            { label: 'SWP Calculator', path: '/wealth/swp', icon: FaHandHoldingUsd },
            { label: 'Retirement Planning', path: '/wealth/retirement', icon: FaUmbrellaBeach },
            { label: 'Inflation Calculator', path: '/wealth/inflation', icon: FaChartLine },
        ]
    },
    {
        id: CATEGORIES.TAX,
        label: 'Tax & Income',
        path: '/tax',
        icon: FaFileInvoiceDollar,
        items: [
            { label: 'Income Tax', path: '/tax/income-tax', icon: FaUserTie },
            { label: 'HRA Calculator', path: '/tax/hra', icon: FaBuilding },
            { label: 'PF Calculator', path: '/tax/pf', icon: FaPiggyBank },
            { label: 'Gratuity', path: '/tax/gratuity', icon: FaHandHoldingHeart },
            { label: 'TDS Calculator', path: '/tax/tds', icon: FaCut },
            { label: 'Capital Gains', path: '/tax/capital-gains', icon: FaChartArea },
        ]
    },
    {
        id: CATEGORIES.FINANCE,
        label: 'Finance',
        path: '/finance',
        icon: FaCalculator,
        items: [
            { label: 'Home Loan EMI', path: '/finance/home-loan', icon: FaHome },
            { label: 'Personal Loan EMI', path: '/finance/personal-loan', icon: FaHandHoldingUsd },
            { label: 'SIP Calculator', path: '/finance/sip', icon: FaChartLine },
            { label: 'FD / RD Calculator', path: '/finance/fd-rd', icon: FaLandmark },
            { label: 'GST Calculator', path: '/finance/gst', icon: FaPercentage },
            { label: 'CAGR Calculator', path: '/finance/cagr', icon: FaChartLine },
            { label: 'Salary Hike', path: '/finance/salary-hike', icon: FaBriefcase },
            { label: 'Simple Interest', path: '/finance/simple-interest', icon: FaPercentage },
            { label: 'Compound Interest', path: '/finance/compound-interest', icon: FaCoins },
        ]
    },
    {
        id: CATEGORIES.HEALTH,
        label: 'Health',
        path: '/health',
        icon: FaHeartbeat,
        items: [
            { label: 'BMI Calculator', path: '/health/bmi', icon: FaWeight },
            { label: 'BMR & Calories', path: '/health/bmr', icon: FaFire },
            { label: 'Ideal Weight', path: '/health/ideal-weight', icon: FaRulerVertical },
            { label: 'Age Calculator', path: '/health/age', icon: FaBirthdayCake },
            { label: 'Body Fat %', path: '/health/body-fat', icon: FaUserCircle },
            { label: 'Water Intake', path: '/health/water-intake', icon: FaTint },
        ]
    }
];

export const getCategoryByPath = (pathname) => {
    if (pathname === '/') return NAV_CONFIG.find(cat => cat.id === CATEGORIES.FINANCE); // Default to Finance for root

    // Check if path starts with category path
    return NAV_CONFIG.find(cat => pathname.startsWith(cat.path));
};
