import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";

function PokemonDetails(props) {
    const { allPokemons } = props;
    const { id } = useParams();

    const [pokemon, setPokemon] = useState();
    const pokemonUrl = allPokemons[id];

    useEffect(() => {
        axios.get(pokemonUrl).then(res => {
            setPokemon(res.data);
        });
    }, []);

    const catchPokemon = () => {
        console.log("try catch");
    };

    return (
        <div>
            {pokemon && (
                <div>
                    <div>{pokemon.name}</div>
                    <div>
                        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                    </div>
                    <div>
                        {pokemon.types.map((entry, index) => (
                            <div key={index}>{entry.type.name}</div>
                        ))}
                    </div>
                    <button onClick={catchPokemon}>Catch</button>
                </div>
            )}
        </div>
    );
}

const mapStateToProps = state => ({
    allPokemons: state.allPokemons,
    myPokemons: state.mine.pokemons
});

export default connect(mapStateToProps, {})(PokemonDetails);
