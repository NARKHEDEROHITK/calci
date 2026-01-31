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
    FaHeartbeat
} from 'react-icons/fa';

export const CATEGORIES = {
    FINANCE: 'finance',
    HEALTH: 'health'
};

export const NAV_CONFIG = [
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

    // Check if path starts with category path (e.g. /finance or /health)
    return NAV_CONFIG.find(cat => pathname.startsWith(cat.path));
};
