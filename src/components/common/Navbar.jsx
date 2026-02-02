import { NavLink, useLocation } from 'react-router-dom';
import { FaCalculator, FaBook, FaSearch, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { NAV_CONFIG, getCategoryByPath } from '../../config/navConfig';
import { useState } from 'react';

const Navbar = () => {
    const location = useLocation();
    const activeCategory = getCategoryByPath(location.pathname);
    const [searchTerm, setSearchTerm] = useState('');
    const [showResults, setShowResults] = useState(false);

    // Flatten all items for search
    const allItems = NAV_CONFIG.flatMap(cat =>
        cat.items.map(item => ({
            ...item,
            category: cat.label,
            categoryId: cat.id
        }))
    );

    const searchResults = allItems.filter(item =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setShowResults(true);
    };

    const handleResultClick = () => {
        setSearchTerm('');
        setShowResults(false);
    };

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const [expandedCategory, setExpandedCategory] = useState(null);

    const toggleCategory = (categoryId) => {
        setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-2 sm:px-4 py-2 sm:py-4 pointer-events-none">
            <div className="max-w-7xl mx-auto glass-card rounded-2xl p-2 pointer-events-auto flex items-center justify-between shadow-2xl relative">

                {/* Mobile: Hamburger Menu (Left) */}
                <div className="md:hidden flex items-center px-2">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-white/70 hover:text-white transition-colors p-2"
                    >
                        {isMobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
                    </button>
                </div>

                {/* Logo Section (Centered on Mobile, Left on Desktop) */}
                <div className={`flex items-center gap-2 px-2 sm:px-4 flex-shrink-0 ${isMobileSearchOpen ? 'hidden md:flex' : 'flex'}`}>
                    <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center text-white">
                        <FaCalculator />
                    </div>
                    <span className="font-bold text-lg gradient-text-primary block">CalcHub</span>
                </div>

                {/* Desktop Search Bar (Hidden on Mobile) */}
                <div className="flex-1 max-w-md mx-4 relative hidden md:block">
                    <div className="relative group">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-primary-400 transition-colors">
                            <FaSearch />
                        </div>
                        <input
                            type="text"
                            placeholder="Search for a calculator..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            onFocus={() => setShowResults(true)}
                            onBlur={() => setTimeout(() => setShowResults(false), 200)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:border-primary-500 focus:bg-white/10 outline-none transition-all placeholder:text-white/30"
                        />
                    </div>
                    {/* Search Results Dropdown (Desktop) */}
                    {showResults && searchTerm && (
                        <div className="absolute top-full left-0 right-0 mt-2 glass-card rounded-xl border border-white/10 bg-slate-900/95 backdrop-blur-xl shadow-2xl overflow-hidden max-h-[400px] overflow-y-auto custom-scrollbar z-50">
                            {searchResults.length > 0 ? (
                                <div className="py-2">
                                    {searchResults.map((item) => (
                                        <NavLink
                                            key={item.path}
                                            to={item.path}
                                            onClick={handleResultClick}
                                            className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors group"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/70 group-hover:text-primary-400 group-hover:bg-primary-500/10 transition-colors">
                                                <item.icon />
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-white group-hover:text-primary-300 transition-colors">
                                                    {item.label}
                                                </div>
                                                <div className="text-xs text-white/40">
                                                    {item.category}
                                                </div>
                                            </div>
                                        </NavLink>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-4 text-center text-white/40 text-sm">
                                    No calculators found matching "{searchTerm}"
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Mobile Search Overlay */}
                {isMobileSearchOpen && (
                    <div className="md:hidden absolute inset-0 bg-slate-900 z-50 flex items-center px-4 rounded-xl">
                        <FaSearch className="text-white/40 mr-3" />
                        <input
                            type="text"
                            placeholder="Search..."
                            autoFocus
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="flex-1 bg-transparent text-white outline-none placeholder:text-white/30"
                        />
                        <button
                            onClick={() => {
                                setIsMobileSearchOpen(false);
                                setSearchTerm('');
                            }}
                            className="ml-3 text-white/50"
                        >
                            <FaTimes />
                        </button>

                        {/* Mobile Search Results */}
                        {searchTerm && (
                            <div className="absolute top-full left-0 right-0 mt-2 glass-card rounded-xl border border-white/10 bg-slate-900/95 backdrop-blur-xl shadow-2xl overflow-hidden max-h-[60vh] overflow-y-auto custom-scrollbar">
                                {searchResults.length > 0 ? (
                                    <div className="py-2">
                                        {searchResults.map((item) => (
                                            <NavLink
                                                key={item.path}
                                                to={item.path}
                                                onClick={() => {
                                                    handleResultClick();
                                                    setIsMobileSearchOpen(false);
                                                }}
                                                className="flex items-center gap-3 px-4 py-3 border-b border-white/5 last:border-0"
                                            >
                                                <item.icon className="text-primary-400" />
                                                <span className="text-white text-sm">{item.label}</span>
                                            </NavLink>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-4 text-center text-white/40 text-sm">No results</div>
                                )}
                            </div>
                        )}
                    </div>
                )}


                {/* Navigation Links and Mobile Buttons */}
                <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">

                    {/* Mobile Search Toggle (Right) */}
                    <button
                        onClick={() => setIsMobileSearchOpen(true)}
                        className={`md:hidden p-2 text-white/70 hover:text-white ${isMobileSearchOpen ? 'hidden' : 'block'}`}
                    >
                        <FaSearch className="text-xl" />
                    </button>

                    {/* Desktop Navigation (Hidden on Mobile) */}
                    <div className="hidden md:flex items-center gap-2">
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
            </div>

            {/* Mobile Menu Dropdown (Accordion Style) */}
            {
                isMobileMenuOpen && (
                    <div className="md:hidden absolute top-20 left-4 right-4 glass-card rounded-2xl p-2 pointer-events-auto shadow-2xl z-40 bg-slate-900/95 backdrop-blur-xl border border-white/10 animate-fade-in-down max-h-[80vh] overflow-y-auto custom-scrollbar">
                        <div className="flex flex-col space-y-1">
                            {NAV_CONFIG.map((category) => {
                                const isExpanded = expandedCategory === category.id;
                                const isCategoryActive = activeCategory?.id === category.id;

                                return (
                                    <div key={category.id} className="rounded-xl overflow-hidden bg-white/5">
                                        {/* Category Header */}
                                        <button
                                            onClick={() => toggleCategory(category.id)}
                                            className={`w-full flex items-center justify-between p-4 text-left transition-all ${isCategoryActive ? 'text-primary-300' : 'text-white/80'}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <category.icon className="text-xl" />
                                                <span className="font-medium">{category.label}</span>
                                            </div>
                                            <FaChevronDown className={`text-sm transition-transform duration-300 ${isExpanded ? 'rotate-180 text-primary-400' : 'text-white/30'}`} />
                                        </button>

                                        {/* Accordion Content */}
                                        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                            <div className="bg-black/20 p-2 space-y-1">
                                                {category.items.map((item) => (
                                                    <NavLink
                                                        key={item.path}
                                                        to={item.path}
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                        className={({ isActive }) => `
                                                        flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all
                                                        ${isActive
                                                                ? 'bg-primary-500/20 text-white'
                                                                : 'text-white/60 hover:bg-white/10 hover:text-white'}
                                                    `}
                                                    >
                                                        {({ isActive }) => (
                                                            <>
                                                                <item.icon className={`text-base ${isActive ? 'text-primary-400' : 'opacity-70'}`} />
                                                                <span>{item.label}</span>
                                                            </>
                                                        )}
                                                    </NavLink>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )
            }
        </nav >
    );
};

export default Navbar;
