import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { obtenerEpisodio, obtenerPersonaje, obtenerUbicacion } from "../fetch";

function Personaje(){
    let { id } = useParams();
    const [personaje, setPersonaje] = useState(null);

    useEffect(() => {
        const guardarPersonaje = async () => {
            // Se obtiene el personaje
            let datos = await obtenerPersonaje({ id });         

            // De cada episodio se obtiene la información
            let episodios = datos.episode.map(async url => await obtenerEpisodio({ url }));
            episodios = await Promise.all(episodios);

            // Se guardan los datos
            setPersonaje({
                ...datos,
                episode: episodios
            });
        }
        guardarPersonaje();
    }, [])

    if(!personaje) return <h2 className="titulo contenedor">Cargando...</h2>

    return(
        <div className="informacion">
            <h1 className="informacion__titulo titulo contenedor">{personaje.name}</h1>
            <img className="informacion__img" src={personaje.image} alt={`Imagen de ${personaje.name}`} />

            <div className="informacion__textos">
                <div className="informacion__contenedor contenedor">
                    <h2 className="informacion__titulo">Información</h2>
                    <p><b>Estado:</b> {personaje.status}</p>
                    <p><b>Especie:</b> {personaje.species}</p>
                    { personaje.type && (<p><b>Tipo:</b> {personaje.type}</p>) }
                    <p><b>Genero:</b> {personaje.gender}</p>
                    <p><b>Origen:</b> {personaje.origin.name}</p>
                    <p><b>Ubicacion:</b> {personaje.location.name}</p>
                </div>
            </div>

            <div className="informacion__episodios contenedor">
                <h2 className="informacion__titulo">Episodios ({personaje.episode.length})</h2>
                <ul>
                    {
                        personaje.episode.map(episodio => (
                            <li key={episodio.id}><Link to={`/episodios/${episodio.id}`}>{episodio.episode}</Link> - {episodio.name}</li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Personaje;