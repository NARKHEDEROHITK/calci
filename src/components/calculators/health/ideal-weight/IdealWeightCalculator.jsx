import { useState, useMemo } from 'react';
import { FaRulerVertical } from 'react-icons/fa';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ReferenceArea, ReferenceLine, Tooltip } from 'recharts';
import Header from '../../../common/Header';
import CalculatorInput from '../../../common/CalculatorInput';
import { calculateIdealWeight } from '../../../../utils/healthFormulas';

const IdealWeightCalculator = () => {
    const [gender, setGender] = useState('male');
    const [height, setHeight] = useState(170);
    const [currentWeight, setCurrentWeight] = useState(0);

    const { ideal, min, max } = useMemo(() => calculateIdealWeight(gender, height), [gender, height]);

    return (
        <div className="flex flex-col items-center p-4 md:p-8">
            <Header
                icon={FaRulerVertical}
                title="Ideal Weight"
                subtitle="Calculate your ideal body weight based on height"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl">
                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-100">
                    <h2 className="text-xl font-semibold mb-6">Input Details</h2>

                    <div className="mb-6">
                        <label className="block text-sm text-white/70 font-medium mb-2">Gender</label>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setGender('male')}
                                className={`flex-1 py-3 rounded-xl border border-white/10 font-medium transition-all ${gender === 'male' ? 'bg-primary-500 text-white' : 'bg-white/5 text-white/70 hover:bg-white/10'}`}
                            >
                                Male
                            </button>
                            <button
                                onClick={() => setGender('female')}
                                className={`flex-1 py-3 rounded-xl border border-white/10 font-medium transition-all ${gender === 'female' ? 'bg-primary-500 text-white' : 'bg-white/5 text-white/70 hover:bg-white/10'}`}
                            >
                                Female
                            </button>
                        </div>
                    </div>

                    <CalculatorInput
                        label="Height"
                        value={height}
                        onChange={setHeight}
                        min={100}
                        max={220}
                        step={1}
                        unit="cm"
                    />

                    <CalculatorInput
                        label="Current Weight (Optional)"
                        value={currentWeight || ''}
                        onChange={(val) => setCurrentWeight(Number(val))}
                        min={20}
                        max={200}
                        step={0.5}
                        unit="kg"
                        placeholder="Enter to compare"
                    />
                </div>

                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-200">
                    <h2 className="text-xl font-semibold mb-6">Results</h2>

                    <div className="gradient-primary rounded-2xl p-5 text-center mb-6">
                        <div className="text-sm text-white/80 uppercase tracking-wide mb-1">Ideal Weight</div>
                        <div className="text-4xl font-extrabold text-white tracking-tight">
                            {ideal.toFixed(1)} <span className="text-xl font-medium text-white/70">kg</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-center bg-white/[0.03] border border-white/10 rounded-xl p-4">
                        <div className="text-center">
                            <div className="text-xs text-white/50 uppercase">Min</div>
                            <div className="text-lg font-bold text-white">{min.toFixed(1)} kg</div>
                        </div>
                        <div className="h-8 w-px bg-white/10"></div>
                        <div className="text-center">
                            <div className="text-xs text-white/50 uppercase">Max</div>
                            <div className="text-lg font-bold text-white">{max.toFixed(1)} kg</div>
                        </div>
                    </div>

                    <div className="mt-8 border-t border-white/10 pt-8 h-40">
                        <h3 className="text-lg font-semibold text-white/90 mb-4">Weight Position</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <ScatterChart margin={{ top: 30, right: 20, bottom: 0, left: 20 }}>
                                <XAxis
                                    type="number"
                                    dataKey="x"
                                    domain={[
                                        Math.floor(Math.min(min, currentWeight > 0 ? currentWeight : min) - 10),
                                        Math.ceil(Math.max(max, currentWeight > 0 ? currentWeight : max) + 10)
                                    ]}
                                    hide
                                />
                                <YAxis type="number" dataKey="y" hide />
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} content={() => null} />
                                <Scatter data={[{ x: ideal, y: 1 }]} fill="none" />
                                <ReferenceArea x1={min} x2={max} fill="#10b981" fillOpacity={0.2} />
                                <ReferenceLine x={ideal} stroke="#10b981" strokeDasharray="3 3" label={{ position: 'top', value: 'Ideal', fill: '#10b981', fontSize: 12 }} />
                                {currentWeight > 0 && (
                                    <ReferenceLine x={currentWeight} stroke="#fff" strokeWidth={2} label={{ position: 'top', value: 'You', fill: '#fff', fontSize: 12, fontWeight: 'bold' }} />
                                )}
                            </ScatterChart>
                        </ResponsiveContainer>
                    </div>

                    <p className="text-xs text-white/40 text-center mt-4">Based on standard health formulas (Robinson/Miller)</p>
                </div>
            </div>
        </div>
    );
};

export default IdealWeightCalculator;
