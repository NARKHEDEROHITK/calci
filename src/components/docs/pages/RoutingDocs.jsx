import React from 'react';

const RoutingDocs = () => {
    return (
        <div className="animate-fade-in">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Routing System</h1>

            <p className="text-gray-600 dark:text-gray-300 mb-8">
                The application uses <strong>React Router v6</strong> with a nested routing strategy.
            </p>

            <div className="space-y-8">
                <section>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Routes Architecture</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        The routing is organized hierarchically:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 ml-4">
                        <li><strong>Root (<code>/</code>)</strong>: Handled by <code>App.jsx</code></li>
                        <li><strong>Category Routes (<code>/finance/*</code>)</strong>: Handled by Sub-routers</li>
                        <li><strong>Feature Routes (<code>/finance/home-loan</code>)</strong>: Handled by Calculator Components</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">1. App.jsx (Root)</h3>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                        {`<Routes>
  <Route path="/" element={<FinanceDashboard />} />
  <Route path="/finance/*" element={<FinanceRouter />} />
  <Route path="/wealth/*" element={<WealthRouter />} />
  <Route path="/health/*" element={<HealthRouter />} />
  {/* ... */}
</Routes>`}
                    </div>
                </section>

                <section>
                    <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">2. Sub-Routers (Example: FinanceRouter)</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Sub-routers use the <code>Routes</code> component to define relative paths for their specific category.
                    </p>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                        {`// src/components/routers/FinanceRouter.jsx
<Routes>
  <Route index element={<FinanceDashboard />} />
  <Route path="home-loan" element={<EMICalculator />} />
  <Route path="sip" element={<SIPCalculator />} />
  {/* ... */}
</Routes>`}
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Adding a New Route</h2>
                    <ol className="list-decimal list-inside space-y-3 text-gray-600 dark:text-gray-300 ml-4">
                        <li>Create your calculator component.</li>
                        <li>Open the corresponding Router file (e.g., <code>FinanceRouter.jsx</code>).</li>
                        <li>Import your component.</li>
                        <li>Add a new <code>&lt;Route path="your-path" element=&#123;&lt;YourComponent /&gt;&#125; /&gt;</code> inside the <code>Routes</code> block.</li>
                        <li>Update <code>config/navConfig.js</code> if you want it to appear in the Sidebar.</li>
                    </ol>
                </section>
            </div>
        </div>
    );
};

export default RoutingDocs;
