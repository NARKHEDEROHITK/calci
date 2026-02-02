import React from 'react';

const CalculatorsDocs = () => {
    return (
        <div className="animate-fade-in">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Creating Calculators</h1>

            <p className="text-gray-600 dark:text-gray-300 mb-8">
                Guidelines for creating new calculator components to ensure consistency across the application.
            </p>

            <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Standard Layout Pattern</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Most calculators follow a split-screen layout:
                </p>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                        <li><strong>Left Column</strong>: Inputs (Forms, Sliders)</li>
                        <li><strong>Right Column</strong>: Results (Charts, Summary Cards)</li>
                    </ul>
                </div>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Common Components</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Reuse these components from <code>src/components/common</code>:
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="bg-white dark:bg-gray-900 p-4 rounded shadow-sm border border-gray-100 dark:border-gray-800">
                        <code className="text-blue-600 font-bold block mb-1">&lt;PageHeader /&gt;</code>
                        <span className="text-sm text-gray-500">Standard title, description, and icon header.</span>
                    </div>
                    <div className="bg-white dark:bg-gray-900 p-4 rounded shadow-sm border border-gray-100 dark:border-gray-800">
                        <code className="text-blue-600 font-bold block mb-1">&lt;InputField /&gt;</code>
                        <span className="text-sm text-gray-500">Standardized text/number input with currency support.</span>
                    </div>
                    <div className="bg-white dark:bg-gray-900 p-4 rounded shadow-sm border border-gray-100 dark:border-gray-800">
                        <code className="text-blue-600 font-bold block mb-1">&lt;Slider /&gt;</code>
                        <span className="text-sm text-gray-500">Range slider for adjusting values.</span>
                    </div>
                    <div className="bg-white dark:bg-gray-900 p-4 rounded shadow-sm border border-gray-100 dark:border-gray-800">
                        <code className="text-blue-600 font-bold block mb-1">&lt;ResultCard /&gt;</code>
                        <span className="text-sm text-gray-500">Display summary metrics in the result section.</span>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Example Structure</h2>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                    {`const MyCalculator = () => {
    // 1. State Management
    const [amount, setAmount] = useState(10000);

    // 2. Logic / Effects
    const result = calculateSomething(amount);

    return (
        <div className="max-w-7xl mx-auto p-4">
            <PageHeader title="My Calculator" ... />
            
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <InputField value={amount} onChange={setAmount} ... />
                </div>

                {/* Result Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <Results data={result} />
                </div>
            </div>
        </div>
    );
};`}
                </div>
            </section>
        </div>
    );
};

export default CalculatorsDocs;
