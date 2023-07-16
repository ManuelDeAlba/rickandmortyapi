import { useEffect } from "react";
import { NavLink } from "react-router-dom";

function Navbar(){
    useEffect(() => {
        document.querySelectorAll(".nav__link").forEach(link => {
            link.addEventListener("click", () => {
                document.getElementById("btnHamburguesa").checked = false;

                // Se hace scroll hacia arriba
                window.scrollTo(0, 0);
            })
        })
    }, [])

    return(
        <nav className="nav">
            <div className="nav__contenedor contenedor">
                <label className="nav__boton-hamburguesa" htmlFor="btnHamburguesa">
                    <svg fill="var(--color)" viewBox="0 0 100 100" width="30px">
                        <rect width="80" height="10" x="10" y="20" rx="5"></rect>
                        <rect width="80" height="10" x="10" y="45" rx="5"></rect>
                        <rect width="80" height="10" x="10" y="70" rx="5"></rect>
                    </svg>
                </label>
                <input type="checkbox" className="nav__checkbox" id="btnHamburguesa" />

                <ul className="nav__links">
                    {/* <li className="nav__item">
                        <NavLink className="nav__link" to="/">Inicio</NavLink>
                    </li> */}
                    <li className="nav__item">
                        <NavLink className="nav__link" to="/personajes">Personajes</NavLink>
                    </li>
                    <li className="nav__item">
                        <NavLink className="nav__link" to="/episodios">Episodios</NavLink>
                    </li>
                    <li className="nav__item">
                        <NavLink className="nav__link" to="/ubicaciones">Ubicaciones</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;