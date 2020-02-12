import { HOME_URL } from "./config.js";

describe("Test UI components and data", function() {
    beforeEach(() => {
        cy.visit(HOME_URL);
        cy.wait(500);
    });

    it("Initial list should load 50 pokemons", function() {
        cy.get("[data-testid=allPokemonContainer]")
            .find("[data-testid=allPokemonEntry]")
            .should("have.length", 50);
    });

    it("Empty my list should show button to go back", function() {
        cy.get("[data-testid=linkToMyList]").click();
        cy.get("[data-testid=myPokemonEmpty]").should(
            "have.text",
            "You don't have any pokemon yet. Go catch some!"
        );
        cy.get("[data-testid=myPokemonLink]")
            .should("have.text", "Go catch some!")
            .should("have.attr", "href")
            .and("equal", "/");
    });

    it("Pokemon details page components", function() {
        cy.get("[data-testid=allPokemonEntry]")
            .first()
            .click();

        // Image exist
        cy.get("[data-testid=pokemonProfilePic] img", { timeout: 5000 })
            .should("be.visible")
            .and($img => expect($img[0].naturalWidth).to.be.greaterThan(0));

        // Name exist
        cy.get("[data-testid=pokemonProfileName").and(
            $el => expect($el[0].textContent).to.not.be.empty
        );

        // Type exist
        cy.get(".container")
            .find("[data-testid=pokemonProfileType]")
            .each($el => expect($el[0].innerHTML).to.not.be.empty);

        // Moves exist
        cy.get("[data-testid=pokemonMoves]")
            .find("[data-testid=pokemonMove]")
            .each($move => expect($move[0].innerHTML).to.not.be.empty);

        // Description exist
        cy.get("[data-testid=pokemonDescription] p").and(
            desc => expect(desc[0].textContent).to.not.be.empty
        );

        // Catch button exist
        cy.get("[data-testid=pokemonCatchButton]").should("exist");
    });
});
