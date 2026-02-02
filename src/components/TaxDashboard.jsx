import { Link } from 'react-router-dom';
import {
    FaFileInvoiceDollar,
    FaUserTie,
    FaBuilding,
    FaPiggyBank,
    FaHandHoldingHeart,
    FaCut,
    FaChartArea
} from 'react-icons/fa';
import Header from './common/Header';

const calculators = [
    {
        title: "Income Tax Calculator",
        description: "Calculate tax payable under Old & New Regimes",
        icon: FaUserTie,
        path: "/tax/income-tax",
        color: "from-blue-500 to-indigo-600"
    },
    {
        title: "HRA Calculator",
        description: "Find tax exemption on House Rent Allowance",
        icon: FaBuilding,
        path: "/tax/hra",
        color: "from-orange-500 to-red-600"
    },
    {
        title: "PF Calculator",
        description: "Estimate your Provident Fund corpus",
        icon: FaPiggyBank,
        path: "/tax/pf",
        color: "from-emerald-500 to-teal-600"
    },
    {
        title: "Gratuity Calculator",
        description: "Calculate eligible gratuity amount",
        icon: FaHandHoldingHeart,
        path: "/tax/gratuity",
        color: "from-purple-500 to-pink-600"
    },
    {
        title: "TDS Calculator",
        description: "Compute TDS deduction and net payment",
        icon: FaCut,
        path: "/tax/tds",
        color: "from-cyan-500 to-blue-600"
    },
    {
        title: "Capital Gains",
        description: "LTCG & STCG tax estimation",
        icon: FaChartArea,
        path: "/tax/capital-gains",
        color: "from-pink-500 to-rose-600"
    }
];

const TaxDashboard = () => {
    return (
        <div className="flex flex-col items-center p-4 md:p-8">
            <Header
                title="Tax & Income Calculators"
                subtitle="Manage your taxes and income efficiently"
                icon={FaFileInvoiceDollar}
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

export default TaxDashboard;
