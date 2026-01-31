import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const GrowthLineChart = ({
    data,
    xAxisKey = "year",
    lines = [],
    height = 300,
    className = ""
}) => {
    if (!data || data.length === 0) return null;

    return (
        <div className={`w-full ${className}`} style={{ height }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" vertical={false} />
                    <XAxis
                        dataKey={xAxisKey}
                        stroke="#ffffff80"
                        tick={{ fill: '#ffffff80', fontSize: 12 }}
                        tickLine={false}
                        axisLine={{ stroke: '#ffffff20' }}
                    />
                    <YAxis
                        stroke="#ffffff80"
                        tick={{ fill: '#ffffff80', fontSize: 12 }}
                        tickFormatter={(value) => `${value >= 1000 ? value / 1000 + 'k' : value}`}
                        tickLine={false}
                        axisLine={false}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgba(23, 23, 23, 0.95)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '12px',
                            color: '#fff'
                        }}
                    />
                    <Legend />
                    {lines.map((line, index) => (
                        <Line
                            key={line.dataKey || index}
                            type="monotone"
                            dataKey={line.dataKey}
                            name={line.name}
                            stroke={line.color}
                            strokeWidth={3}
                            dot={false}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default GrowthLineChart;
