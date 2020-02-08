import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPokemons } from "../store/actions";

function AllPokemonList(props) {
    const { allPokemons, myPokemons } = props;

    useEffect(() => {
        props.fetchPokemons();
    }, []);

    console.log("allPokemons :", allPokemons);
    console.log("myPokemons :", myPokemons);

    return (
        <div>
            {allPokemons &&
                allPokemons.map((pokemon, index) => {
                    const count = myPokemons[pokemon.name]
                        ? Object.keys(myPokemons[pokemon.name])
                        : 0;
                    return (
                        <div key={index}>
                            {pokemon.name} ({count})
                        </div>
                    );
                })}
        </div>
    );
}

AllPokemonList.propTypes = {
    fetchPokemons: PropTypes.func.isRequired,
    pokemons: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    allPokemons: state.all.pokemons,
    myPokemons: state.mine.pokemons
});

export default connect(mapStateToProps, { fetchPokemons })(AllPokemonList);
