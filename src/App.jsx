import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import HomePage from './pages/HomePage';
import CreateTeamPage from './pages/CreateTeamPage';
import Navbar from './components/Navbar';
import ImportTeamPage from './pages/ImportTeamPage';
import InfoPage from './pages/InfoPage';


function App() {
  return (
    <Router>
      <div className="App">
      <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreateTeamPage />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path="/import" element={<ImportTeamPage />} /> {/* Ruta para importar equipo */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
