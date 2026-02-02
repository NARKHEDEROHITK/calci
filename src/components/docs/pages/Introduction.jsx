import React from 'react';

const DocSection = ({ title, children, id }) => (
    <section id={id} className="mb-10">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
            {title}
        </h2>
        <div className="text-gray-600 dark:text-gray-300 space-y-4 leading-relaxed">
            {children}
        </div>
    </section>
);

const CodeBlock = ({ code, language = 'javascript' }) => (
    <div className="mockup-code bg-gray-900 text-gray-100 p-4 rounded-lg my-4 overflow-x-auto text-sm font-mono shadow-lg relative group">
        <pre><code>{code}</code></pre>
    </div>
);

const Introduction = () => {
    return (
        <div className="animate-fade-in">
            <h1 className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 mb-6">
                Financial Calculator Project
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                A comprehensive React-based application for various financial, health, wealth, tax, and utility calculations.
            </p>

            <DocSection title="Overview">
                <p>
                    This project is designed to be a one-stop solution for everyday calculations.
                    It is built using modern web technologies focusing on performance, accessibility, and a premium user experience.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="font-bold text-lg mb-2 text-blue-500">Tech Stack</h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li>React (Vite)</li>
                            <li>Tailwind CSS</li>
                            <li>React Router DOM (v6)</li>
                            <li>React Icons</li>
                        </ul>
                    </div>
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="font-bold text-lg mb-2 text-green-500">Key Features</h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li>50+ Calculators</li>
                            <li>Dark/Light Mode</li>
                            <li>Responsive Design</li>
                            <li>Modular Architecture</li>
                        </ul>
                    </div>
                </div>
            </DocSection>

            <DocSection title="Getting Started">
                <p>To run this project locally:</p>
                <CodeBlock code={`# Clone the repository
git clone <repo-url>

# Install dependencies
npm install

# Start development server
npm run dev`} language="bash" />
            </DocSection>
        </div>
    );
};

export default Introduction;
