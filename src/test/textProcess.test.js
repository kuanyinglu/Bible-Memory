import transformToTargetArray from "../js/typerStateFunction/transformToTargetArray";
import typerUtils from "../js/typerStateFunction/typerUtils";

let args1 = { settings: { ignorePunctuation: false, ignoreCapitalization: false } };
let input = "For one will scarcely die for a righteous person—though perhaps for a good person one would dare even to die—";

test("verse-process-exact", () => {
  expect(typerUtils.runTransformationArray(input, transformToTargetArray, args1)).toBe("For one will scarcely die for a righteous person-though perhaps for a good person one would dare even to die-");
});

let args2 = { settings: { ignorePunctuation: true, ignoreCapitalization: false } };

test("verse-process-ignorePunc", () => {
  expect(typerUtils.runTransformationArray(input, transformToTargetArray, args2)).toBe("For one will scarcely die for a righteous person though perhaps for a good person one would dare even to die ");
});

let args3 = { settings: { ignorePunctuation: false, ignoreCapitalization: true } };

test("verse-process-ignoreCap", () => {
  expect(typerUtils.runTransformationArray(input, transformToTargetArray, args3)).toBe("for one will scarcely die for a righteous person-though perhaps for a good person one would dare even to die-");
});

let args4 = { settings: { ignorePunctuation: true, ignoreCapitalization: true } };

test("verse-process-ignoreCapPunc", () => {
  expect(typerUtils.runTransformationArray(input, transformToTargetArray, args4)).toBe("for one will scarcely die for a righteous person though perhaps for a good person one would dare even to die ");
});