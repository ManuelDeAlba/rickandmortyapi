import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { obtenerUbicacion, obtenerPersonaje } from "../fetch";
import CardPersonaje from "../components/CardPersonaje";

function Ubicacion(){
    let { id } = useParams();
    const [ubicacion, setUbicacion] = useState(null);

    useEffect(() => {
        const guardarUbicacion = async () => {
            // Se obtiene la ubicacion
            let datos = await obtenerUbicacion({ id });         

            // De cada personaje se obtiene la información
            let personajes = datos.residents.map(async url => await obtenerPersonaje({ url }));
            personajes = await Promise.all(personajes);

            // Se guardan los datos
            setUbicacion({
                ...datos,
                residents: personajes
            });
        }
        guardarUbicacion();
    }, [])

    if(!ubicacion) return <h2 className="titulo contenedor">Cargando...</h2>

    return(
        <div className="informacion">
            <h1 className="informacion__titulo titulo contenedor">{ubicacion.name}</h1>

            <div className="informacion__textos">
                <div className="informacion__contenedor contenedor">
                    <h2 className="informacion__titulo">Información</h2>
                    <p><b>Tipo:</b> {ubicacion.type}</p>
                    <p><b>Dimension:</b> {ubicacion.dimension}</p>
                </div>
            </div>

            <div className="informacion__personajes contenedor">
                <h2 className="informacion__titulo">Habitantes ({ubicacion.residents.length})</h2>
                <div className="cards">
                    {
                        ubicacion.residents.map((personaje) => (
                            <CardPersonaje personaje={personaje} key={personaje.id} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Ubicacion;