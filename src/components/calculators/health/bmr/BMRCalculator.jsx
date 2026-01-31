import { useState, useMemo } from 'react';
import { FaFire } from 'react-icons/fa';
import Header from '../../../common/Header';
import CalculatorInput from '../../../common/CalculatorInput';
import { calculateBMR, calculateCalorieNeeds, getAllCalorieNeeds } from '../../../../utils/healthFormulas';
import ComparisonBarChart from '../../../common/charts/ComparisonBarChart';

const BMRCalculator = () => {
    const [gender, setGender] = useState('male');
    const [weight, setWeight] = useState(70);
    const [height, setHeight] = useState(170);
    const [age, setAge] = useState(25);
    const [activity, setActivity] = useState('sedentary');

    const bmr = useMemo(() => calculateBMR(gender, weight, height, age), [gender, weight, height, age]);
    const dailyCalories = useMemo(() => calculateCalorieNeeds(bmr, activity), [bmr, activity]);
    const calorieBreakdown = useMemo(() => getAllCalorieNeeds(bmr), [bmr]);

    const activityLevels = [
        { value: 'sedentary', label: 'Sedentary (Little or no exercise)' },
        { value: 'light', label: 'Lightly Active (Exercise 1-3 days/week)' },
        { value: 'moderate', label: 'Moderately Active (Exercise 3-5 days/week)' },
        { value: 'active', label: 'Active (Exercise 6-7 days/week)' },
        { value: 'very_active', label: 'Very Active (Hard exercise/physical job)' }
    ];

    return (
        <div className="flex flex-col items-center p-4 md:p-8">
            <Header
                icon={FaFire}
                title="BMR & Calories"
                subtitle="Calculate Basal Metabolic Rate & Daily Calorie Needs"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl">
                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-100">
                    <h2 className="text-xl font-semibold mb-6">Personal Details</h2>

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

                    <CalculatorInput label="Weight" value={weight} onChange={setWeight} min={30} max={150} unit="kg" />
                    <CalculatorInput label="Height" value={height} onChange={setHeight} min={100} max={220} unit="cm" />
                    <CalculatorInput label="Age" value={age} onChange={setAge} min={10} max={100} unit="yrs" />

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
                </div>

                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-200">
                    <h2 className="text-xl font-semibold mb-6">Energy Requirements</h2>

                    <div className="gradient-primary rounded-2xl p-5 text-center mb-6">
                        <div className="text-sm text-white/80 uppercase tracking-wide mb-1">BMR (Resting)</div>
                        <div className="text-4xl font-extrabold text-white tracking-tight">
                            {Math.round(bmr)} <span className="text-xl font-medium text-white/70">kcal/day</span>
                        </div>
                        <div className="text-xs text-white/60 mt-1">Calories burned doing nothing</div>
                    </div>

                    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 text-center">
                        <div className="text-sm text-white/50 uppercase tracking-wide mb-1">Daily Needs</div>
                        <div className="text-3xl font-bold text-emerald-400">
                            {Math.round(dailyCalories)} <span className="text-lg text-emerald-400/70">kcal</span>
                        </div>
                        <div className="text-xs text-white/40 mt-1">To maintain current weight</div>
                    </div>

                    <div className="mt-8 border-t border-white/10 pt-8">
                        <h3 className="text-lg font-semibold text-white/90 mb-4">Calorie Needs by Activity</h3>
                        <ComparisonBarChart
                            data={calorieBreakdown}
                            layout="vertical"
                            bars={[{ dataKey: 'calories', name: 'Calories', color: '#f59e0b' }]}
                            xAxisKey="name"
                            height={300}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BMRCalculator;
