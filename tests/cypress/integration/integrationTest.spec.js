const HOME_URL = "http://localhost:3004/";

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

describe("Test links", function() {
    beforeEach(() => {
        cy.visit(HOME_URL);
        cy.wait(500);
    });

    it("Nav should link to My List page", function() {
        cy.get(".allpoke-link").click();
        cy.url().should("include", "/mylist");
    });

    it("All list Should link to /pokemons", function() {
        cy.get(".allpoke-entry").each(function($el, index, $list) {
            cy.get($el)
                .should("have.attr", "href")
                .and("include", "/pokemon/");
        });
    });
});

describe("Test UI components and data", function() {
    beforeEach(() => {
        cy.visit(HOME_URL);
        cy.wait(500);
    });

    it("Initial list should load 50 pokemons", function() {
        cy.get(".allpoke-container")
            .find(".allpoke-entry")
            .should("have.length", 50);
    });

    it("Empty my list should show button to go back", function() {
        cy.get(".allpoke-link").click();
        cy.get(".my-pokemon_empty").should(
            "have.text",
            "You don't have any pokemon yet. Go catch some!"
        );
        cy.get(".my-pokemon_link")
            .should("have.text", "Go catch some!")
            .should("have.attr", "href")
            .and("equal", "/");
    });

    it("Pokemon details page components", function() {
        cy.get(".allpoke-entry")
            .first()
            .click();

        // Image exist
        cy.get(".profile_pic img", { timeout: 5000 })
            .should("be.visible")
            .and($img => expect($img[0].naturalWidth).to.be.greaterThan(0));

        // Name exist
        cy.get(".profile_title_name").and($el => expect($el[0].textContent).to.not.be.empty);

        // Type exist
        cy.get(".container")
            .find(".profile_type")
            .each($el => expect($el[0].innerHTML).to.not.be.empty);

        // Moves exist
        cy.get(".profile_content")
            .find(".profile_content_move")
            .each($move => expect($move[0].innerHTML).to.not.be.empty);

        // Description exist
        cy.get(".description_box p").and(desc => expect(desc[0].textContent).to.not.be.empty);

        // Catch button exist
        cy.get(".catch-btn").should("exist");
    });
});

describe("Test functionalities", function() {
    beforeEach(() => {
        cy.visit(HOME_URL);
        cy.wait(500);
    });

    it("Pokemon catching function", function() {
        cy.get(".allpoke-entry")
            .first()
            .click();

        cy.waitUntilSuccess().then(res => {
            cy.get("input.success-modal__input").type("Sample Nickname");
            cy.get(".success-modal__btn").click();

            cy.get(".my-pokemon_entry_name").should("contain", "Sample Nickname");
        });
    });
});
