import { useParams } from 'react-router-dom';
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
    const { id } = useParams();
    const cleanId = id?.toLowerCase() || '';

    // Order matters for overlapping prefixes (though here most are distinct enough)
    // Checking longest prefixes first or unique ones is safer.

    if (cleanId.startsWith('home-loan')) return <EMICalculator />;

    // "personal" vs "personal-loan" - straightforward
    if (cleanId.startsWith('personal-loan')) return <PersonalLoanCalculator />;

    // "sip"
    if (cleanId.startsWith('sip')) return <SIPCalculator />;

    // "fd" or "rd" or "fd-rd"
    if (cleanId.startsWith('fd') || cleanId.startsWith('rd')) return <FDRDCalculator />;

    // "gst"
    if (cleanId.startsWith('gst')) return <GSTCalculator />;

    // "cagr"
    if (cleanId.startsWith('cagr')) return <CAGRCalculator />;

    // "salary-hike" or just "salary"
    if (cleanId.startsWith('salary')) return <SalaryHikeCalculator />;

    // "simple-interest" - check "simple"
    if (cleanId.startsWith('simple')) return <SimpleInterestCalculator />;

    // "compound-interest" - check "compound"
    if (cleanId.startsWith('compound')) return <CompoundInterestCalculator />;

    // If no match found, show dashboard
    return <FinanceDashboard />;
};

export default FinanceRouter;
