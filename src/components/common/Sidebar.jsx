import { NavLink, useLocation } from 'react-router-dom';
import { NAV_CONFIG, getCategoryByPath } from '../../config/navConfig';
import { getSliderStyle } from '../../utils/formatters'; // Utilizing existing utility style if needed, or simple classes

const Sidebar = () => {
    const { pathname } = useLocation();
    const activeCategory = getCategoryByPath(pathname);

    // If no active category (e.g. 404) or if layout doesn't require sidebar, we might hide it.
    // But per user request, we show sidebar for Finance/Health.
    // Since Home Loan is '/', it falls under Finance.

    if (!activeCategory) return null;

    return (
        <aside className="hidden lg:block w-72 fixed left-0 top-0 bottom-0 pt-24 px-4 bg-white/[0.02] border-r border-white/10 overflow-y-auto backdrop-blur-md z-40 pb-8">
            <div className="mb-6 flex items-center gap-3 px-2">
                <activeCategory.icon className="text-2xl text-primary-400" />
                <h2 className="text-xl font-bold text-white tracking-wide">{activeCategory.label}</h2>
            </div>

            <div className="space-y-1">
                {activeCategory.items.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `
                            flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group
                            ${isActive
                                ? 'gradient-primary text-white shadow-lg'
                                : 'text-white/60 hover:bg-white/5 hover:text-white'}
                        `}
                    >
                        <item.icon className={`text-lg transition-transform group-hover:scale-110`} />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </div>
        </aside>
    );
};

export default Sidebar;
