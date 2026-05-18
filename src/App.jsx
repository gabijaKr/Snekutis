import { Toaster } from "@/components/ui/toaster"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import StartScreen from './pages/StartScreen';
import PecsBoard from './pages/PecsBoard.jsx';
import PinEkranas from './pages/PinEkranas.jsx';
import TevuNustatymai from './pages/TevuNustatymai.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/board" element={<PecsBoard />} />
        <Route path="/pin" element={<PinEkranas />} />
        <Route path="/tevai" element={<TevuNustatymai />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
