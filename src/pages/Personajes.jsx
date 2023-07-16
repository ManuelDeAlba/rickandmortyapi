import { API_URLS } from "../consts";
import Paginacion from "../components/Paginacion";
import useFetch from "../hooks/useFetch";
import Filtro from "../components/Filtro";
import { useEffect, useState } from "react";

function Personajes(){
    const [filtros, setFiltros] = useState(null);

    const {
        elementos:personajes,
        total,
        pagina,
        paginas,
        urls,
        error,
        obtenerElementos:obtenerPersonajes
    } = useFetch(API_URLS.characters);

    useEffect(() => {
        if(!filtros) return;

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
                <Filtro setFiltros={setFiltros} />
            </div>

            <div className="cards">
                {
                    error ? (
                        <h2 className="titulo contenedor">{error}</h2>
                    ) : (
                        personajes ? (
                            personajes.map(({id, name, status, species, type, gender, origin: {name:originName}, location: {name:locationName}, image}) => (
                                <div className="card personaje" key={id}>
                                    <img className="card__img" src={image} alt={`Imagen de ${name}`} />
                                    <h2 className="card__titulo">{name}</h2>
                                    <p><b>Estado:</b> {status}</p>
                                    <p><b>Especie:</b> {species}</p>
                                    { type && (<p><b>Tipo:</b> {type}</p>) }
                                    <p><b>Genero:</b> {gender}</p>
                                    <p><b>Origen:</b> {originName}</p>
                                    <p><b>Ubicacion:</b> {locationName}</p>
                                </div>
                            ))
                        ) : (
                            <h2 className="titulo contenedor">Cargando...</h2>
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