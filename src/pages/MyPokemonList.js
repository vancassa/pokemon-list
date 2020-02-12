import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { removePokemon } from "../store/actions";

import "./MyPokemonList.css";
import MyPokemonEntry from "../components/MyPokemonEntry";

function MyPokemonList(props) {
    console.log("props.myPokemons :", props.myPokemons);
    const { myPokemons } = props;
    const { pokemons } = myPokemons;

    const releasePokemon = (pokemon, nickname) => {
        props.removePokemon(pokemon, nickname);
    };
    return (
        <div className="my-pokemon-container">
            {pokemons && Object.keys(pokemons).length > 0 ? (
                <div>
                    <div className="my-pokemon_title">You have {myPokemons.total} pokemon(s).</div>
                    <Link to="/" className="my-pokemon_link">
                        Catch more pokemons!
                    </Link>
                    <div className="my-pokemon_list">
                        {Object.keys(pokemons).map((pokemonKey, index) => {
                            return (
                                <div key={index}>
                                    {pokemons[pokemonKey].map((nickname, idx) => {
                                        return (
                                            <MyPokemonEntry
                                                key={idx}
                                                nickname={nickname}
                                                pokemonKey={pokemonKey}
                                                releasePokemon={releasePokemon}
                                            />
                                        );
                                    })}
                                </div>
                            );

                            // pokemon.map(nickname => {
                            //     console.log('nickname :', nickname);
                            // })
                        })}
                    </div>
                </div>
            ) : (
                <div className="my-pokemon_empty">
                    You don't have any pokemon yet.{" "}
                    <Link to="/" className="my-pokemon_link">
                        Go catch some!
                    </Link>
                </div>
            )}
        </div>
    );
}

const mapStateToProps = state => ({
    allPokemons: state.allPokemons,
    myPokemons: state.mine
});

export default connect(mapStateToProps, { removePokemon })(MyPokemonList);
