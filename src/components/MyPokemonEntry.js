import React from "react";

function MyPokemonEntry(props) {
    const { nickname, pokemonKey, releasePokemon } = props;

    return (
        <div className="my-pokemon-entry">
            <div className="my-pokemon-entry__name" data-testid="myPokemonName">
                {nickname ? (
                    <span>
                        {nickname} ({pokemonKey})
                    </span>
                ) : (
                    <span>{pokemonKey}</span>
                )}
            </div>
            <button
                className="my-pokemon-entry__release"
                onClick={() => releasePokemon(pokemonKey, nickname)}
                data-testid="myPokemonRelease"
            >
                Release
            </button>
        </div>
    );
}

export default MyPokemonEntry;
