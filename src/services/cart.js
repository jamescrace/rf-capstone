import apiFetch from "./apiFetch.js";

export const addPlantToCart = ({plantId, quantity, potColor}) =>
    apiFetch("POST", `/cart/plants/${plantId}`, {
        quantity,
        pot_color: potColor,
    });


export const getCart = () =>
    apiFetch("GET", "/cart");

export const removeItemFromCart = ({itemId}) =>
    apiFetch("DELETE", `/cart/${itemId}`);

