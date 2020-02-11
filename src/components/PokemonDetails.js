import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { addPokemon } from "../store/actions";
import { capitalizeFirstChar } from "../helpers";

import "./PokemonDetails.css";
import "./utility.css";
import Modal from "./Modal";

function PokemonDetails(props) {
    const history = useHistory();
    const { allPokemons, myPokemons } = props;
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

    const checkExistence = (pokemon, nickname) => {
        return (
            myPokemons.pokemons &&
            myPokemons.pokemons[pokemon] &&
            myPokemons.pokemons[pokemon].filter(nick => nick === nickname).length > 0
        );
    };

    const [nickname, setNickname] = useState("");
    const [message, setMessage] = useState("");
    const handleInputChange = e => setNickname(e.target.value);
    const savePokemon = () => {
        if (checkExistence(pokemon.name, nickname)) {
            setMessage(
                `You already have a ${pokemon.name.toUpperCase()} having the same nickname.`
            );
        } else {
            props.addPokemon({ name: pokemon.name, nickname: nickname });
            closeModal();
            history.push("/mylist");
        }
    };

    return (
        <div className="container" style={{ overflow: isModalOpen ? "hidden" : "visible" }}>
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
                            {message && <p className="message type--error">{message}</p>}
                            <button onClick={savePokemon} className="success-modal__btn">
                                Save nickname
                            </button>
                        </div>
                    </Modal>
                    <Link to="/" className="mt-xl">{'< Back'}</Link>

                    <main>
                        <div id="info">
                            <div className="d-f jc-sb">
                                <div className="profile_pic">
                                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                                </div>
                                <div>
                                    <div className="profile_title" style={{ marginBottom: "10px" }}>
                                        <div className="profile_title_icon"></div>
                                        <div className="profile_title_name">
                                            <span>
                                                #{pokemon.id} {pokemon.name}
                                            </span>
                                            <span>Shy Pokemon</span>
                                        </div>
                                    </div>

                                    <div className="d-f ai-c jc-fe">
                                        {pokemon.types.map((entry, index) => (
                                            <div
                                                key={index}
                                                className={`profile_type ${entry.type.name}`}
                                            >
                                                <span>{entry.type.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="profile_content">
                                {pokemon.abilities &&
                                    pokemon.abilities.map((ability, index) => {
                                        return (
                                            <div key={index} className="profile_content_abilities">
                                                {capitalizeFirstChar(ability.ability.name)}
                                            </div>
                                        );
                                    })}
                            </div>
                            <div className="description-container">
                                <div className="description">
                                    <div className="description_box">
                                        <p>{desc}</p>
                                    </div>
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
