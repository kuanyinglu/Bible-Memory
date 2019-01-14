import parser from "../parser";

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
  let verseText = args.verseText;
  if (targetWord.length === 0) {
    if (verseText.substring(inputValue.length).indexOf(" ") === -1) {//last word
      let lastSpaceIndex = verseText.lastIndexOf(" ");
      targetWord = verseText.substring(lastSpaceIndex + 1);
    } else {
      let nextSpaceIndex = verseText.substring(inputValue.length).indexOf(" ") + inputValue.length;
      let previousSpaceIndex = verseText.substring(0, inputValue.length - 1).lastIndexOf(" ");
      targetWord = verseText.substring(previousSpaceIndex + 1, nextSpaceIndex);
    }
  }
  targetWord = parser.processInputWord(targetWord, args);
  return targetWord;
};

export const getCurrentWord = args => {//get what the user is typing right now
  let currentWord = "";
  let inputValue = args.inputValue;
  let lastSpaceIndex = inputValue.lastIndexOf(" ");
  if (lastSpaceIndex !== -1) {
    currentWord = inputValue.substring(lastSpaceIndex + 1);
  } else {
    currentWord = inputValue.trim();
  }
  currentWord = parser.processInputWord(currentWord, args);
  return currentWord;
};

export const compareWords = (args, word1, word2) => {
  return parser.processInputWord(word1, args) === parser.processInputWord(word2, args);
}