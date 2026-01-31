import { useState, useMemo } from 'react';
import { FaTint } from 'react-icons/fa';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import Header from '../../../common/Header';
import CalculatorInput from '../../../common/CalculatorInput';
import { calculateWaterIntake } from '../../../../utils/healthFormulas';

const WaterIntakeCalculator = () => {
    const [weight, setWeight] = useState(70);
    const [activity, setActivity] = useState('sedentary');
    const [consumed, setConsumed] = useState(0);

    const intake = useMemo(() => calculateWaterIntake(weight, activity), [weight, activity]);

    const activityLevels = [
        { value: 'sedentary', label: 'Sedentary' },
        { value: 'light', label: 'Lightly Active' },
        { value: 'moderate', label: 'Moderately Active' },
        { value: 'active', label: 'Active' },
        { value: 'very_active', label: 'Very Active' }
    ];

    return (
        <div className="flex flex-col items-center p-4 md:p-8">
            <Header
                icon={FaTint}
                title="Water Intake"
                subtitle="Calculate Daily Water Requirement"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl">
                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-100">
                    <h2 className="text-xl font-semibold mb-6">Details</h2>

                    <CalculatorInput label="Weight" value={weight} onChange={setWeight} min={20} max={200} unit="kg" />

                    <div className="mb-6">
                        <label className="block text-sm text-white/70 font-medium mb-2">Activity Level</label>
                        <select
                            value={activity}
                            onChange={(e) => setActivity(e.target.value)}
                            className="w-full bg-white/[0.08] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary-500 outline-none"
                        >
                            {activityLevels.map(opt => (
                                <option key={opt.value} value={opt.value} className="bg-slate-800 text-white">
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <CalculatorInput label="Consumed Today (Optional)" value={consumed} onChange={setConsumed} min={0} max={10} step={0.1} unit="L" />
                </div>

                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-200">
                    <h2 className="text-xl font-semibold mb-6">Recommendation</h2>

                    <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-5 text-center mb-6 shadow-lg shadow-blue-500/20">
                        <div className="text-sm text-white/80 uppercase tracking-wide mb-1">Daily Water Target</div>
                        <div className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                            {intake.toFixed(1)} <span className="text-2xl font-medium text-white/80">Liters</span>
                        </div>
                        <div className="text-base text-white/80 mt-2">approx {(intake * 33.8).toFixed(0)} fl oz</div>
                    </div>

                    <div className="text-center text-sm text-white/50 mb-6">
                        <p>Stay hydrated! Drink more if living in a hot climate.</p>
                    </div>

                    <div className="mt-8 pt-4 border-t border-white/10">
                        <h3 className="text-lg font-semibold text-white/90 mb-4">Daily Progress</h3>
                        <div className="h-16 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    layout="vertical"
                                    data={[{ name: 'Water', consumed: consumed, remaining: Math.max(0, intake - consumed) }]}
                                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                                >
                                    <XAxis type="number" domain={[0, Math.max(intake, consumed)]} hide />
                                    <YAxis type="category" dataKey="name" hide />
                                    <Tooltip cursor={false} contentStyle={{ backgroundColor: '#1e3a8a', borderColor: '#3b82f6', color: '#fff' }} />
                                    <Bar dataKey="consumed" stackId="a" fill="#06b6d4" radius={[4, 0, 0, 4]} background={{ fill: '#ffffff10' }} barSize={32} />
                                    <Bar dataKey="remaining" stackId="a" fill="#ffffff20" radius={[0, 4, 4, 0]} barSize={32} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex justify-between text-xs text-white/50 px-1 mt-1">
                            <span>0L</span>
                            <span>{(consumed / intake * 100).toFixed(0)}%</span>
                            <span>{intake.toFixed(1)}L</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WaterIntakeCalculator;
