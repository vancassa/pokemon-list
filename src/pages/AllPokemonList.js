import React, { useState, useEffect, useReducer, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import debounce from "lodash.debounce";

import { fetchPokemons, setInitialData } from "../store/actions";
import icon from "../assets/pokeball.png";

import "./AllPokemonList.css";
import PokemonEntry from "../components/PokemonEntry.js";

function AllPokemonList(props) {
    const dispatch = useDispatch();
    const { allPokemons, myPokemons } = props;
    const { page, pokemons } = allPokemons;

    const scrollListener = debounce(() => {
        if (
            window.innerHeight + document.documentElement.scrollTop >
            document.documentElement.scrollHeight - 500
        ) {
            // Fetch more pokemons
            props.fetchPokemons(page);
        }
    }, 500);

    useEffect(() => {
        dispatch(setInitialData());
        if (page === 0) props.fetchPokemons(page);

        // Scroll listener
        window.addEventListener("scroll", scrollListener);

        return () => {
            window.removeEventListener("scroll", scrollListener);
        };
    }, []);

    return (
        <div className="allpoke-container" data-testid="allPokemonContainer">
            <Link to={`/mylist`} className="allpoke-link" data-testid="linkToMyList">
                My pokemons ({myPokemons.total})
                <img src={icon} alt="Bag icon" className="allpoke-link__icon" />
            </Link>

            <h1 className="allpoke-title" data-testid="allPokemonTitle">
                All Pokemons Available
            </h1>

            {pokemons && Object.keys(pokemons).length > 0 ? (
                Object.keys(pokemons).map((key, index) => {
                    const count = myPokemons.pokemons[key] ? myPokemons.pokemons[key].length : 0;
                    return (
                        <PokemonEntry
                            key={index}
                            index={index}
                            pokemonKey={key}
                            iconSrc={icon}
                            pokemonCount={count}
                        />
                    );
                })
            ) : (
                <div className="empty-container" />
            )}
        </div>
    );
}

const mapStateToProps = state => ({
    allPokemons: state.allPokemons,
    myPokemons: state.mine
});

export default connect(mapStateToProps, { fetchPokemons })(AllPokemonList);
