import typerState from "../js/typerState";

let args1 = { settings: { ignorePunctuation: true, ignoreCapitalization: true } };
args1.verseText = "But I say to you that everyone who is angry with his brother will be liable to judgment; whoever insults his brother will be liable to the council; and whoever says, ‘You fool!’ will be liable to the hell of fire.";
args1.inputValue = "But I say to you that everyone who is angry with his brother will be liable to judgment; whoever insults his brother will be liable to the council; whoe";

test("specialCase-skipWordFail", () => {
  expect(typerState.getResult(args1).css).toBe("mistake");
});

let args2 = { settings: { ignorePunctuation: true, ignoreCapitalization: true } };
args2.verseText = "If your right eye causes you to sin, tear it out and throw it away. For it is better that you lose one of your members than that your whole body be thrown into hell.";
args2.inputValue = "If your right eye causes you to in";

test("specialCase-wrongPartWord", () => {
  expect(typerState.getResult(args2).css).toBe("mistake");
});

let args3 = { settings: { ignorePunctuation: true, ignoreCapitalization: true } };
args3.verseText = "“Do not think that I have come to abolish the Law or the Prophets; I have not come to abolish them but to fulfill them.";
args3.inputValue = "“Do not think that I have come to abolish the Law or the Phets";

test("specialCase-wrongPartWord", () => {
  expect(typerState.getResult(args3).css).toBe("mistake");
});
