import parser from "../js/parser";

let args1 = { settings: { ignorePunctuation: true, ignoreCapitalization: true } };
args1.verseText = "But I say to you that everyone who is angry with his brother will be liable to judgment; whoever insults his brother will be liable to the council; and whoever says, ‘You fool!’ will be liable to the hell of fire.";
args1.inputValue = "But I say to you that everyone who is angry with his brother will be liable to judgment; whoever insults his brother will be liable to the council; whoe";

test("specialCase-skipWordFail", () => {
  expect(parser.getCss(args1)).toBe("mistake");
});
