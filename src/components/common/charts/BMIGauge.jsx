import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, ReferenceLine, Tooltip, Cell } from 'recharts';

const BMIGauge = ({ bmiValue }) => {
    // Ranges: Underweight (<18.5), Normal (18.5-25), Overweight (25-30), Obese (>30)
    // We can simulate a stacked bar from 0 to 45 (approx max BMI likely)
    const maxScale = 45;

    const data = [
        {
            name: 'BMI Scale',
            underweight: 18.5,
            normal: 6.4, // 24.9 - 18.5
            overweight: 5,   // 29.9 - 24.9
            obese: 15.1,     // Rest up to 45
        }
    ];

    return (
        <div className="w-full h-32">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis type="number" domain={[0, maxScale]} hide />
                    <YAxis type="category" dataKey="name" hide />
                    <Tooltip cursor={false} content={() => null} />

                    <Bar dataKey="underweight" stackId="bmi" fill="#FACC15" name="Underweight" />
                    <Bar dataKey="normal" stackId="bmi" fill="#10B981" name="Normal" />
                    <Bar dataKey="overweight" stackId="bmi" fill="#F97316" name="Overweight" />
                    <Bar dataKey="obese" stackId="bmi" fill="#EF4444" name="Obese" />

                    <ReferenceLine x={bmiValue} stroke="#fff" strokeWidth={4} label={{ position: 'top', value: `You: ${bmiValue.toFixed(1)}`, fill: '#fff', fontSize: 12, fontWeight: 'bold' }} />
                </BarChart>
            </ResponsiveContainer>

            <div className="flex justify-between text-[10px] text-white/50 px-2 -mt-4">
                <span>0</span>
                <span>18.5</span>
                <span>25</span>
                <span>30</span>
                <span>40+</span>
            </div>
        </div>
    );
};

export default BMIGauge;
