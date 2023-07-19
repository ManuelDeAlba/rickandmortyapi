import { Link } from "react-router-dom";

function CardEpisodio({ episodio: { id, name, air_date, episode }}){
    return(
        <div className="card" key={id}>
            <h2 className="card__titulo">{name}</h2>

            <div className="card__informacion">
                <p><b>Episodio:</b> {episode}</p>
                <p><b>Estreno:</b> {air_date}</p>
            </div>

            <Link className="card__mas boton" to={`/episodios/${id}`}>Ver más</Link>
        </div>
    )
}

export default CardEpisodio;