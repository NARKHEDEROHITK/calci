import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';

import FinanceDashboard from './components/FinanceDashboard';
import FinanceRouter from './components/routers/FinanceRouter';

import HealthDashboard from './components/HealthDashboard';
import HealthRouter from './components/routers/HealthRouter';

import Sidebar from './components/common/Sidebar';

function App() {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 pt-24 pb-12 px-4 lg:ml-72 transition-all duration-300">
          <Routes>
            {/* Root - Shows Finance Dashboard */}
            <Route path="/" element={<FinanceDashboard />} />

            {/* Finance Routes */}
            <Route path="/finance" element={<FinanceDashboard />} />
            <Route path="/finance/:id" element={<FinanceRouter />} />

            {/* Health Routes */}
            <Route path="/health" element={<HealthDashboard />} />
            <Route path="/health/:id" element={<HealthRouter />} />

            {/* Global Fallback - anything else goes to Finance Dashboard */}
            <Route path="*" element={<FinanceDashboard />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
