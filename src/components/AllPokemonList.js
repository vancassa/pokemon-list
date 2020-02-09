import React, { useState, useEffect, useReducer, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import debounce from "lodash.debounce";

import { fetchPokemons, setInitialData } from "../store/actions";
import icon from "../assets/pokeball.png";

import "./AllPokemonList.css";

function AllPokemonList(props) {
    const dispatch = useDispatch();
    const { allPokemons, myPokemons } = props;
    const { page, pokemons } = allPokemons;

    useEffect(() => {
        dispatch(setInitialData());
        props.fetchPokemons(page);
    }, []);

    window.onscroll = debounce(() => {
        if (
            window.innerHeight + document.documentElement.scrollTop >
            document.documentElement.scrollHeight - 500
        ) {
            // Fetch more pokemons
            props.fetchPokemons(page);
        }
    }, 100);

    return (
        <div className="allpoke-container">
            <Link to={`/mylist`} className="allpoke-link">
                My pokemons ({myPokemons.total})
                <img src={icon} alt="Bag icon" className="allpoke-link__icon" />
            </Link>

            <h1 className="allpoke-title">All Pokemons Available</h1>

            {pokemons &&
                Object.keys(pokemons).map((key, index) => {
                    const count = myPokemons.pokemons[key] ? myPokemons.pokemons[key].length : 0;
                    return (
                        <div key={index} className="allpoke-entry">
                            <Link to={`/pokemon/${key}`}>
                                <span className="allpoke-entry__name">{key}</span>
                            </Link>
                            <div className="allpoke-entry__count">
                                <img
                                    className="allpoke-entry__icon"
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
    myPokemons: state.mine
});

export default connect(mapStateToProps, { fetchPokemons })(AllPokemonList);
