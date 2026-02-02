import { Routes, Route } from 'react-router-dom';
import DocsLayout from '../docs/DocsLayout';
import Introduction from '../docs/pages/Introduction';
import Structure from '../docs/pages/Structure';
import RoutingDocs from '../docs/pages/RoutingDocs';
import CalculatorsDocs from '../docs/pages/CalculatorsDocs';
import UtilityDocs from '../docs/pages/UtilityDocs';

const DocsRouter = () => {
    return (
        <Routes>
            <Route element={<DocsLayout />}>
                <Route index element={<Introduction />} />
                <Route path="structure" element={<Structure />} />
                <Route path="routing" element={<RoutingDocs />} />
                <Route path="calculators" element={<CalculatorsDocs />} />
                <Route path="utilities" element={<UtilityDocs />} />
            </Route>
        </Routes>
    );
};

export default DocsRouter;
