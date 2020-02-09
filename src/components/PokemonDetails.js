import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { addPokemon } from "../store/actions";

import Modal from "./Modal";

function PokemonDetails(props) {
    const { allPokemons } = props;
    const { id } = useParams();

    const [pokemon, setPokemon] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const pokemonUrl = allPokemons[id];

    useEffect(() => {
        axios.get(pokemonUrl).then(res => {
            setPokemon(res.data);
        });
    }, []);

    const catchPokemon = () => {
        if (Math.random() < 0.5) {
            // Add to my pokemon
            console.log("success");
            openModal();
            // Hide button
        } else {
            // Show try again
            console.log("failed");
        }
    };

    const [nickname, setNickname] = useState("");
    const handleInputChange = e => setNickname(e.target.value);
    const savePokemon = () => {
        console.log("saving ", nickname);
        props.addPokemon({ name: pokemon.name, nickname: nickname });
        closeModal();
    };

    return (
        <div>
            {pokemon && (
                <div>
                    <Modal isOpen={isModalOpen}>
                        <div>Nickname</div>
                        <input
                            type="text"
                            name="nickname"
                            value={nickname}
                            onChange={handleInputChange}
                        ></input>
                        <button onClick={savePokemon}>Save nickname</button>
                    </Modal>
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

export default connect(mapStateToProps, { addPokemon })(PokemonDetails);
