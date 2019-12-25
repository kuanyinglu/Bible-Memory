import parser from "../js/parser";

let args1 = { settings: { ignorePunctuation: false, ignoreCapitalization: false } };
args1.verseText = "For one will scarcely die for a righteous person—though perhaps for a good person one would dare even to die—";
args1.inputValue = "";

test("type-empty", () => {
  expect(parser.getResult(args1).css).toBe("");
});

let args2 = { settings: { ignorePunctuation: false, ignoreCapitalization: true } };
args2.verseText = "For one will scarcely die for a righteous person—though perhaps for a good person one would dare even to die—";
args2.inputValue = "f";

test("type-firstWordIgnoreCap", () => {
  expect(parser.getResult(args2).css).toBe("");
});

let args3 = { settings: { ignorePunctuation: false, ignoreCapitalization: false } };
args3.verseText = "For one will scarcely die for a righteous person—though perhaps for a good person one would dare even to die—";
args3.inputValue = "f";

test("type-firstWordFailCap", () => {
  expect(parser.getResult(args3).css).toBe("mistake");
});

let args4 = { settings: { ignorePunctuation: false, ignoreCapitalization: false } };
args4.verseText = "For one will scarcely die for a righteous person—though perhaps for a good person one would dare even to die—";
args4.inputValue = "F";

test("type-firstWordCap", () => {
  expect(parser.getResult(args4).css).toBe("");
});

let args5 = { settings: { ignorePunctuation: false, ignoreCapitalization: false } };
args5.verseText = "For one will scarcely die for a righteous person—though perhaps for a good person one would dare even to die—";
args5.inputValue = "For one will scarcely die for a righteous person ";

test("type-puncFail", () => {
  expect(parser.getResult(args5).css).toBe("mistake");
});

let args6 = { settings: { ignorePunctuation: false, ignoreCapitalization: false } };
args6.verseText = "For one will scarcely die for a righteous person—though perhaps for a good person one would dare even to die—";
args6.inputValue = "For one will scarcely die for a righteous person-";

test("type-puncPass", () => {
  expect(parser.getResult(args6).css).toBe("");
});

let args7 = { settings: { ignorePunctuation: true, ignoreCapitalization: false } };
args7.verseText = "For one will scarcely die for a righteous person—though perhaps for a good person one would dare even to die—";
args7.inputValue = "For one will scarcely die for a righteous person ";

test("type-ignorePuncPass", () => {
  expect(parser.getResult(args7).css).toBe("");
});