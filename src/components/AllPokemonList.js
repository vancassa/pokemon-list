import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPokemons, setInitialData } from "../store/actions";
import icon from "../assets/pokeball.png";

import "./AllPokemonList.css";

function AllPokemonList(props) {
    const dispatch = useDispatch();
    const { allPokemons, myPokemons } = props;

    useEffect(() => {
        dispatch(setInitialData());
        props.fetchPokemons();
    }, []);

    return (
        <div className="all-container">
            <h1 className="all-title">All Pokemons Available</h1>
            {allPokemons &&
                Object.keys(allPokemons).map((key, index) => {
                    const count = myPokemons[key] ? Object.keys(myPokemons[key]) : 0;
                    return (
                        <div key={index} className="all-entry">
                            <Link to={`/pokemon/${key}`}>
                                <span className="all-entry__name">{key.toUpperCase()}</span>
                            </Link>
                            <div className="all-entry__count">
                                <img
                                    className="all-entry__icon"
                                    src={icon}
                                    alt="pokeball"
                                    style={{ width: 20, height: 20 }}
                                />
                                <span>{count}</span>
                            </div>
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
