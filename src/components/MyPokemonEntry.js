import React from "react";

function MyPokemonEntry(props) {
    const { nickname, pokemonKey, releasePokemon } = props;

    return (
        <div className="my-pokemon_entry">
            <div className="my-pokemon_entry_name">
                {nickname ? (
                    <span>
                        {nickname} ({pokemonKey})
                    </span>
                ) : (
                    <span>{pokemonKey}</span>
                )}
            </div>
            <button
                className="my-pokemon-entry_release"
                onClick={() => releasePokemon(pokemonKey, nickname)}
            >
                Release
            </button>
        </div>
    );
}

export default MyPokemonEntry;
