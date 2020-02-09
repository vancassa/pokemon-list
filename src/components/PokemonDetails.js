import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { addPokemon } from "../store/actions";
import { capitalizeFirstChar } from "../helpers";

import "./PokemonDetails.css";
import Modal from "./Modal";

function PokemonDetails(props) {
    const history = useHistory();
    const { allPokemons } = props;
    const { id } = useParams();

    const [pokemon, setPokemon] = useState();
    const [isCatching, setIsCatching] = useState(false);
    const [isFailed, setIsFailed] = useState(false);
    const [desc, setDescription] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const pokemonUrl = allPokemons.pokemons[id];

    useEffect(() => {
        axios.get(pokemonUrl).then(res => {
            setPokemon(res.data);

            axios.get(res.data.species.url).then(res2 => {
                const filterEnglish = res2.data.flavor_text_entries.filter(
                    entry => entry.language.name === "en"
                );
                setDescription(filterEnglish[0].flavor_text);
            });
        });
    }, []);

    const catchPokemon = () => {
        setIsCatching(true);

        setTimeout(() => {
            if (Math.random() < 0.5) {
                setIsFailed(false);
                openModal();
            } else {
                setIsFailed(true);
            }

            setIsCatching(false);
        }, 1000);
    };

    const [nickname, setNickname] = useState("");
    const handleInputChange = e => setNickname(e.target.value);
    const savePokemon = () => {
        //TODO: Check if pokemon name & nickname combi exists
        props.addPokemon({ name: pokemon.name, nickname: nickname });
        closeModal();
        history.push("/mylist");
    };

    return (
        <div className="container">
            {pokemon && (
                <div>
                    <Modal isOpen={isModalOpen}>
                        <div className="success-modal">
                            <h1 className="success-modal__title">
                                You caught a {pokemon.name.toUpperCase()}!
                            </h1>
                            <img
                                src={pokemon.sprites.front_default}
                                alt={pokemon.name}
                                className="success-modal__image"
                            />
                            <span>Give it a nickname?</span>
                            <input
                                type="text"
                                name="nickname"
                                value={nickname}
                                onChange={handleInputChange}
                                className="success-modal__input"
                            ></input>
                            <button onClick={savePokemon} className="success-modal__btn">
                                Save nickname
                            </button>
                        </div>
                    </Modal>
                    <Link to="/">Back</Link>

                    <main>
                        <div id="info">
                            <div className="profile_pic">
                                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                            </div>
                            <div className="profile_title">
                                <div className="profile_title_icon"></div>
                                <div className="profile_title_name">
                                    <span>
                                        #{pokemon.id} {pokemon.name}
                                    </span>
                                    <span>Curious Blob</span>
                                </div>
                            </div>

                            <div>
                                {pokemon.types.map((entry, index) => (
                                    <div key={index} className="profile_type">
                                        <span>{entry.type.name}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="profile_content">
                                {pokemon.moves &&
                                    pokemon.moves
                                        .slice(0, Math.min(3, pokemon.moves.length))
                                        .map((move, index) => {
                                            return (
                                                <div key={index}>
                                                    {capitalizeFirstChar(move.move.name)}
                                                </div>
                                            );
                                        })}
                            </div>
                            <div className="description">
                                <div className="description_box">
                                    <p>{desc}</p>
                                </div>
                            </div>
                        </div>
                        <div className="catch-btn-container">
                            <button
                                type="button"
                                className="catch-btn btn-active"
                                disabled={isCatching}
                                onClick={catchPokemon}
                                style={{ color: isFailed && !isCatching && "crimson" }}
                            >
                                {isCatching
                                    ? "Trying to catch..."
                                    : isFailed
                                    ? "Failed. Try again!"
                                    : "Catch!"}
                            </button>
                        </div>
                    </main>
                </div>
            )}
        </div>
    );
}

const mapStateToProps = state => ({
    allPokemons: state.allPokemons,
    myPokemons: state.mine
});

export default connect(mapStateToProps, { addPokemon })(PokemonDetails);
