import transformToTargetArray from "./transformToTargetArray";

export const getTargetWord = args => {
  let targetWord = getUnprocessedTargetWord(args, args.inputValue);
  targetWord = runTransformationArray(targetWord, transformToTargetArray, args);
  return targetWord;
};

export const getPreviousTargetWord = args => {
  let targetWord = getUnprocessedTargetWord(args, args.previousValue);
  targetWord = runTransformationArray(targetWord, transformToTargetArray, args);
  return targetWord;
}

export const getUnprocessedTargetWord = (args, input) => {//word user needs to type
  let targetWord = "";
  let inputToConsider = input.indexOf(" ") !== -1 ? input.substring(0, input.lastIndexOf(" ")) : input;
  let verseText = args.verseText;
  let mode = args.mode;
  let isFirstWord = input.indexOf(" ") === -1;
  if (mode === "BACKSPACE" && isFirstWord) {//Needed because algorithm is biased towards going forward
    let firstSpaceIndex = verseText.indexOf(" ");
    targetWord = verseText.substring(0, firstSpaceIndex !== -1 ? firstSpaceIndex : verseText);
  } else {
    let isLastWord = verseText.substring(inputToConsider.trimEnd().length + 1).indexOf(" ") === -1;
    if (isLastWord) {
      let lastSpaceIndex = verseText.lastIndexOf(" ");
      targetWord = verseText.substring(lastSpaceIndex + 1);
    } else {
      let nextSpaceIndex = verseText.substring(inputToConsider.trimEnd().length + 1).indexOf(" ") + inputToConsider.trimEnd().length + 1;
      let previousSpaceIndex = verseText.substring(0, inputToConsider.trimEnd().length + 1).lastIndexOf(" ");
      targetWord = verseText.substring(previousSpaceIndex + 1, nextSpaceIndex);
    }
  }
  return targetWord;
}

export const getCurrentWord = args => {//get what the user is typing right now
  let currentWord = "";
  let inputValue = args.inputValue;
  let lastSpaceIndex = inputValue.lastIndexOf(" ");
  if (lastSpaceIndex !== -1) {
    currentWord = inputValue.substring(lastSpaceIndex + 1);
  } else {
    currentWord = inputValue;
  }
  currentWord = runTransformationArray(currentWord, transformToTargetArray, args);
  return currentWord;
};

export const equalAfterTransform = (args, word1, word2) => {
  return runTransformationArray(word1, transformToTargetArray, args) === runTransformationArray(word2, transformToTargetArray, args);
}

export const verseToCurrentCompletedWord = args => {//verse up to the user position, space at the end
  let inputValue = args.inputValue;
  let verseText = args.verseText;
  let verseProgress = "";
  if (inputValue.length <= verseText.length) {
    let lastSpaceIndex = verseText.substring(0, inputValue.length).lastIndexOf(" ");
    if (lastSpaceIndex === inputValue.length - 1) {
      verseProgress = verseText.substring(0, inputValue.length);
    } else {
      if (verseText.substring(lastSpaceIndex + 1).indexOf(" ") === -1) {//last word
        verseProgress = verseText;
      } else {
        let nextSpaceIndex = verseText.substring(lastSpaceIndex + 1).indexOf(" ") + lastSpaceIndex + 1;
        verseProgress = verseText.substring(0, nextSpaceIndex + 1);
      }
    }
  } else {
    verseProgress = verseText;//weird text, just give it back
  }
  return verseProgress;
}

export const runTransformationArray = (defaultValue, arr, args) => {
  let value = defaultValue;
  arr.forEach(f => {
    value = f(Object.assign({}, args, { value: value }));
  });
  return value;
};