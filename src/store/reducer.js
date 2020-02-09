import { combineReducers } from "redux";
import {
    FETCH_POKEMONS,
    GET_POKEMONS,
    ADD_POKEMON,
    REMOVE_POKEMON,
    SET_INITIAL_DATA,
    GET_INITIAL_DATA
} from "./actions";

const allPokemonInitialState = { page: 0, pokemons: {} };

const myPokemonInitialState = { total: 0, pokemons: {} };

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
            return {
                ...state,
                page: action.payload.page,
                pokemons: { ...state.pokemons, ...action.payload.pokemons }
            };

        default:
            return state;
    }
};

const myPokemonsReducer = (state = myPokemonInitialState, action) => {
    switch (action.type) {
        case GET_POKEMONS:
            return { ...state };

        case ADD_POKEMON:
            if (state.pokemons[action.payload.name]) {
                return {
                    ...state,
                    total: state.total + 1,
                    pokemons: {
                        ...state.pokemons,
                        [action.payload.name]: [
                            ...state.pokemons[action.payload.name],
                            action.payload.nickname
                        ]
                    }
                };
            } else
                return {
                    ...state,
                    total: state.total + 1,
                    pokemons: {
                        ...state.pokemons,
                        [action.payload.name]: [action.payload.nickname]
                    }
                };

        case REMOVE_POKEMON:
            const pokemons = state.pokemons;
            const idx = pokemons[action.payload.pokemon].findIndex(
                nickname => nickname === action.payload.nickname
            );

            pokemons[action.payload.pokemon].splice(idx, 1);

            if (pokemons[action.payload.pokemon].length === 0) {
                delete pokemons[action.payload.pokemon];
            }

            return {
                ...state,
                total: state.total - 1,
                pokemons: pokemons
            };

        default:
            return state;
    }
};

export default combineReducers({
    initialData: initialDataReducer,
    allPokemons: allPokemonsReducer,
    mine: myPokemonsReducer
});
