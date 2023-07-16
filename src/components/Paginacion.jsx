function Paginacion({prev, next, pagina=1, paginas=0, onClick:callback}){
    const handleClick = (url) => {
        // Se hace scroll hacia arriba después de cargar los personajes
        window.scrollTo(0, 0);

        callback(url);
    }
    
    return(
        <div className="botones">
            {
                prev && (<button className="boton" onClick={() => handleClick(prev)}>Anterior</button>)
            }
            {
                pagina && (<span className="botones__pagina">Página: {pagina}/{paginas}</span>)
            }
            {
                next && (<button className="boton" onClick={() => handleClick(next)}>Siguiente</button>)
            }
        </div>
    )
}

export default Paginacion;