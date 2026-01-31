import { NavLink } from 'react-router-dom';
import { FaCalculator, FaHome, FaChartLine, FaPercentage } from 'react-icons/fa';

const Navbar = () => {
    const navItems = [
        { path: '/', label: 'EMI', icon: FaCalculator },
        { path: '/home-loan', label: 'Home Loan', icon: FaHome },
        { path: '/sip', label: 'SIP', icon: FaChartLine },
        { path: '/gst', label: 'GST', icon: FaPercentage },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 pointer-events-none">
            <div className="max-w-4xl mx-auto glass-card rounded-2xl p-2 pointer-events-auto flex items-center justify-between shadow-2xl">
                <div className="flex items-center gap-2 px-4">
                    <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center text-white">
                        <FaCalculator />
                    </div>
                    <span className="font-bold text-lg gradient-text-primary hidden sm:block">CalcHub</span>
                </div>

                <div className="flex items-center gap-1 md:gap-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `
                                flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all
                                ${isActive
                                    ? 'gradient-primary text-white shadow-lg'
                                    : 'text-white/70 hover:bg-white/10 hover:text-white'}
                            `}
                        >
                            <item.icon className="text-base" />
                            <span className="hidden md:block">{item.label}</span>
                        </NavLink>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
