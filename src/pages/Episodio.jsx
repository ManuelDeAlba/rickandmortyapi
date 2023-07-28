import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { obtenerEpisodio, obtenerPersonaje } from "../fetch";
import CardPersonaje from "../components/CardPersonaje";

function Episodio(){
    let { id } = useParams();
    const [episodio, setEpisodio] = useState(null);

    useEffect(() => {
        const guardarEpisodio = async () => {
            // Se obtiene el episodio
            let datos = await obtenerEpisodio({ id });         

            // De cada personaje se obtiene la información
            let personajes = datos.characters.map(async url => await obtenerPersonaje({ url }));
            personajes = await Promise.all(personajes);

            // Se guardan los datos
            setEpisodio({
                ...datos,
                characters: personajes
            });
        }
        guardarEpisodio();
    }, [])

    if(!episodio) return <h2 className="titulo contenedor">Cargando...</h2>

    return(
        <div className="informacion">
            <h1 className="informacion__titulo titulo contenedor">{episodio.name}</h1>

            <div className="informacion__textos">
                <div className="informacion__contenedor contenedor">
                    <h2 className="informacion__titulo">Información</h2>
                    <p><b>Episodio:</b> {episodio.episode}</p>
                    <p><b>Estreno:</b> {episodio.air_date}</p>
                </div>
            </div>

            <div className="informacion__personajes contenedor">
                <h2 className="informacion__titulo">Personajes ({episodio.characters.length})</h2>
                <div className="cards">
                    {
                        episodio.characters.map((personaje) => (
                            <CardPersonaje personaje={personaje} key={personaje.id} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Episodio;