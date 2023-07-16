import { API_URLS } from "../consts";

import Paginacion from "../components/Paginacion";
import useFetch from "../hooks/useFetch";

function Ubicaciones(){
    const {
        elementos:ubicaciones,
        total,
        pagina,
        paginas,
        urls,
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
                    ubicaciones ? (
                        ubicaciones.map(({id, name, type, dimension}) => (
                            <div className="card ubicacion" key={id}>
                                <h2 className="card__titulo">{name}</h2>
                                <p><b>Tipo:</b> {type}</p>
                                <p><b>Dimension:</b> {dimension}</p>
                            </div>
                        ))
                    ) : (
                        <h2 className="titulo contenedor">Cargando...</h2>
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