import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Game from './components/Game';
import ColorblindChoice from './components/ColorblindChoice';
import ColorExercise from './components/ColorExercise';
import ExerciseOptions from './UserExerciseOptions';
import ExerciseTraining from './UserExerciseTraining';
import ExerciseTesting from './UserExerciseTesting';


const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<ExerciseOptions/>} />
      <Route path="/game" element={<Game/>} />
      <Route path="/options" element={<ColorblindChoice/>} />
      <Route path="/colorExercise" element={<ColorExercise/>} />
      <Route path="/userExerciseOptions" element={<ExerciseOptions/>} />
      <Route path="/userExerciseTraining" element={<ExerciseTraining/>} />
      <Route path="/userExerciseTesting" element={<ExerciseTesting/>} />
    </Routes>
  </Router>
)

export default App;
