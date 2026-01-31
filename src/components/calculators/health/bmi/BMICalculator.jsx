import { useState, useMemo } from 'react';
import { FaWeight } from 'react-icons/fa';
import Header from '../../../common/Header';
import CalculatorInput from '../../../common/CalculatorInput';
import ResultCard from '../../../common/ResultCard';
import { calculateBMI } from '../../../../utils/healthFormulas';
import BMIGauge from '../../../common/charts/BMIGauge';

const BMICalculator = () => {
    const [weight, setWeight] = useState(70);
    const [height, setHeight] = useState(170);

    const { bmi, status, color } = useMemo(() => {
        return calculateBMI(weight, height);
    }, [weight, height]);

    return (
        <div className="flex flex-col items-center p-4 md:p-8">
            <Header
                icon={FaWeight}
                title="BMI Calculator"
                subtitle="Calculate Body Mass Index"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl">
                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-100">
                    <h2 className="text-xl font-semibold mb-6">Body Metrics</h2>

                    <CalculatorInput
                        label="Weight"
                        value={weight}
                        onChange={setWeight}
                        min={20}
                        max={200}
                        step={0.5}
                        unit="kg"
                    />

                    <CalculatorInput
                        label="Height"
                        value={height}
                        onChange={setHeight}
                        min={50}
                        max={250}
                        step={1}
                        unit="cm"
                    />
                </div>

                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-200">
                    <h2 className="text-xl font-semibold mb-6">Your BMI Score</h2>

                    <div className="gradient-primary rounded-2xl p-5 text-center mb-6">
                        <div className="text-sm text-white/80 uppercase tracking-wide mb-1">BMI Value</div>
                        <div className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                            {bmi.toFixed(1)}
                        </div>
                        <div className={`text-xl font-bold mt-2 ${color}`}>
                            {status}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                            <h3 className="text-sm font-semibold text-white/70 mb-2">BMI Categories</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between text-yellow-400">
                                    <span>Underweight</span>
                                    <span>&lt; 18.5</span>
                                </div>
                                <div className="flex justify-between text-emerald-400">
                                    <span>Normal</span>
                                    <span>18.5 - 24.9</span>
                                </div>
                                <div className="flex justify-between text-orange-400">
                                    <span>Overweight</span>
                                    <span>25 - 29.9</span>
                                </div>
                                <div className="flex justify-between text-red-400">
                                    <span>Obese</span>
                                    <span>&ge; 30</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 border-t border-white/10 pt-8">
                        <h3 className="text-lg font-semibold text-white/90 mb-4">BMI Scale Position</h3>
                        <BMIGauge bmiValue={bmi} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BMICalculator;
