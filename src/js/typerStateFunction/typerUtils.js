import transformToTargetArray from "./transformToTargetArray";

export const splitWordList = (args, str) => {
  let settings = args.settings;
  if (settings.ignorePunctuation) {
    str = str.replace(/[\u2013|\u2014]/g, " ");
  }
  return str !== " " ? str.split(" ") : [];
}

export const getTransformedWord = (args, word) => {
  return runTransformationArray(word, transformToTargetArray, args);
}

export const getTargetText = args => {//hint, would be weird if things cap/punct are different
  let inputValue = args.inputValue;
  let verseText = args.verseText;
  let verseWords = splitWordList(args, verseText);
  let inputWords = splitWordList(args, inputValue);
  let targetWord = "";

  inputWords.forEach((_, i) => {
    if (targetWord.length === 0) {
      if (!equalAfterTransform(args, verseWords[i], inputWords[i]) || i === inputWords.length - 1) {
        targetWord = verseWords[i]
      }
    }
  });
  return targetWord;
}

export const equalAfterTransform = (args, word1, word2) => {
  return runTransformationArray(word1, transformToTargetArray, args) === runTransformationArray(word2, transformToTargetArray, args);
}

export const runTransformationArray = (defaultValue, arr, args) => {
  let value = defaultValue;
  arr.forEach(f => {
    value = f(Object.assign({}, args, { value: value }));
  });
  return value;
};


export default { splitWordList, getTransformedWord, getTargetText, equalAfterTransform, runTransformationArray };