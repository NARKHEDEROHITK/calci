import { Routes, Route } from 'react-router-dom';
import LumpsumCalculator from '../calculators/wealth/lumpsum/LumpsumCalculator';
import PPFCalculator from '../calculators/wealth/ppf/PPFCalculator';
import NPSCalculator from '../calculators/wealth/nps/NPSCalculator';
import SWPCalculator from '../calculators/wealth/swp/SWPCalculator';
import RetirementCalculator from '../calculators/wealth/retirement/RetirementCalculator';
import InflationCalculator from '../calculators/wealth/inflation/InflationCalculator';
import WealthDashboard from '../WealthDashboard';

const WealthRouter = () => {
    return (
        <Routes>
            <Route index element={<WealthDashboard />} />
            <Route path="lumpsum" element={<LumpsumCalculator />} />
            <Route path="ppf" element={<PPFCalculator />} />
            <Route path="nps" element={<NPSCalculator />} />
            <Route path="swp" element={<SWPCalculator />} />
            <Route path="retirement" element={<RetirementCalculator />} />
            <Route path="inflation" element={<InflationCalculator />} />
            <Route path="*" element={<WealthDashboard />} />
        </Routes>
    );
};

export default WealthRouter;
