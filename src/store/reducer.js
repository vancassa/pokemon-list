import { combineReducers } from "redux";
import {
    FETCH_POKEMONS,
    GET_POKEMONS,
    ADD_POKEMON,
    REMOVE_POKEMON,
    SET_INITIAL_DATA,
    GET_INITIAL_DATA
} from "./actions";

const allPokemonInitialState = {};

const myPokemonInitialState = {
    pokemons: []
};

const initialDataReducer = (state = false, action) => {
    switch (action.type) {
        case SET_INITIAL_DATA:
            return true;

        case GET_INITIAL_DATA:
            return state;

        default:
            return state;
    }
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

export default combineReducers({
    initialData: initialDataReducer,
    allPokemons: allPokemonsReducer,
    mine: myPokemonsReducer
});
