import { useState, useMemo } from 'react';
import { FaTags } from 'react-icons/fa';
import Header from '../../../common/Header';
import CalculatorInput from '../../../common/CalculatorInput';
import { calculateDiscount } from '../../../../utils/utilityFormulas';
import { formatCurrency } from '../../../../utils/formatters';

const DiscountCalculator = () => {
    const [originalPrice, setOriginalPrice] = useState(1000);
    const [discount, setDiscount] = useState(20);

    const result = useMemo(() => calculateDiscount(originalPrice, discount), [originalPrice, discount]);

    return (
        <div className="flex flex-col items-center p-4 md:p-8">
            <Header
                icon={FaTags}
                title="Discount Calculator"
                subtitle="Calculate Final Price & Savings"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl">
                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-100">
                    <h2 className="text-xl font-semibold mb-6">Price Details</h2>

                    <CalculatorInput
                        label="Original Price"
                        value={originalPrice}
                        onChange={setOriginalPrice}
                        min={0}
                        max={10000000}
                        step={10}
                        unit="₹"
                        formatValue={formatCurrency}
                    />
                    <CalculatorInput
                        label="Discount Percentage"
                        value={discount}
                        onChange={setDiscount}
                        min={0}
                        max={100}
                        step={1}
                        unit="%"
                    />

                    <div className="flex flex-wrap gap-2 mt-4">
                        {[5, 10, 15, 20, 25, 30, 50, 70].map(d => (
                            <button
                                key={d}
                                onClick={() => setDiscount(d)}
                                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${discount === d ? 'bg-primary-500 text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}
                            >
                                {d}% OFF
                            </button>
                        ))}
                    </div>
                </div>

                <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up delay-200">
                    <h2 className="text-xl font-semibold mb-6">Final Amount</h2>

                    <div className="gradient-primary rounded-2xl p-5 text-center mb-6">
                        <div className="text-sm text-white/80 uppercase tracking-wide mb-1">Payable Price</div>
                        <div className="text-4xl font-extrabold text-white tracking-tight">
                            {formatCurrency(result.finalPrice)}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-white/10 pb-3">
                            <span className="text-white/60">Original Value</span>
                            <span className="text-white font-medium line-through decoration-white/30 decoration-2">{formatCurrency(originalPrice)}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                            <span className="text-emerald-400 font-medium">You Save</span>
                            <span className="text-emerald-400 font-bold text-lg">{formatCurrency(result.savings)}</span>
                        </div>
                        <div className="text-center text-xs text-white/40 mt-6">
                            Congratulations! You saved {discount}% on this purchase.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiscountCalculator;
