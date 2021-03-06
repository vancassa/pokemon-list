import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { addPokemon } from "../store/actions";
import { capitalizeFirstChar } from "../helpers";

import "./PokemonDetails.css";
import "../utility.css";
import Modal from "../components/Modal";

function PokemonDetails(props) {
    const history = useHistory();
    const { allPokemons, myPokemons } = props;
    const { id } = useParams();

    const [pokemon, setPokemon] = useState();
    const [moves, setMoves] = useState([]);
    const [isCatching, setIsCatching] = useState(false);
    const [isFailed, setIsFailed] = useState(false);
    const [desc, setDescription] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const pokemonUrl = allPokemons.pokemons[id];

    useEffect(() => {
        axios.get(pokemonUrl).then(res => {
            axios.get(res.data.species.url).then(res2 => {
                setPokemon(res.data);

                // Get first english description
                const filterEnglish = res2.data.flavor_text_entries.filter(
                    entry => entry.language.name === "en"
                );
                setDescription(filterEnglish[0].flavor_text);

                // Get random moves
                const pokemonMoves = res.data.moves;
                const randomIdx =
                    pokemonMoves.length > 4
                        ? parseInt(Math.random() * (pokemonMoves.length - 4))
                        : parseInt(Math.random() * pokemonMoves.length);
                const randomMoves = [];
                for (let i = randomIdx; i < Math.min(randomIdx + 4, pokemonMoves.length); i++) {
                    randomMoves.push(pokemonMoves[i].move.name);
                }
                setMoves(randomMoves);
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
        <div
            className="profile-container"
            style={{ overflow: isModalOpen ? "hidden" : "visible" }}
            data-testid="profileContainer"
        >
            {pokemon ? (
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
                                data-testid="pokemonSuccessNickname"
                            ></input>
                            {message && (
                                <p
                                    className="message type--error"
                                    data-testid="pokemonNicknameError"
                                >
                                    {message}
                                </p>
                            )}
                            <button
                                onClick={savePokemon}
                                className="success-modal__btn"
                                data-testid="pokemonSaveNickname"
                            >
                                Save nickname
                            </button>
                        </div>
                    </Modal>
                    <Link to="/" className="mt-xl">
                        {"< Back"}
                    </Link>

                    <main>
                        <div className="info">
                            <div className="d-f jc-sb">
                                <div className="profile-pic" data-testid="pokemonProfilePic">
                                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                                </div>
                                <div className="ml-l flg-1">
                                    <div className="profile-title" style={{ marginBottom: "10px" }}>
                                        <div data-testid="pokemonProfileName">
                                            <span>
                                                #{pokemon.id} {pokemon.name}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="d-f ai-c fw-w">
                                        {pokemon.types.map((entry, index) => (
                                            <div
                                                key={index}
                                                className={`profile-type ${entry.type.name}`}
                                                data-testid="pokemonProfileType"
                                            >
                                                <span>{entry.type.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="profile-content" data-testid="pokemonMoves">
                                {moves &&
                                    moves.map((move, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="profile-content__move"
                                                data-testid="pokemonMove"
                                            >
                                                {capitalizeFirstChar(move)}
                                            </div>
                                        );
                                    })}
                            </div>
                            <div className="description-container">
                                <div className="description">
                                    <div
                                        className="description-box"
                                        data-testid="pokemonDescription"
                                    >
                                        <p>{desc}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="catch-btn-container">
                            <button
                                type="button"
                                className={`catch-btn btn-active ${isFailed &&
                                    "type--failed"} ${isModalOpen && "type--success"}`}
                                disabled={isCatching}
                                onClick={catchPokemon}
                                style={{ color: isFailed && !isCatching && "crimson" }}
                                data-testid="pokemonCatchButton"
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
            ) : (
                <div className="empty-container"></div>
            )}
        </div>
    );
}

const mapStateToProps = state => ({
    allPokemons: state.allPokemons,
    myPokemons: state.mine
});

export default connect(mapStateToProps, { addPokemon })(PokemonDetails);
