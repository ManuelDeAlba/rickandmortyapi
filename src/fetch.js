import { API_URLS } from "./consts";

async function obtenerElemento(url){
    let res = await fetch(url);
    let data = await res.json();

    return data;
}

export async function obtenerPersonaje({ url, id}){
    // La url tendrá más importancia
    let apiUrl = url || `${API_URLS.characters}/${id}`;
    return await obtenerElemento(apiUrl);
}

export async function obtenerEpisodio({ url, id}){
    // La url tendrá más importancia
    let apiUrl = url || `${API_URLS.episodes}/${id}`;
    return await obtenerElemento(apiUrl);
}

export async function obtenerUbicacion({ url, id}){
    // La url tendrá más importancia
    let apiUrl = url || `${API_URLS.locations}/${id}`;
    return await obtenerElemento(apiUrl);
}