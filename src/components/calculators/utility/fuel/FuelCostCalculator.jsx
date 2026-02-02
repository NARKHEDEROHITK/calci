import { useState, useMemo } from 'react';
import { FaGasPump } from 'react-icons/fa';
import Header from '../../../common/Header';
import CalculatorInput from '../../../common/CalculatorInput';
import { calculateFuelCost } from '../../../../utils/utilityFormulas';
import { formatCurrency } from '../../../../utils/formatters';

const FuelCostCalculator = () => {
    const [distance, setDistance] = useState(100);
    const [mileage, setMileage] = useState(15);
    const [price, setPrice] = useState(100);

    const result = useMemo(() => calculateFuelCost(distance, mileage, price), [distance, mileage, price]);

    return (
        <div className="flex flex-col items-center p-4 md:p-8">
            <Header
                icon={FaGasPump}
                title="Fuel Cost Calculator"
                subtitle="Estimate Trip Cost & Fuel Needed"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl">
                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-100">
                    <h2 className="text-xl font-semibold mb-6">Trip Details</h2>

                    <CalculatorInput
                        label="Total Distance (km)"
                        value={distance}
                        onChange={setDistance}
                        min={1}
                        max={10000}
                        step={1}
                        unit="km"
                    />
                    <CalculatorInput
                        label="Vehicle Mileage (km/l)"
                        value={mileage}
                        onChange={setMileage}
                        min={1}
                        max={100}
                        step={1}
                        unit="km/l"
                    />
                    <CalculatorInput
                        label="Fuel Price (per liter)"
                        value={price}
                        onChange={setPrice}
                        min={1}
                        max={200}
                        step={0.5}
                        unit="₹"
                        formatValue={formatCurrency}
                    />
                </div>

                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-200">
                    <h2 className="text-xl font-semibold mb-6">Cost Summary</h2>

                    <div className="gradient-primary rounded-2xl p-5 text-center mb-6">
                        <div className="text-sm text-white/80 uppercase tracking-wide mb-1">Total Fuel Cost</div>
                        <div className="text-4xl font-extrabold text-white tracking-tight">
                            {formatCurrency(result.totalCost)}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-white/10 pb-3">
                            <span className="text-white/60">Fuel Needed</span>
                            <span className="text-white font-medium">{result.fuelConsumed} Liters</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/10 pb-3">
                            <span className="text-white/60">Cost per km</span>
                            <span className="text-white font-medium">{formatCurrency(result.costPerKm)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FuelCostCalculator;
