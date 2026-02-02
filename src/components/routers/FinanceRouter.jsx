import { Routes, Route } from 'react-router-dom';
import EMICalculator from '../calculators/finance/emi/EMICalculator';
import PersonalLoanCalculator from '../calculators/finance/personal-loan/PersonalLoanCalculator';
import SIPCalculator from '../calculators/finance/sip/SIPCalculator';
import FDRDCalculator from '../calculators/finance/fd-rd/FDRDCalculator';
import GSTCalculator from '../calculators/finance/gst/GSTCalculator';
import CAGRCalculator from '../calculators/finance/cagr/CAGRCalculator';
import SalaryHikeCalculator from '../calculators/finance/salary-hike/SalaryHikeCalculator';
import SimpleInterestCalculator from '../calculators/finance/simple-interest/SimpleInterestCalculator';
import CompoundInterestCalculator from '../calculators/finance/compound-interest/CompoundInterestCalculator';
import FinanceDashboard from '../FinanceDashboard';

const FinanceRouter = () => {
    return (
        <Routes>
            <Route index element={<FinanceDashboard />} />
            <Route path="home-loan" element={<EMICalculator />} />
            <Route path="personal-loan" element={<PersonalLoanCalculator />} />
            <Route path="sip" element={<SIPCalculator />} />

            {/* Handling multiple paths for FD/RD if necessary, but sticking to navConfig path */}
            <Route path="fd-rd" element={<FDRDCalculator />} />
            <Route path="fd" element={<FDRDCalculator />} />
            <Route path="rd" element={<FDRDCalculator />} />

            <Route path="gst" element={<GSTCalculator />} />
            <Route path="cagr" element={<CAGRCalculator />} />
            <Route path="salary-hike" element={<SalaryHikeCalculator />} />
            <Route path="salary" element={<SalaryHikeCalculator />} />

            <Route path="simple-interest" element={<SimpleInterestCalculator />} />
            <Route path="compound-interest" element={<CompoundInterestCalculator />} />

            <Route path="*" element={<FinanceDashboard />} />
        </Routes>
    );
};

export default FinanceRouter;
