import { useState, useMemo } from 'react';
import { FaLightbulb } from 'react-icons/fa';
import Header from '../../../common/Header';
import CalculatorInput from '../../../common/CalculatorInput';
import { calculateElectricity } from '../../../../utils/utilityFormulas';
import { formatCurrency } from '../../../../utils/formatters';

const ElectricityBillEstimator = () => {
    const [units, setUnits] = useState(250);
    const [rate, setRate] = useState(8);

    const result = useMemo(() => calculateElectricity(units, rate), [units, rate]);

    return (
        <div className="flex flex-col items-center p-4 md:p-8">
            <Header
                icon={FaLightbulb}
                title="Electricity Bill Estimator"
                subtitle="Calculate Monthly Power Cost"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl">
                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-100">
                    <h2 className="text-xl font-semibold mb-6">Usage Details</h2>

                    <CalculatorInput
                        label="Units Consumed (kWh)"
                        value={units}
                        onChange={setUnits}
                        min={0}
                        max={10000}
                        step={10}
                        unit="Units"
                    />
                    <p className="text-xs text-white/40 mb-6 -mt-2">Check your meter or previous bills for usage units.</p>

                    <CalculatorInput
                        label="Rate per Unit"
                        value={rate}
                        onChange={setRate}
                        min={0}
                        max={100}
                        step={0.1}
                        unit="₹"
                        formatValue={formatCurrency}
                    />
                </div>

                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-200">
                    <h2 className="text-xl font-semibold mb-6">Estimated Bill</h2>

                    <div className="gradient-primary rounded-2xl p-5 text-center mb-6">
                        <div className="text-sm text-white/80 uppercase tracking-wide mb-1">Total Amount</div>
                        <div className="text-4xl font-extrabold text-white tracking-tight">
                            {formatCurrency(result.totalBill)}
                        </div>
                    </div>

                    <div className="bg-white/5 rounded-xl p-4 text-sm text-white/60">
                        <p className="mb-2"><strong>Note:</strong> Calculate is based on flat rate. Actual bill may include fixed charges, taxes, and tiered usage slabs used by your electricity provider.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ElectricityBillEstimator;
