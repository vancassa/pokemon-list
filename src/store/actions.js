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

export const addPokemon = pokemonName => dispatch => {
    dispatch({
        type: ADD_POKEMON,
        payload: pokemonName
    });
};

export const removePokemon = id => dispatch => {
    dispatch({
        type: REMOVE_POKEMON,
        payload: id
    });
};
