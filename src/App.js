import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HealthInformationLanding from './components/HealthInformationLanding';


const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HealthInformationLanding/>} />
    </Routes>
  </Router>
)

export default App;
