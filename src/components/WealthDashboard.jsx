import { Link } from 'react-router-dom';
import {
    FaMoneyCheckAlt,
    FaTree,
    FaBlind,
    FaHandHoldingUsd,
    FaUmbrellaBeach,
    FaChartLine
} from 'react-icons/fa';
import Header from './common/Header';

const calculators = [
    {
        title: "Lumpsum Calculator",
        description: "Calculate returns on one-time investment",
        icon: FaMoneyCheckAlt,
        path: "/wealth/lumpsum",
        color: "from-blue-500 to-indigo-600"
    },
    {
        title: "PPF Calculator",
        description: "Public Provident Fund returns & maturity",
        icon: FaTree,
        path: "/wealth/ppf",
        color: "from-emerald-500 to-green-600"
    },
    {
        title: "NPS Calculator",
        description: "Plan your retirement pension (National Pension System)",
        icon: FaBlind,
        path: "/wealth/nps",
        color: "from-orange-500 to-red-600"
    },
    {
        title: "SWP Calculator",
        description: "Systematic Withdrawal Plan & remaining corpus",
        icon: FaHandHoldingUsd,
        path: "/wealth/swp",
        color: "from-purple-500 to-pink-600"
    },
    {
        title: "Retirement Planning",
        description: "Estimate corpus needed for retirement",
        icon: FaUmbrellaBeach,
        path: "/wealth/retirement",
        color: "from-teal-400 to-cyan-500"
    },
    {
        title: "Inflation Calculator",
        description: "Calculate future value of money",
        icon: FaChartLine,
        path: "/wealth/inflation",
        color: "from-yellow-500 to-amber-600"
    }
];

import SEO from './common/SEO';

const WealthDashboard = () => {
    return (
        <div className="flex flex-col items-center p-4 md:p-8">
            <SEO
                title="Wealth & Investment Calculators"
                description="Plan your investments with Lumpsum, PPF, NPS, SWP, and Retirement calculators. Grow your wealth intelligently."
                keywords="Wealth Calculator, Investment Calculator, PPF Calculator, NPS Calculator, Retirement Planning"
            />
            <Header
                title="Investment & Wealth"
                subtitle="Plan your financial future with smart tools"
                icon={FaChartLine}
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

export default WealthDashboard;
