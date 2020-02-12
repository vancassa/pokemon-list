import { HOME_URL } from "./config.js";

Cypress.Commands.add("waitUntilSuccess", () => {
    let retries = -1;

    function checkSuccess() {
        cy.get(".catch-btn").click();
        cy.wait(1100);
        cy.get(".catch-btn").then(button => {
            retries++;

            try {
                expect(button).to.have.class("type--success");
            } catch (err) {
                if (retries > 5) throw new Error(`retried too many times (${--retries})`);

                return checkSuccess();
            }
        });
    }

    return checkSuccess();
});

function catchPokemon(callback) {
    cy.waitUntilSuccess().then(res => {
        cy.get("[data-testid=pokemonSuccessNickname]").type("Sample Nickname");
        cy.get("[data-testid=pokemonSaveNickname]").click();

        callback();
    });
}

function goToFirstPokemon() {
    cy.get("[data-testid=allPokemonEntry]")
        .first()
        .click();
}

describe("Test functionalities", function() {
    beforeEach(() => {
        cy.visit(HOME_URL);
        cy.wait(500);
    });

    it("Pokemon catching function", function() {
        goToFirstPokemon();

        catchPokemon(() => {
            cy.get("[data-testid=myPokemonName]").should("contain", "Sample Nickname");
        });
    });

    it("Pokemon release function", function() {
        goToFirstPokemon();

        catchPokemon(() => {
            cy.get("[data-testid=myPokemonName]").should("contain", "Sample Nickname");
            cy.get("[data-testid=myPokemonRelease").click();
            // Should be empty
            cy.get("[data-testid=myPokemonEmpty]").should(
                "have.text",
                "You don't have any pokemon yet. Go catch some!"
            );
        });
    });

    it("Pokemon should not have the same nickname", function() {
        goToFirstPokemon();

        catchPokemon(() => {
            cy.get("[data-testid=myPokemonCatchMore").click();

            goToFirstPokemon();

            catchPokemon(() => {
                cy.get("[data-testid=pokemonNicknameError]").should("be.visible");
            })
        });
    });
});
