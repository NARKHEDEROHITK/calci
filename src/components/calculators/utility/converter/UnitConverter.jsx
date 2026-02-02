import { useState, useMemo } from 'react';
import { FaExchangeAlt } from 'react-icons/fa';
import Header from '../../../common/Header';
import { convertUnits } from '../../../../utils/utilityFormulas';

const UnitConverter = () => {
    const [type, setType] = useState('length');
    const [value, setValue] = useState(1);

    // Default units per type
    const units = {
        length: ['m', 'km', 'cm', 'mm', 'ft', 'inch', 'yard', 'mile'],
        weight: ['kg', 'g', 'mg', 'lb', 'oz'],
        temp: ['C', 'F', 'K']
    };

    const [fromUnit, setFromUnit] = useState('km');
    const [toUnit, setToUnit] = useState('m');

    // Handle type change
    const updateType = (newType) => {
        setType(newType);
        setValue(1);
        if (newType === 'length') { setFromUnit('km'); setToUnit('m'); }
        if (newType === 'weight') { setFromUnit('kg'); setToUnit('lb'); }
        if (newType === 'temp') { setFromUnit('C'); setToUnit('F'); }
    };

    const result = useMemo(() => convertUnits(value, type, fromUnit, toUnit), [value, type, fromUnit, toUnit]);

    return (
        <div className="flex flex-col items-center p-4 md:p-8">
            <Header
                icon={FaExchangeAlt}
                title="Unit Converter"
                subtitle="Convert Length, Weight & Temperature"
            />

            <div className="w-full max-w-3xl glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-100">

                {/* Type Selection */}
                <div className="flex justify-center gap-4 mb-8">
                    {['length', 'weight', 'temp'].map(t => (
                        <button
                            key={t}
                            onClick={() => updateType(t)}
                            className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${type === t ? 'bg-primary-500 text-white shadow-lg scale-105' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
                        >
                            {t}
                        </button>
                    ))}
                </div>

                {/* Conversion Area */}
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 justify-between">
                    {/* From Section */}
                    <div className="flex-1 w-full">
                        <label className="block text-sm text-white/50 font-medium mb-2 pl-1">From</label>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-2 focus-within:border-primary-500/50 transition-colors">
                            <input
                                type="number"
                                value={value}
                                onChange={(e) => setValue(Number(e.target.value))}
                                className="bg-transparent text-3xl font-bold text-white outline-none w-full"
                            />
                            <select
                                value={fromUnit}
                                onChange={(e) => setFromUnit(e.target.value)}
                                className="bg-slate-800/50 border-none text-white/70 text-sm rounded-lg outline-none cursor-pointer py-1"
                            >
                                {units[type].map(u => (
                                    <option key={u} value={u} className="bg-slate-800">{u}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Swap Icon */}
                    <div className="text-white/40 text-xl pt-6">
                        <FaExchangeAlt />
                    </div>

                    {/* To Section */}
                    <div className="flex-1 w-full">
                        <label className="block text-sm text-white/50 font-medium mb-2 pl-1">To</label>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-2">
                            <div className="text-3xl font-bold text-emerald-400 overflow-hidden text-ellipsis">
                                {result}
                            </div>
                            <select
                                value={toUnit}
                                onChange={(e) => setToUnit(e.target.value)}
                                className="bg-slate-800/50 border-none text-white/70 text-sm rounded-lg outline-none cursor-pointer py-1 w-full"
                            >
                                {units[type].map(u => (
                                    <option key={u} value={u} className="bg-slate-800">{u}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UnitConverter;
