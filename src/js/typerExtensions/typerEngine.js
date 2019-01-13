import parser from "../parser";

let processedVerse = "";
let typerEngine = [];
typerEngine.push(args => {//\u2013 and \u2014 are dashes
  let settings = args.settings;
  let value;
  if (settings.ignorePunctuation) {
    value = args.value.replace(/[\u2013|\u2014]/g, " ").replace(/-/g, " ").replace(/[^\w\s]/g, '');
  } else {
    value = args.value.replace(/[\u2013|\u2014]/g, "-");
  }
  return value;
});
typerEngine.push(args => {
  let settings = args.settings;
  let value;
  if (settings.ignoreCapitalization) {
    value = args.value.toLowerCase();
  }
  return value;
});
export default typerEngine;

export const setProcessedVerse = value => {
  processedVerse = value;
};

export const getTargetWord = args => {//word user needs to type
  let targetWord = "";
  let inputValue = args.inputValue;
  let mode = args.mode;
  if (mode === "BACKSPACE") {
    if (processedVerse.lastIndexOf(inputValue) !== -1) {
      let nextSpaceIndex = processedVerse.substring(inputValue.length).indexOf(" ");
      if (nextSpaceIndex !== inputValue.length - 1 && nextSpaceIndex !== inputValue.length) {
        let previousSpaceIndex = processedVerse.substring(0, inputValue.length - 1).lastIndexOf(" ");
        targetWord = processedVerse.substring(previousSpaceIndex + 1, nextSpaceIndex - 1)
      }
    }
  }
  if (targetWord.length === 0) {
    let nextSpaceIndex = processedVerse.substring(inputValue.length).indexOf(" ");
    if (nextSpaceIndex !== inputValue.length - 1 && nextSpaceIndex !== inputValue.length) {
      let nextWordSpaceIndex = processedVerse.substring(nextSpaceIndex + 1).indexOf(" ");
      targetWord = processedVerse.substring(nextSpaceIndex + 1, nextWordSpaceIndex - 1)
    } else {
      let previousSpaceIndex = processedVerse.substring(0, inputValue.length - 1).lastIndexOf(" ");
      targetWord = processedVerse.substring(previousSpaceIndex + 1, nextSpaceIndex - 1)
    }
  }
  return targetWord;
};

export const getCurrentWord = args => {//get what the user is typing right now
  let currentWord = "";
  let inputValue = args.inputValue;
  let lastSpaceIndex = inputValue.lastIndexOf(" ");
  if (lastSpaceIndex !== -1 && lastSpaceIndex !== inputValue.length - 1) {
    currentWord = inputValue.substring(lastSpaceIndex + 1);
  } else {
    currentWord = inputValue.trim();
  }
  currentWord = parser.processInputWord(currentWord, args);
  return currentWord;
};

export const verseUntilCurrent = args => {//verse up to the user position
  let inputValue = args.inputValue;
  let verseText = args.verseText;
  let verseProgress = "";
  if (inputValue.length <= verseText.length) {
    let lastSpaceIndex = verseText.substring(0, inputValue.length).lastIndexOf(" ");
    if (lastSpaceIndex === inputValue.length - 1) {
      verseProgress = verseText.substring(0, inputValue.length);
    } else {
      let nextSpaceIndex = verseText.substring(lastSpaceIndex + 1).indexOf(" ") + lastSpaceIndex + 1;
      if (nextSpaceIndex === -1) {
        verseProgress = verseText;
      } else {
        verseProgress = verseText.substring(0, nextSpaceIndex + 1);
      }
    }
  } else {
    verseProgress = verseText;
  }
  return verseProgress;
}

export const compareWords = (args, word1, word2) => {
  return parser.processInputWord(word1, args) === parser.processInputWord(word2, args);
}