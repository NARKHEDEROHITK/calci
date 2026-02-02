import { useState, useMemo } from 'react';
import { FaPercentage } from 'react-icons/fa';
import Header from '../../../common/Header';
import { calculateGeneralPercentage } from '../../../../utils/utilityFormulas';

const PercentageCalculator = () => {
    const [calcType, setCalcType] = useState('percentOf');
    const [x, setX] = useState(10);
    const [y, setY] = useState(100);

    const result = useMemo(() => calculateGeneralPercentage({ type: calcType, x, y }), [calcType, x, y]);

    // Dynamic Text Config
    const config = {
        percentOf: { labelX: 'Percentage (%)', labelY: 'Of Number', resultLabel: 'Result' },
        isPercentOf: { labelX: 'Number (Part)', labelY: 'Total Number', resultLabel: 'Percentage' },
        change: { labelX: 'Initial Value', labelY: 'Final Value', resultLabel: 'Change %' }
    };

    const currentConfig = config[calcType];

    return (
        <div className="flex flex-col items-center p-4 md:p-8">
            <Header
                icon={FaPercentage}
                title="Percentage Calculator"
                subtitle="Calculate %, Fraction, and Change"
            />

            <div className="w-full max-w-3xl glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-100">

                {/* Type Selection */}
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                    <button
                        onClick={() => setCalcType('percentOf')}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${calcType === 'percentOf' ? 'bg-primary-500 text-white shadow-lg' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
                    >
                        % Of Value
                    </button>
                    <button
                        onClick={() => setCalcType('isPercentOf')}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${calcType === 'isPercentOf' ? 'bg-primary-500 text-white shadow-lg' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
                    >
                        X is what % of Y
                    </button>
                    <button
                        onClick={() => setCalcType('change')}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${calcType === 'change' ? 'bg-primary-500 text-white shadow-lg' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
                    >
                        % Increase/Decrease
                    </button>
                </div>

                {/* Calculation Area */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">

                    {/* Input X */}
                    <div>
                        <label className="block text-sm text-white/50 font-medium mb-2">{currentConfig.labelX}</label>
                        <input
                            type="number"
                            value={x}
                            onChange={(e) => setX(Number(e.target.value))}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary-500 outline-none"
                        />
                    </div>

                    {/* Operator Text */}
                    <div className="text-center text-white/40 font-bold pb-3 md:pb-4">
                        {calcType === 'percentOf' && <span>of</span>}
                        {calcType === 'isPercentOf' && <span>is what % of</span>}
                        {calcType === 'change' && <span>to</span>}
                    </div>

                    {/* Input Y */}
                    <div>
                        <label className="block text-sm text-white/50 font-medium mb-2">{currentConfig.labelY}</label>
                        <input
                            type="number"
                            value={y}
                            onChange={(e) => setY(Number(e.target.value))}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary-500 outline-none"
                        />
                    </div>
                </div>

                {/* Result Section */}
                <div className="mt-8 text-center pt-8 border-t border-white/10">
                    <p className="text-sm text-white/60 mb-2">{currentConfig.resultLabel}</p>
                    <div className={`text-5xl font-extrabold tracking-tight ${calcType === 'change' ? (result >= 0 ? 'text-emerald-400' : 'text-red-400') : 'text-white'}`}>
                        {result}
                        {calcType === 'isPercentOf' || calcType === 'change' ? '%' : ''}
                    </div>
                    {calcType === 'change' && (
                        <span className={`text-sm font-medium px-2 py-1 rounded-lg mt-2 inline-block ${result >= 0 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'}`}>
                            {result >= 0 ? 'Increase' : 'Decrease'}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PercentageCalculator;
