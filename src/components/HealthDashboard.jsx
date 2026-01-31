import { Link } from 'react-router-dom';
import {
    FaHeartbeat,
    FaWeight,
    FaFire,
    FaRulerVertical,
    FaBirthdayCake,
    FaUserCircle,
    FaTint
} from 'react-icons/fa';
import Header from './common/Header';

const calculators = [
    {
        title: "BMI Calculator",
        description: "Check your Body Mass Index score",
        icon: FaWeight,
        path: "/health/bmi",
        color: "from-blue-500 to-indigo-600"
    },
    {
        title: "BMR & Calories",
        description: "Daily calorie needs visualization",
        icon: FaFire,
        path: "/health/bmr",
        color: "from-orange-500 to-red-600"
    },
    {
        title: "Ideal Weight",
        description: "Find your healthy weight range",
        icon: FaRulerVertical,
        path: "/health/ideal-weight",
        color: "from-emerald-500 to-teal-600"
    },
    {
        title: "Age Calculator",
        description: "Exact age in years, months, days",
        icon: FaBirthdayCake,
        path: "/health/age",
        color: "from-purple-500 to-pink-600"
    },
    {
        title: "Body Fat %",
        description: "Estimate body fat percentage",
        icon: FaUserCircle,
        path: "/health/body-fat",
        color: "from-cyan-500 to-blue-600"
    },
    {
        title: "Water Intake",
        description: "Daily hydration recommendation",
        icon: FaTint,
        path: "/health/water-intake",
        color: "from-sky-400 to-blue-500"
    }
];

const HealthDashboard = () => {
    return (
        <div className="flex flex-col items-center p-4 md:p-8">
            <Header
                title="Health Calculators"
                subtitle="Tools to track and improve your well-being"
                icon={FaHeartbeat}
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

export default HealthDashboard;
