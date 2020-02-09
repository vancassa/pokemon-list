import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import store from "./store";

import "./App.css";

import AllPokemonList from "./components/AllPokemonList";
import MyPokemonList from "./components/MyPokemonList";
import PokemonDetails from "./components/PokemonDetails";
import AuthorizedRoute from "./components/AuthorizedRoute";

function App() {
    return (
        <Provider store={store}>
            <div className="app">
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <AllPokemonList />
                        </Route>
                        <AuthorizedRoute>
                            <Route path="/mylist">
                                <MyPokemonList />
                            </Route>
                            <Route path="/pokemon/:id">
                                <PokemonDetails />
                            </Route>
                        </AuthorizedRoute>
                    </Switch>
                </Router>
            </div>
        </Provider>
    );
}

export default App;
