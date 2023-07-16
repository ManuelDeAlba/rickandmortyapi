import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';

// import Inicio from './pages/Inicio';
import Personajes from './pages/Personajes';
import Ubicaciones from './pages/Ubicaciones';
import Episodios from './pages/Episodios';

function App(){
    return(
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Navigate to="/personajes" />}></Route>
                <Route path="/personajes" element={<Personajes />}></Route>
                <Route path="/episodios" element={<Episodios />}></Route>
                <Route path="/ubicaciones" element={<Ubicaciones />}></Route>
            </Routes>
        </Router>
    )
}

export default App;