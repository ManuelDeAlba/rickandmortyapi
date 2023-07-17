import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import ScrollToTop from './utils/ScrollToTop';

import Navbar from './components/Navbar';

import Personajes from './pages/Personajes';
import Personaje from './pages/Personaje';
import Episodios from './pages/Episodios';
import Episodio from './pages/Episodio';
import Ubicaciones from './pages/Ubicaciones';
import Ubicacion from './pages/Ubicacion';

function App(){
    return(
        <Router>
            <ScrollToTop>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Navigate to="/personajes" />}></Route>
                    <Route path="/personajes" element={<Personajes />}></Route>
                    <Route path="/personajes/:id" element={<Personaje />}></Route>
                    <Route path="/episodios" element={<Episodios />}></Route>
                    <Route path="/episodios/:id" element={<Episodio />}></Route>
                    <Route path="/ubicaciones" element={<Ubicaciones />}></Route>
                    <Route path="/ubicaciones/:id" element={<Ubicacion />}></Route>
                </Routes>
            </ScrollToTop>
        </Router>
    )
}

export default App;