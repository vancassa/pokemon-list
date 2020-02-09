import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { addPokemon } from "../store/actions";

import "./PokemonDetails.css";
import Modal from "./Modal";

function PokemonDetails(props) {
    const history = useHistory();
    const { allPokemons } = props;
    const { id } = useParams();

    const [pokemon, setPokemon] = useState();
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
                        <div>Nickname</div>
                        <input
                            type="text"
                            name="nickname"
                            value={nickname}
                            onChange={handleInputChange}
                        ></input>
                        <button onClick={savePokemon}>Save nickname</button>
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
                                <span>HT 172</span>
                                <span>WT 100</span>
                            </div>
                            <div className="description">
                                <div className="description_box">
                                    <p>{desc}</p>
                                </div>
                            </div>
                        </div>
                    </main>
                    <button type="button" className="catch-btn btn-active" onClick={catchPokemon}>
                        Catch
                    </button>
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
