import { combineReducers } from "redux";
import { FETCH_POKEMONS, GET_POKEMONS, ADD_POKEMON, REMOVE_POKEMON } from "./actions";

const allPokemonInitialState = {};

const myPokemonInitialState = {
    pokemons: []
};

const allPokemonsReducer = (state = allPokemonInitialState, action) => {
    switch (action.type) {
        case FETCH_POKEMONS:
            let result = {};
            action.payload.forEach(pokemon => {
                result[pokemon.name] = pokemon.url;
            });
            return { ...state, ...result };

        default:
            return state;
    }
};

const myPokemonsReducer = (state = myPokemonInitialState, action) => {
    switch (action.type) {
        case GET_POKEMONS:
            return { ...state };

        case ADD_POKEMON:
            console.log("add poke");
            return { ...state, pokemons: [...state.pokemons, action.payload] };

        case REMOVE_POKEMON:
            console.log("remove my pokemon");
            return state;
        default:
            return state;
    }
};

export default combineReducers({ allPokemons: allPokemonsReducer, mine: myPokemonsReducer });
