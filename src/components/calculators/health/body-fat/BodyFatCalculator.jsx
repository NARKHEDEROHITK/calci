import { useState, useMemo } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import Header from '../../../common/Header';
import CalculatorInput from '../../../common/CalculatorInput';
import { calculateBodyFat, getBodyFatCategory } from '../../../../utils/healthFormulas';
import CustomPieChart from '../../../common/charts/CustomPieChart';

const BodyFatCalculator = () => {
    const [gender, setGender] = useState('male');
    const [waist, setWaist] = useState(80);
    const [neck, setNeck] = useState(38);
    const [height, setHeight] = useState(175);
    const [hip, setHip] = useState(95); // Only for female

    const bodyFat = useMemo(() => {
        return calculateBodyFat(gender, waist, neck, height, hip);
    }, [gender, waist, neck, height, hip]);

    const { category, color } = getBodyFatCategory(bodyFat, gender);
    const chartData = [
        { name: 'Body Fat', value: bodyFat > 0 ? Number(bodyFat.toFixed(1)) : 0, color: color },
        { name: 'Lean Mass', value: bodyFat > 0 ? Number((100 - bodyFat).toFixed(1)) : 100, color: '#334155' }
    ];

    return (
        <div className="flex flex-col items-center p-4 md:p-8">
            <Header
                icon={FaUserCircle}
                title="Body Fat (%)"
                subtitle="Calculate Body Fat Percentage (US Navy Method)"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl">
                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-100">
                    <h2 className="text-xl font-semibold mb-6">Measurements</h2>

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

                    <CalculatorInput label="Height" value={height} onChange={setHeight} min={100} max={250} unit="cm" />
                    <CalculatorInput label="Neck Circumference" value={neck} onChange={setNeck} min={20} max={80} unit="cm" />
                    <CalculatorInput label="Waist Circumference" value={waist} onChange={setWaist} min={40} max={150} unit="cm" />

                    {gender === 'female' && (
                        <CalculatorInput label="Hip Circumference" value={hip} onChange={setHip} min={40} max={150} unit="cm" />
                    )}
                </div>

                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-200">
                    <h2 className="text-xl font-semibold mb-6">Results</h2>

                    <div className="gradient-primary rounded-2xl p-5 text-center mb-6">
                        <div className="text-sm text-white/80 uppercase tracking-wide mb-1">Body Fat Percentage</div>
                        <div className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                            {bodyFat > 0 ? bodyFat.toFixed(1) : '-'}%
                        </div>
                        {bodyFat > 0 && (
                            <div className="text-lg font-medium text-white/90 mt-2" style={{ color: color }}>
                                {category}
                            </div>
                        )}
                    </div>

                    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-white/70 mb-2">Fitness Categories (Men | Women)</h3>
                        <div className="space-y-1 text-sm text-white/60">
                            <div className="flex justify-between">
                                <span>Essential Fat</span>
                                <span>2-5% | 10-13%</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Athletes</span>
                                <span>6-13% | 14-20%</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Fitness</span>
                                <span>14-17% | 21-24%</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Average</span>
                                <span>18-24% | 25-31%</span>
                            </div>
                            <div className="flex justify-between text-red-400">
                                <span>Obese</span>
                                <span>25%+ | 32%+</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 border-t border-white/10 pt-8">
                        <h3 className="text-lg font-semibold text-white/90 mb-4">Composition Analysis</h3>
                        <CustomPieChart
                            data={chartData}
                            height={250}
                            innerRadius={60}
                            outerRadius={80}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BodyFatCalculator;
