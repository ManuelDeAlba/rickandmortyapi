import { useEffect, useState } from "react";

function useFetch(url){
    const [elementos, setElementos] = useState(null);
    const [total, setTotal] = useState(0);
    const [pagina, setPagina] = useState(1);
    const [paginas, setPaginas] = useState(1);
    const [urls, setUrls] = useState({
        next: "",
        current: "",
        prev: ""
    });
    const [error, setError] = useState("");

    const obtenerElementos = async (url) => {
        setElementos(null);
        setError("");

        let response = await fetch(url);
        let { info, results } = await response.json();

        // Si no hay información se muestra el error
        if(!info || !results){
            setError("No hay resultados");
            return;
        }

        // Se actualiza el número de página
        // Si no existe el query param "page" por defecto es 1
        let pagina = new URL(url).searchParams.get("page") || 1;
    
        setTotal(info.count);
        setPagina(pagina);
        setPaginas(info.pages);
        setUrls({
            prev: info.prev,
            current: url,
            next: info.next
        });
        setElementos(results);
    }

    useEffect(() => {
        obtenerElementos(url);
    }, [])

    return {
        elementos,
        total,
        pagina,
        paginas,
        urls,
        obtenerElementos,
        error
    }
}

export default useFetch;