import { API_URLS } from "../consts";

import Paginacion from "../components/Paginacion";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";

function Ubicaciones(){
    const {
        elementos:ubicaciones,
        total,
        pagina,
        paginas,
        urls,
        cargando,
        error,
        obtenerElementos:obtenerUbicaciones
    } = useFetch(API_URLS.locations);

    return(
        <div className="contenedor">
            <h1 className="titulo">Ubicaciones</h1>
            
            <div className="controles">
                <h3>Total: {total}</h3>
                <Paginacion
                    {...urls}
                    pagina={pagina}
                    paginas={paginas}
                    onClick={obtenerUbicaciones}
                />
            </div>

            <div className="cards">
                {
                    cargando ? (
                        <h2 className="titulo contenedor">Cargando...</h2>
                    ) : (
                        error ? (
                            <h2 className="titulo contenedor">{error}</h2>
                        ) : (
                            ubicaciones && (
                                ubicaciones.map(({id, name, type, dimension}) => (
                                    <div className="card" key={id}>
                                        <h2 className="card__titulo">{name}</h2>
        
                                        <div className="card__informacion">
                                            <p><b>Tipo:</b> {type}</p>
                                            <p><b>Dimension:</b> {dimension}</p>
                                        </div>
        
                                        <Link className="card__mas boton" to={`/ubicaciones/${id}`}>Ver más</Link>
                                    </div>
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
                    onClick={obtenerUbicaciones}
                />
            </div>
        </div>
    )
}

export default Ubicaciones;