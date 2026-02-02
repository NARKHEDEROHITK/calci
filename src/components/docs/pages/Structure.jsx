import React from 'react';

const Structure = () => {
    return (
        <div className="animate-fade-in">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Project Structure</h1>

            <p className="text-gray-600 dark:text-gray-300 mb-8">
                The project follows a scalable and modular folder structure designed to handle a growing number of calculators without clutter.
            </p>

            <div className="bg-gray-900 text-gray-300 p-6 rounded-lg font-mono text-sm shadow-xl overflow-x-auto">
                <pre>{`src/
├── assets/             # Static assets (images, icons)
├── components/
│   ├── calculators/    # Calculator logic & UI
│   │   ├── finance/    # Finance-related calculators
│   │   ├── health/     # Health-related calculators
│   │   ├── tax/        # Tax-related calculators
│   │   ├── utility/    # Utility tools
│   │   └── wealth/     # Wealth & Investment calculators
│   ├── common/         # Shared UI components (Navbar, InputField, etc.)
│   ├── docs/           # Documentation pages
│   └── routers/        # Sub-routers for each category
├── config/             # Configuration files (navConfig.js)
├── styles/             # Global styles (index.css)
├── utils/              # Helper functions & formulas
├── App.jsx             # Main App component & Root Routing
└── main.jsx            # Entry point
`}</pre>
            </div>

            <div className="mt-8 space-y-6">
                <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">/components/calculators</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        This is the core directory. Each calculator has its own dedicated folder containing its logic and UI.
                        For example: <code>src/components/calculators/finance/emi/EMICalculator.jsx</code>.
                    </p>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">/components/routers</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        To keep <code>App.jsx</code> clean, routing logic is split into category-specific routers
                        (e.g., <code>FinanceRouter.jsx</code>, <code>HealthRouter.jsx</code>).
                    </p>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">/config/navConfig.js</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        Centralized configuration for the navigation menu. Adding a new item here automatically updates the sidebar/navbar.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Structure;
