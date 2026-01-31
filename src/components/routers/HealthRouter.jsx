import { useParams } from 'react-router-dom';
import BMICalculator from '../calculators/health/bmi/BMICalculator';
import BMRCalculator from '../calculators/health/bmr/BMRCalculator';
import IdealWeightCalculator from '../calculators/health/ideal-weight/IdealWeightCalculator';
import AgeCalculator from '../calculators/health/age/AgeCalculator';
import BodyFatCalculator from '../calculators/health/body-fat/BodyFatCalculator';
import WaterIntakeCalculator from '../calculators/health/water-intake/WaterIntakeCalculator';
import HealthDashboard from '../HealthDashboard';

const HealthRouter = () => {
    const { id } = useParams();
    const cleanId = id?.toLowerCase() || '';

    if (cleanId.startsWith('bmi')) return <BMICalculator />;
    if (cleanId.startsWith('bmr')) return <BMRCalculator />;

    // "ideal-weight" or "ideal"
    if (cleanId.startsWith('ideal')) return <IdealWeightCalculator />;

    if (cleanId.startsWith('age')) return <AgeCalculator />;

    // "body-fat" or "body"
    if (cleanId.startsWith('body')) return <BodyFatCalculator />;

    // "water-intake" or "water"
    if (cleanId.startsWith('water')) return <WaterIntakeCalculator />;

    return <HealthDashboard />;
};

export default HealthRouter;
