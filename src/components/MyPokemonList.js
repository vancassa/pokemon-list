import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPokemons } from "../store/actions";

import "./MyPokemonList.css";

function MyPokemonList(props) {
    console.log("props.myPokemons :", props.myPokemons);
    const { myPokemons } = props;

    const releasePokemon = pokemon => {
        console.log("releasing ", pokemon);
    };
    return (
        <div className="my-pokemon-container">
            {myPokemons && myPokemons.length > 0 ? (
                <div>
                    <div>You have {myPokemons.length} pokemon(s).</div>
                    <Link to="/">Catch more pokemons!</Link>
                    <div className="my-pokemon_list">
                        {myPokemons.map((pokemon, index) => (
                            <div key={index} className="my-pokemon_entry">
                                <div className="my-pokemon_entry_name">
                                    {pokemon.nickname ? (
                                        <span>
                                            {pokemon.nickname} ({pokemon.name})
                                        </span>
                                    ) : (
                                        <span>{pokemon.name}</span>
                                    )}
                                </div>
                                <div className="my-pokemon-entry_release">
                                    <button onClick={() => releasePokemon(pokemon)}>Release</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="my-pokemon_empty">
                    You don't have any pokemon yet. <Link to="/" className="my-pokemon_empty_link">Go catch some!</Link>
                </div>
            )}
        </div>
    );
}

const mapStateToProps = state => ({
    allPokemons: state.allPokemons,
    myPokemons: state.mine.pokemons
});

export default connect(mapStateToProps, { fetchPokemons })(MyPokemonList);
