import { API_URLS } from "../consts";
import Paginacion from "../components/Paginacion";
import useFetch from "../hooks/useFetch";

function Episodios(){
    const {
        elementos:episodios,
        total,
        pagina,
        paginas,
        urls,
        obtenerElementos:obtenerEpisodios
    } = useFetch(API_URLS.episodes);

    return(
        <div className="contenedor">
            <h1 className="titulo">Episodios</h1>
            
            <div className="controles">
                <h3>Total: {total}</h3>
                <Paginacion
                    {...urls}
                    pagina={pagina}
                    paginas={paginas}
                    onClick={obtenerEpisodios}
                />
            </div>

            <div className="cards">
                {
                    episodios ? (
                        episodios.map(({id, name, air_date, episode}) => (
                            <div className="card episodio" key={id}>
                                <h2 className="card__titulo">{name}</h2>
                                <p><b>Estreno:</b> {air_date}</p>
                                <p><b>Episodio:</b> {episode}</p>
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
                    onClick={obtenerEpisodios}
                />
            </div>
        </div>
    )
}

export default Episodios;