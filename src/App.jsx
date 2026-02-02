import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';

import FinanceDashboard from './components/FinanceDashboard';
import FinanceRouter from './components/routers/FinanceRouter';

import HealthDashboard from './components/HealthDashboard';
import HealthRouter from './components/routers/HealthRouter';

import TaxDashboard from './components/TaxDashboard';
import TaxRouter from './components/routers/TaxRouter';

import WealthDashboard from './components/WealthDashboard';
import WealthRouter from './components/routers/WealthRouter';

import UtilityDashboard from './components/UtilityDashboard';
import UtilityRouter from './components/routers/UtilityRouter';

import DocsRouter from './components/routers/DocsRouter';


import Sidebar from './components/common/Sidebar';

const App = () => {
  const location = useLocation();
  const isDocs = location.pathname.startsWith('/docs');

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen">
        <Sidebar />
        <main
          className={`flex-1 pt-24 pb-12 px-4 transition-all duration-300 ${isDocs ? '' : 'lg:ml-72'}`}
        >
          <Routes>
            {/* Root - Shows Finance Dashboard */}
            <Route path="/" element={<FinanceDashboard />} />

            {/* Finance Routes */}
            <Route path="/finance/*" element={<FinanceRouter />} />

            {/* Wealth Routes */}
            <Route path="/wealth/*" element={<WealthRouter />} />

            {/* Tax Routes */}
            <Route path="/tax/*" element={<TaxRouter />} />

            {/* Utility Routes */}
            <Route path="/utility/*" element={<UtilityRouter />} />

            {/* Health Routes */}
            <Route path="/health/*" element={<HealthRouter />} />

            {/* Documentation Routes */}
            <Route path="/docs/*" element={<DocsRouter />} />

            {/* Global Fallback - anything else goes to Finance Dashboard */}
            <Route path="*" element={<FinanceDashboard />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
