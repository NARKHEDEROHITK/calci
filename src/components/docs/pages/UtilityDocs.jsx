import React from 'react';

const UtilityDocs = () => {
    return (
        <div className="animate-fade-in">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Utilities & Formulas</h1>

            <p className="text-gray-600 dark:text-gray-300 mb-8">
                The project maintains strict separation between UI and Logic. All math formulas reside in <code>src/utils</code>.
            </p>

            <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">File Organization</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 ml-4">
                    <li><code>financeFormulas.js</code>: EMI, SIP, CST, Simple/Compound Interest logic.</li>
                    <li><code>wealthFormulas.js</code>: Lumpsum, SWP, PPF calculations.</li>
                    <li><code>taxFormulas.js</code>: Income tax slabs, HRA, etc.</li>
                    <li><code>healthFormulas.js</code>: BMI, BMR, Body Fat equations.</li>
                    <li><code>formatter.js</code>: Currency and number formatting utilities.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Formatter Usage</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Always use the global formatter for display to ensure consistent Indian Number System formatting (Lakhs/Crores).
                </p>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                    {`import { formatToIndianCurrency } from '../../../utils/formatter';

// Usage
<span>{formatToIndianCurrency(150000)}</span> 
// Output: ₹1,50,000`}
                </div>
            </section>
        </div>
    );
};

export default UtilityDocs;
