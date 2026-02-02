import { Routes, Route } from 'react-router-dom';
import DiscountCalculator from '../calculators/utility/discount/DiscountCalculator';
import PercentageCalculator from '../calculators/utility/percentage/PercentageCalculator';
import FuelCostCalculator from '../calculators/utility/fuel/FuelCostCalculator';
import ElectricityBillEstimator from '../calculators/utility/electricity/ElectricityBillEstimator';
import TipCalculator from '../calculators/utility/tip/TipCalculator';
import UnitConverter from '../calculators/utility/converter/UnitConverter';
import UtilityDashboard from '../UtilityDashboard';

const UtilityRouter = () => {
    return (
        <Routes>
            <Route index element={<UtilityDashboard />} />
            <Route path="discount" element={<DiscountCalculator />} />
            <Route path="percentage" element={<PercentageCalculator />} />
            <Route path="fuel" element={<FuelCostCalculator />} />
            <Route path="electricity" element={<ElectricityBillEstimator />} />
            <Route path="tip" element={<TipCalculator />} />
            <Route path="converter" element={<UnitConverter />} />
            <Route path="*" element={<UtilityDashboard />} />
        </Routes>
    );
};

export default UtilityRouter;
