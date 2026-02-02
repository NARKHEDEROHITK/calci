import { Link } from 'react-router-dom';
import {
    FaTags,
    FaPercent,
    FaGasPump,
    FaLightbulb,
    FaUtensils,
    FaExchangeAlt,
    FaTools
} from 'react-icons/fa';
import Header from './common/Header';

const calculators = [
    {
        title: "Discount Calculator",
        description: "Calculate final price after discount",
        icon: FaTags,
        path: "/utility/discount",
        color: "from-blue-500 to-indigo-600"
    },
    {
        title: "Percentage Calculator",
        description: "Find % of number, change %, etc.",
        icon: FaPercent,
        path: "/utility/percentage",
        color: "from-emerald-500 to-green-600"
    },
    {
        title: "Fuel Cost Calculator",
        description: "Estimate trip cost & fuel needed",
        icon: FaGasPump,
        path: "/utility/fuel",
        color: "from-orange-500 to-red-600"
    },
    {
        title: "Electricity Bill",
        description: "Estimate monthly electricity charges",
        icon: FaLightbulb,
        path: "/utility/electricity",
        color: "from-yellow-400 to-amber-500" // Bright for lightbulb
    },
    {
        title: "Tip Calculator",
        description: "Calculate tip per person",
        icon: FaUtensils,
        path: "/utility/tip",
        color: "from-pink-500 to-rose-600"
    },
    {
        title: "Unit Converter",
        description: "Length, Weight, Temperature conversion",
        icon: FaExchangeAlt,
        path: "/utility/converter",
        color: "from-cyan-500 to-blue-600"
    }
];

const UtilityDashboard = () => {
    return (
        <div className="flex flex-col items-center p-4 md:p-8">
            <Header
                title="Utility Tools"
                subtitle="Everyday calculations made simple"
                icon={FaTools}
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
                                Open Tool <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default UtilityDashboard;
