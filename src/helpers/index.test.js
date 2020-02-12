import { capitalizeFirstChar } from "./index";

it("Capitalize first character", () => {
    expect(capitalizeFirstChar("bulbasaur")).toBe("Bulbasaur");
    expect(capitalizeFirstChar("squirtle")).toBe("Squirtle");
    expect(capitalizeFirstChar("charmander")).toBe("Charmander");

    expect(capitalizeFirstChar("mr mime")).toBe("Mr mime");
    expect(capitalizeFirstChar("")).toBe("");
    expect(capitalizeFirstChar(null)).toBe("");
});
