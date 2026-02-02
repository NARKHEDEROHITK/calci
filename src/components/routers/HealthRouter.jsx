import { Routes, Route } from 'react-router-dom';
import BMICalculator from '../calculators/health/bmi/BMICalculator';
import BMRCalculator from '../calculators/health/bmr/BMRCalculator';
import IdealWeightCalculator from '../calculators/health/ideal-weight/IdealWeightCalculator';
import AgeCalculator from '../calculators/health/age/AgeCalculator';
import BodyFatCalculator from '../calculators/health/body-fat/BodyFatCalculator';
import WaterIntakeCalculator from '../calculators/health/water-intake/WaterIntakeCalculator';
import HealthDashboard from '../HealthDashboard';

const HealthRouter = () => {
    return (
        <Routes>
            <Route index element={<HealthDashboard />} />
            <Route path="bmi" element={<BMICalculator />} />
            <Route path="bmr" element={<BMRCalculator />} />
            <Route path="ideal-weight" element={<IdealWeightCalculator />} />
            <Route path="age" element={<AgeCalculator />} />
            <Route path="body-fat" element={<BodyFatCalculator />} />
            <Route path="water-intake" element={<WaterIntakeCalculator />} />
            <Route path="*" element={<HealthDashboard />} />
        </Routes>
    );
};

export default HealthRouter;
