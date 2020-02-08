import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPokemons } from "../store/actions";

function AllPokemonList(props) {
    const { allPokemons, myPokemons } = props;

    useEffect(() => {
        props.fetchPokemons();
    }, []);


    return (
        <div>
            {allPokemons &&
                Object.keys(allPokemons).map((key, index) => {
                    const count = myPokemons[key] ? Object.keys(myPokemons[key]) : 0;
                    return (
                        <div key={index}>
                            <Link to={`/pokemon/${key}`}>
                                {key} ({count})
                            </Link>
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
    allPokemons: state.allPokemons,
    myPokemons: state.mine.pokemons
});

export default connect(mapStateToProps, { fetchPokemons })(AllPokemonList);
