import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPokemons } from "../store/actions";

function MyPokemonList(props) {
    return (
        <div>
            my pokemon
        </div>
    );
}

const mapStateToProps = state => ({
    allPokemons: state.allPokemons,
    myPokemons: state.mine.pokemons
});

export default connect(mapStateToProps, { fetchPokemons })(MyPokemonList);