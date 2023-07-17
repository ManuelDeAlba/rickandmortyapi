function Filtro({ filtros, setFiltros }){
    const handleInput = (e) => {
        setFiltros(filtros => {      
            return {
                ...filtros,
                [e.target.name]: encodeURIComponent(e.target.value)
            }
        })
    }

    const handleLimpiarFiltros = () => {
        setFiltros({
            nombre: "",
            estado: "",
            genero: ""
        });
    }

    return(
        <form className="form">
            <div className="form__filtro">
                <label className="form__label" htmlFor="nombre">Nombre:</label>
                <input
                    className="form__input"
                    type="text"
                    name="nombre"
                    id="nombre"
                    value={filtros.nombre}
                    onInput={handleInput}
                    placeholder="Rick Sanchez"
                />
            </div>

            <div className="form__filtro">
                <label className="form__label" htmlFor="estado">Estado:</label>
                <select
                    className="form__input"
                    name="estado"
                    id="estado"
                    value={filtros.estado}
                    onInput={handleInput}
                >
                    <option value="">Todos</option>
                    <option value="alive">Vivo</option>
                    <option value="dead">Muerto</option>
                    <option value="unknown">Desconocido</option>
                </select>
            </div>

            <div className="form__filtro">
                <label className="form__label" htmlFor="genero">Genero:</label>
                <select
                    className="form__input"
                    name="genero"
                    id="genero"
                    value={filtros.genero}
                    onInput={handleInput}
                >
                    <option value="">Todos</option>
                    <option value="male">Masculino</option>
                    <option value="female">Femenino</option>
                    <option value="genderless">Sin género</option>
                    <option value="unknown">Desconocido</option>
                </select>
            </div>

            <button type="button" className="boton" onClick={handleLimpiarFiltros}>Limpiar filtros</button>
        </form>
    )
}

export default Filtro;