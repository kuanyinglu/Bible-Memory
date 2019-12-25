import parser from "../js/parser";

let args1 = { settings: { ignorePunctuation: false, ignoreCapitalization: false } };
args1.verseText = "For one will scarcely die for a righteous person—though perhaps for a good person one would dare even to die—";
args1.inputValue = "";

test("type-empty", () => {
  expect(parser.getCss(args1)).toBe("");
});

let args2 = { settings: { ignorePunctuation: false, ignoreCapitalization: true } };
args2.verseText = "For one will scarcely die for a righteous person—though perhaps for a good person one would dare even to die—";
args2.inputValue = "f";

test("type-firstWordIgnoreCap", () => {
  expect(parser.getCss(args2)).toBe("");
});

let args3 = { settings: { ignorePunctuation: false, ignoreCapitalization: false } };
args3.verseText = "For one will scarcely die for a righteous person—though perhaps for a good person one would dare even to die—";
args3.inputValue = "f";

test("type-firstWordFailCap", () => {
  expect(parser.getCss(args3)).toBe("mistake");
});

let args4 = { settings: { ignorePunctuation: false, ignoreCapitalization: false } };
args4.verseText = "For one will scarcely die for a righteous person—though perhaps for a good person one would dare even to die—";
args4.inputValue = "F";

test("type-firstWordCap", () => {
  expect(parser.getCss(args4)).toBe("");
});

let args5 = { settings: { ignorePunctuation: false, ignoreCapitalization: false } };
args5.verseText = "For one will scarcely die for a righteous person—though perhaps for a good person one would dare even to die—";
args5.inputValue = "For one will scarcely die for a righteous person ";

test("type-puncFail", () => {
  expect(parser.getCss(args5)).toBe("mistake");
});

let args6 = { settings: { ignorePunctuation: false, ignoreCapitalization: false } };
args6.verseText = "For one will scarcely die for a righteous person—though perhaps for a good person one would dare even to die—";
args6.inputValue = "For one will scarcely die for a righteous person-";

test("type-puncPass", () => {
  expect(parser.getCss(args6)).toBe("");
});

let args7 = { settings: { ignorePunctuation: true, ignoreCapitalization: false } };
args7.verseText = "For one will scarcely die for a righteous person—though perhaps for a good person one would dare even to die—";
args7.inputValue = "For one will scarcely die for a righteous person ";

test("type-ignorePuncPass", () => {
  expect(parser.getCss(args7)).toBe("");
});