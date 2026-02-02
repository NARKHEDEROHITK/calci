import { Routes, Route } from 'react-router-dom';
import IncomeTaxCalculator from '../calculators/tax/income-tax/IncomeTaxCalculator';
import HRACalculator from '../calculators/tax/hra/HRACalculator';
import PFCalculator from '../calculators/tax/pf/PFCalculator';
import GratuityCalculator from '../calculators/tax/gratuity/GratuityCalculator';
import TDSCalculator from '../calculators/tax/tds/TDSCalculator';
import CapitalGainsCalculator from '../calculators/tax/capital-gains/CapitalGainsCalculator';
import TaxDashboard from '../TaxDashboard';

const TaxRouter = () => {
    return (
        <Routes>
            <Route index element={<TaxDashboard />} />
            <Route path="income-tax" element={<IncomeTaxCalculator />} />
            <Route path="hra" element={<HRACalculator />} />
            <Route path="pf" element={<PFCalculator />} />
            <Route path="gratuity" element={<GratuityCalculator />} />
            <Route path="tds" element={<TDSCalculator />} />
            <Route path="capital-gains" element={<CapitalGainsCalculator />} />
            <Route path="*" element={<TaxDashboard />} />
        </Routes>
    );
};

export default TaxRouter;
