import { useState, useEffect } from 'react';
import { FaBirthdayCake } from 'react-icons/fa';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import Header from '../../../common/Header';
import { calculateAge } from '../../../../utils/healthFormulas';

const AgeCalculator = () => {
    const [dob, setDob] = useState('');
    const [age, setAge] = useState({ years: 0, months: 0, days: 0 });

    useEffect(() => {
        if (dob) {
            setAge(calculateAge(dob));
        }
    }, [dob]);

    return (
        <div className="flex flex-col items-center p-4 md:p-8">
            <Header
                icon={FaBirthdayCake}
                title="Age Calculator"
                subtitle="Calculate your exact age in years, months, and days"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-4xl">
                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-100 flex flex-col justify-center">
                    <h2 className="text-xl font-semibold mb-6">Select Birth Date</h2>
                    <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="w-full bg-white/[0.08] border border-white/10 rounded-xl px-4 py-4 text-white text-lg focus:border-primary-500 outline-none block"
                    />
                </div>

                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-200">
                    <h2 className="text-xl font-semibold mb-6">Your Exact Age</h2>

                    <div className="space-y-4 mb-8">
                        <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-indigo-500/30 rounded-xl p-4 flex justify-between items-center">
                            <span className="text-white/70">Years</span>
                            <span className="text-3xl font-bold text-white">{age.years}</span>
                        </div>
                        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-4 flex justify-between items-center">
                            <span className="text-white/70">Months</span>
                            <span className="text-3xl font-bold text-white">{age.months}</span>
                        </div>
                        <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-xl p-4 flex justify-between items-center">
                            <span className="text-white/70">Days</span>
                            <span className="text-3xl font-bold text-white">{age.days}</span>
                        </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-white/10">
                        <h3 className="text-sm font-semibold text-white/70 mb-2">Life Timeline (0-100 yrs)</h3>
                        <div className="h-16 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    layout="vertical"
                                    data={[{ name: 'Age', value: age.years }]}
                                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                                >
                                    <XAxis type="number" domain={[0, 100]} hide />
                                    <YAxis type="category" dataKey="name" hide />
                                    <Tooltip cursor={false} contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }} separator=": " />
                                    <Bar dataKey="value" fill="#8b5cf6" radius={[0, 4, 4, 0]} background={{ fill: '#ffffff10', radius: 4 }} barSize={32} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex justify-between text-[10px] text-white/30 px-1 mt-1">
                            <span>0</span>
                            <span>25</span>
                            <span>50</span>
                            <span>75</span>
                            <span>100</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgeCalculator;
