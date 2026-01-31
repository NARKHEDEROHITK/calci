import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ComparisonBarChart = ({
    data,
    xAxisKey = "name",
    bars = [],
    height = 300,
    layout = "horizontal",
    className = ""
}) => {
    if (!data || data.length === 0) return null;

    return (
        <div className={`w-full ${className}`} style={{ height }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    layout={layout}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" vertical={false} />
                    {layout === 'vertical' ? (
                        <>
                            <XAxis type="number" hide />
                            <YAxis
                                dataKey={xAxisKey}
                                type="category"
                                width={100}
                                stroke="#ffffff80"
                                tick={{ fill: '#ffffff80', fontSize: 12 }}
                                tickLine={false}
                                axisLine={false}
                            />
                        </>
                    ) : (
                        <>
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
                        </>
                    )}

                    <Tooltip
                        cursor={{ fill: '#ffffff10' }}
                        contentStyle={{
                            backgroundColor: 'rgba(23, 23, 23, 0.95)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '12px',
                            color: '#fff'
                        }}
                    />
                    <Legend />
                    {bars.map((bar, index) => (
                        <Bar
                            key={bar.dataKey || index}
                            dataKey={bar.dataKey}
                            name={bar.name}
                            fill={bar.color}
                            radius={layout === 'vertical' ? [0, 4, 4, 0] : [4, 4, 0, 0]}
                            barSize={32}
                            stackId={bar.stackId}
                        />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ComparisonBarChart;
