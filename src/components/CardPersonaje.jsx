import { Link } from "react-router-dom";

function CardPersonaje({personaje: {id, name, status, species, type, gender, origin: {name:originName}, location: {name:locationName}, image}}){
    return(
        <div className="card">
            <img className="card__img" src={image} alt={`Imagen de ${name}`} />

            <div className="card__informacion">
                <h2 className="card__titulo">{name}</h2>
                <p><b>Estado:</b> {status}</p>
                <p><b>Especie:</b> {species}</p>
                { type && (<p><b>Tipo:</b> {type}</p>) }
                <p><b>Genero:</b> {gender}</p>
                <p><b>Origen:</b> {originName}</p>
                <p><b>Ubicacion:</b> {locationName}</p>
            </div>

            <Link className="card__mas boton" to={`/personajes/${id}`}>Ver más</Link>
        </div>
    )
}

export default CardPersonaje;