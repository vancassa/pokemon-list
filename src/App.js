import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import store from "./store";

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
            <Router>
                <Switch>
                    <Route path="/mylist">
                        <MyPokemonList />
                    </Route>
                    <Route path="/pokemon/:id">
                        <PokemonDetails />
                    </Route>
                    <Route path="/">
                        <AllPokemonList />
                    </Route>
                </Switch>
            </Router>
        </Provider>
    );
}

export default App;
