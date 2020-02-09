import axios from "axios";

// TYPES
export const SET_INITIAL_DATA = "SET_INITIAL_DATA";
export const GET_INITIAL_DATA = "GET_INITIAL_DATA";
export const FETCH_POKEMONS = "FETCH_POKEMONS";
export const GET_POKEMONS = "GET_POKEMONS";
export const ADD_POKEMON = "ADD_POKEMON";
export const REMOVE_POKEMON = "REMOVE_POKEMON";

// ACTIONS
export const setInitialData = () => dispatch => {
    dispatch({
        type: SET_INITIAL_DATA
    });
};

export const getInitialData = () => dispatch => {
    dispatch({
        type: GET_INITIAL_DATA
    });
};

export const fetchPokemons = page => dispatch => {
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=${50 * page}`).then(res => {
        if (res.data.results) {
            let pokemons = {};
            res.data.results.forEach(pokemon => {
                pokemons[pokemon.name] = pokemon.url;
            });

            dispatch({
                type: FETCH_POKEMONS,
                payload: { page: page + 1, pokemons }
            });
        }
    });
};

export const getMyPokemons = () => dispatch => {
    dispatch({
        type: GET_POKEMONS
    });
};

export const addPokemon = pokemonName => dispatch => {
    dispatch({
        type: ADD_POKEMON,
        payload: pokemonName
    });
};

export const removePokemon = (pokemon, nickname) => dispatch => {
    dispatch({
        type: REMOVE_POKEMON,
        payload: { pokemon, nickname }
    });
};
