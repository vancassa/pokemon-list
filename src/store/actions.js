import axios from "axios";

// TYPES
export const FETCH_POKEMONS = "FETCH_POKEMONS";
export const GET_POKEMONS = "GET_POKEMONS";
export const ADD_POKEMON = "ADD_POKEMON";
export const REMOVE_POKEMON = "REMOVE_POKEMON";

// ACTIONS
export const fetchPokemons = () => dispatch => {
    axios.get("https://pokeapi.co/api/v2/pokemon").then(res => {
        if (res.data.results) {
            dispatch({
                type: FETCH_POKEMONS,
                payload: res.data.results
            });
        }
    });
};

export const getMyPokemons = () => dispatch => {
    dispatch({
        type: GET_POKEMONS
    });
};

export const addPokemon = pokemon => dispatch => {
    dispatch({
        type: ADD_POKEMON,
        payload: pokemon
    });
};

export const removePokemon = id => dispatch => {
    dispatch({
        type: REMOVE_POKEMON,
        payload: id
    });
};
