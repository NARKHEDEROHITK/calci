import { Link } from 'react-router-dom';
import {
    FaHome,
    FaHandHoldingUsd,
    FaChartLine,
    FaLandmark,
    FaBriefcase,
    FaPercentage,
    FaCoins,
    FaCalculator
} from 'react-icons/fa';
import Header from './common/Header';

const calculators = [
    {
        title: "Home Loan EMI",
        description: "Calculate monthly home loan installments",
        icon: FaHome,
        path: "/finance/home-loan",
        color: "from-blue-500 to-indigo-600"
    },
    {
        title: "Personal Loan EMI",
        description: "Plan your personal loan repayments",
        icon: FaHandHoldingUsd,
        path: "/finance/personal-loan",
        color: "from-emerald-500 to-teal-600"
    },
    {
        title: "SIP Calculator",
        description: "Estimate long-term mutual fund returns",
        icon: FaChartLine,
        path: "/finance/sip",
        color: "from-orange-500 to-red-600"
    },
    {
        title: "FD / RD Calculator",
        description: "Check maturity returns on deposits",
        icon: FaLandmark,
        path: "/finance/fd-rd",
        color: "from-purple-500 to-pink-600"
    },
    {
        title: "CAGR Calculator",
        description: "Measure standard investment growth",
        icon: FaChartLine,
        path: "/finance/cagr",
        color: "from-cyan-500 to-blue-600"
    },
    {
        title: "Salary Hike",
        description: "Project future salary after appraisal",
        icon: FaBriefcase,
        path: "/finance/salary-hike",
        color: "from-green-500 to-emerald-600"
    },
    {
        title: "Simple Interest",
        description: "Calculate basic interest on principal",
        icon: FaPercentage,
        path: "/finance/simple-interest",
        color: "from-yellow-500 to-orange-600"
    },
    {
        title: "Compound Interest",
        description: "Power of compounding calculated",
        icon: FaCoins,
        path: "/finance/compound-interest",
        color: "from-indigo-500 to-purple-600"
    },
    {
        title: "GST Calculator",
        description: "Calculate Goods and Service Tax",
        icon: FaCalculator,
        path: "/finance/gst",
        color: "from-slate-500 to-slate-700"
    }
];

import SEO from './common/SEO';

const FinanceDashboard = () => {
    return (
        <div className="flex flex-col items-center p-4 md:p-8">
            <SEO
                title="Finance Calculators"
                description="Use our free financial calculators for Home Loans, Personal Loans, SIP, FD, RD, and more. Plan your finances effectively with CalcHub."
                keywords="Finance Calculator, EMI Calculator, SIP Calculator, FD Calculator, Wealth Management"
            />
            <Header
                title="Finance Calculators"
                subtitle="All the tools you need for financial planning"
                icon={FaCoins}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                {calculators.map((calc, index) => (
                    <Link
                        to={calc.path}
                        key={index}
                        className="glass-card p-6 rounded-3xl hover:scale-[1.02] transition-all group relative overflow-hidden"
                    >
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${calc.color} opacity-10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:opacity-20 transition-opacity`}></div>

                        <div className="relative z-10">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${calc.color} flex items-center justify-center text-white text-xl mb-4 shadow-lg group-hover:shadow-xl transition-all`}>
                                <calc.icon />
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2">{calc.title}</h3>
                            <p className="text-white/60 text-sm">{calc.description}</p>

                            <div className="mt-4 flex items-center text-sm font-medium text-white/40 group-hover:text-white transition-colors">
                                Use Calculator <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default FinanceDashboard;
