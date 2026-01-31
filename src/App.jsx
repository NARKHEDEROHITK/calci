import { Routes, Route } from 'react-router-dom';
import EMICalculator from './components/calculators/emi/EMICalculator';
import SIPCalculator from './components/calculators/sip/SIPCalculator';
import GSTCalculator from './components/calculators/gst/GSTCalculator';
import DummyCalculator from './components/calculators/DummyCalculator';
import Navbar from './components/common/Navbar';
import { FaHome } from 'react-icons/fa';

function App() {
  return (
    <>
      <Navbar />
      <main className="pt-20 md:pt-24">
        <Routes>
          <Route path="/" element={<EMICalculator />} />
          <Route
            path="/home-loan"
            element={<DummyCalculator title="Home Loan Calculator" icon={FaHome} />}
          />
          <Route path="/sip" element={<SIPCalculator />} />
          <Route path="/gst" element={<GSTCalculator />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
