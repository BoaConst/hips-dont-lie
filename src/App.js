import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HealthInformationLandingContainer from './HealthInformationLandingContainer';
import BarGraphContainer from './BarGraphContainer';


const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HealthInformationLandingContainer/>} />
      <Route path="/dashboard" element={<BarGraphContainer/>} />
    </Routes>
  </Router>
)

export default App;
