import { NavLink, useLocation } from 'react-router-dom';
import { FaCalculator } from 'react-icons/fa';
import { NAV_CONFIG, getCategoryByPath } from '../../config/navConfig';
import { useState } from 'react';

const Navbar = () => {
    // Only need Finance and Health for top nav
    // We can just use NAV_CONFIG.
    const location = useLocation();
    const activeCategory = getCategoryByPath(location.pathname);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 pointer-events-none">
            <div className="max-w-4xl mx-auto glass-card rounded-2xl p-2 pointer-events-auto flex items-center justify-between shadow-2xl relative">
                <div className="flex items-center gap-2 px-4">
                    <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center text-white">
                        <FaCalculator />
                    </div>
                    <span className="font-bold text-lg gradient-text-primary hidden sm:block">CalcHub</span>
                </div>

                <div className="flex items-center gap-1 md:gap-2">
                    {NAV_CONFIG.map((category) => (
                        <div key={category.id} className="relative group">
                            <NavLink
                                to={category.path}
                                className={({ isActive }) => {
                                    const isCategoryActive = isActive || (activeCategory?.id === category.id);
                                    return `
                                    flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all
                                    ${isCategoryActive
                                            ? 'gradient-primary text-white shadow-lg'
                                            : 'text-white/70 hover:bg-white/10 hover:text-white'}
                                `}}
                            >
                                <category.icon className="text-base" />
                                <span className="hidden md:block">{category.label}</span>
                            </NavLink>

                            {/* Dropdown Menu */}
                            <div className="absolute top-full right-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 w-64 z-50">
                                <div className="glass-card rounded-xl overflow-hidden shadow-2xl p-2 border border-white/10 bg-slate-900/95 backdrop-blur-xl">
                                    <div className="text-xs font-semibold text-white/50 px-3 py-2 uppercase tracking-wide border-b border-white/5 mb-1">
                                        {category.label} Calculators
                                    </div>
                                    <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                                        {category.items.map((item) => (
                                            <NavLink
                                                key={item.path}
                                                to={item.path}
                                                className={({ isActive }) => `
                                                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all
                                                    ${isActive
                                                        ? 'bg-primary-500/20 text-white'
                                                        : 'text-white/70 hover:bg-white/10 hover:text-white'}
                                                `}
                                            >
                                                <item.icon className={`text-base ${item.path === location.pathname ? 'text-primary-400' : 'opacity-70'}`} />
                                                <span>{item.label}</span>
                                            </NavLink>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
