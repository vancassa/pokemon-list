import React, { useState, useEffect } from "react";
import axios from "axios";
import { Provider } from "react-redux";
import store from "./store";

import logo from "./logo.svg";
import "./App.css";

import AllPokemonList from "./components/AllPokemonList";
import MyPokemonList from "./components/MyPokemonList";
import PokemonDetails from "./components/PokemonDetails";

function App() {
    useEffect(() => {
        console.log("fetching...");
    }, []);

    return (
        <Provider store={store}>
            <div>
                <AllPokemonList />
            </div>
        </Provider>
    );
}

export default App;
