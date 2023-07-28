import { API_URLS } from "../consts";
import Paginacion from "../components/Paginacion";
import useFetch from "../hooks/useFetch";
import Filtro from "../components/Filtro";
import { useEffect, useState } from "react";
import CardPersonaje from "../components/CardPersonaje";

function Personajes(){
    const [filtros, setFiltros] = useState({
        nombre: "",
        estado: "",
        genero: ""
    });

    const {
        elementos:personajes,
        total,
        pagina,
        paginas,
        urls,
        cargando,
        error,
        obtenerElementos:obtenerPersonajes
    } = useFetch(API_URLS.characters);

    useEffect(() => {
        let nombre = filtros.nombre || "";
        let estado = filtros.estado || "";
        let genero = filtros.genero || "";

        let url = `${API_URLS.characters}?name=${nombre}&status=${estado}&gender=${genero}`;

        obtenerPersonajes(url);
    }, [filtros])

    return(
        <div className="contenedor">
            <h1 className="titulo">Personajes</h1>

            <div className="controles">
                <h3>Total: {total}</h3>
                <Paginacion
                    {...urls}
                    pagina={pagina}
                    paginas={paginas}
                    onClick={obtenerPersonajes}
                    filtros={filtros}
                />
                {/* Al cambiar el filtro se actualiza la lista */}
                <Filtro filtros={filtros} setFiltros={setFiltros} />
            </div>

            <div className="cards">
                {
                    cargando ? (
                        <h2 className="titulo contenedor">Cargando...</h2>
                    ) : (
                        error ? (
                            <h2 className="titulo contenedor">{error}</h2>
                        ) : (
                            personajes && (
                                personajes.map((personaje) => (
                                    <CardPersonaje personaje={personaje} key={personaje.id} />
                                ))
                            )
                        )
                    )
                }
            </div>

            <div className="controles">
                <Paginacion
                    {...urls}
                    pagina={pagina}
                    paginas={paginas}
                    onClick={obtenerPersonajes}
                    filtros={filtros}
                />
            </div>
        </div>
    )
}

export default Personajes;