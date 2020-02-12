import { HOME_URL } from "./config.js";

describe("Test links", function() {
    beforeEach(() => {
        cy.visit(HOME_URL);
        cy.wait(500);
    });

    it("Nav should link to My List page", function() {
        cy.get("[data-testid=linkToMyList]").click();
        cy.url().should("include", "/mylist");
    });

    it("All list Should link to /pokemons", function() {
        cy.get("[data-testid=allPokemonEntry]").each(function($el, index, $list) {
            cy.get($el)
                .should("have.attr", "href")
                .and("include", "/pokemon/");
        });
    });
});