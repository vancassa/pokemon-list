import React from "react";
import { Link } from "react-router-dom";

function PokemonEntry(props) {
    const {pokemonKey, index, iconSrc, pokemonCount} = props;

    return (
        <Link
            to={`/pokemon/${pokemonKey}`}
            className="allpoke-entry"
            data-testid="allPokemonEntry"
        >
            <span className="allpoke-entry__name">
                #{index + 1} {pokemonKey}
            </span>
            <div className="allpoke-entry__count">
                <img
                    className="allpoke-entry__icon"
                    src={iconSrc}
                    alt="pokeball"
                    style={{ width: 20, height: 20 }}
                />
                <span>{pokemonCount}</span>
            </div>
        </Link>
    );
}

export default PokemonEntry;
