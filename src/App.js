import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import store from "./store";

import "./App.css";

import AllPokemonList from "./pages/AllPokemonList";
import MyPokemonList from "./pages/MyPokemonList";
import PokemonDetails from "./pages/PokemonDetails";
import AuthorizedRoute from "./components/AuthorizedRoute";

function App() {
    return (
        <Provider store={store}>
            <div className="app">
                <Router basename={"/pokemon-list"}>
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
