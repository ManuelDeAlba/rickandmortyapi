import { useEffect, useState } from "react";

function useFetch(urlInicial){
    const [url, setUrl] = useState(urlInicial);

    const [elementos, setElementos] = useState(null);
    const [total, setTotal] = useState(0);
    const [pagina, setPagina] = useState(1);
    const [paginas, setPaginas] = useState(1);
    const [urls, setUrls] = useState({
        next: "",
        current: "",
        prev: ""
    });
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const limpiarEstado = () => {
        setElementos(null);
        setTotal(0);
        setPagina(1);
        setPaginas(1);
        setUrls({
            next: "",
            current: "",
            prev: ""
        });
        setCargando(true);
        setError("");
    }

    const obtenerElementos = async (url) => {
        // Actualiza la url para ejecutar el useEffect y obtener los datos
        setUrl(url);
    }

    useEffect(() => {
        // Se crea un controlador para cancelar las peticiones anteriores cuando lleguen nuevas
        const abortController = new AbortController();
        const { signal } = abortController;

        const obtenerDatos = async () =>{
            // Para que no se sigan mostrando los elementos anteriores
            // si no hay resultados
            limpiarEstado();

            try{
                let response = await fetch(url, { signal });

                // Si hay respuesta pero no hay contenido se muestra un error
                if(response.status == 404){
                    setCargando(false);
                    setError("No hay resultados");
                    return;
                }

                // Si hay respuesta con contenido, extrae los datos
                let { info, results } = await response.json();

                // Se actualizan los estados
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
            } catch(err){
                // Si se canceló el fetch, no hace nada
                if(err.name === "AbortError") return;
                
                setError("Error al obtener resultados");
            }
            
            // Cuando se termina de hacer todo, se quita el estado de carga
            setCargando(false);
        }
        obtenerDatos();

        return () => abortController.abort();
    }, [url])

    return {
        elementos,
        total,
        pagina,
        paginas,
        urls,
        obtenerElementos,
        cargando,
        error
    }
}

export default useFetch;