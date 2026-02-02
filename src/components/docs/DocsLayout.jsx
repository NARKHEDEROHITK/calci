import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FaBook, FaCode, FaCalculator, FaSitemap, FaTools } from 'react-icons/fa';

const DocsSidebar = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === `/docs/${path}` || (path === '' && location.pathname === '/docs');
    };

    const linkClass = (path) => `
        flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
        ${isActive(path)
            ? 'bg-blue-600 text-white shadow-md'
            : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'}
    `;

    return (
        <div className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-[calc(100vh-4rem)] sticky top-24 overflow-y-auto p-4 hidden lg:block">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 px-2 flex items-center gap-2">
                <FaBook className="text-blue-500" /> Documentation
            </h2>

            <nav className="space-y-2">
                <Link to="/docs" className={linkClass('')}>
                    <FaBook className="text-lg" />
                    <span>Introduction</span>
                </Link>
                <Link to="/docs/structure" className={linkClass('structure')}>
                    <FaSitemap className="text-lg" />
                    <span>Project Structure</span>
                </Link>
                <Link to="/docs/routing" className={linkClass('routing')}>
                    <FaCode className="text-lg" />
                    <span>Routing System</span>
                </Link>
                <Link to="/docs/calculators" className={linkClass('calculators')}>
                    <FaCalculator className="text-lg" />
                    <span>Calculators</span>
                </Link>
                <Link to="/docs/utilities" className={linkClass('utilities')}>
                    <FaTools className="text-lg" />
                    <span>Utilities & Formulas</span>
                </Link>
            </nav>
        </div>
    );
};

const DocsLayout = () => {
    return (
        <div className="flex bg-gray-50 dark:bg-gray-950 min-h-screen">
            <DocsSidebar />
            <div className="flex-1 max-w-5xl mx-auto w-full">
                <div className="p-6 lg:p-10">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DocsLayout;
