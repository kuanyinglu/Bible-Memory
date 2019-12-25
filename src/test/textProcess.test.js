import parser from "../js/parser";

let args1 = { settings: { ignorePunctuation: false, ignoreCapitalization: false } };
let input = "For one will scarcely die for a righteous person—though perhaps for a good person one would dare even to die—";

test("verse-process-exact", () => {
  expect(parser.processInputWord(input, args1)).toBe("For one will scarcely die for a righteous person-though perhaps for a good person one would dare even to die-");
});

let args2 = { settings: { ignorePunctuation: true, ignoreCapitalization: false } };

test("verse-process-ignorePunc", () => {
  expect(parser.processInputWord(input, args2)).toBe("For one will scarcely die for a righteous person though perhaps for a good person one would dare even to die ");
});

let args3 = { settings: { ignorePunctuation: false, ignoreCapitalization: true } };

test("verse-process-ignoreCap", () => {
  expect(parser.processInputWord(input, args3)).toBe("for one will scarcely die for a righteous person-though perhaps for a good person one would dare even to die-");
});

let args4 = { settings: { ignorePunctuation: true, ignoreCapitalization: true } };

test("verse-process-ignoreCapPunc", () => {
  expect(parser.processInputWord(input, args4)).toBe("for one will scarcely die for a righteous person though perhaps for a good person one would dare even to die ");
});