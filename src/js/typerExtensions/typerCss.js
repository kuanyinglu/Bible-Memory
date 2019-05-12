import { getTargetWord, getCurrentWord, compareWords } from './typerEngine';

let typerCss = [];
typerCss.push(args => {
  let css = "";
  let verseText = args.verseText;
  let inputValue = args.inputValue;
  let settings = args.settings;

  let inputBeginning = inputValue.lastIndexOf(" ") !== -1 ? inputValue.substring(0, inputValue.lastIndexOf(" ")) : null;
  let verseToCompareBeginning = verseText.substring(0, inputValue.lastIndexOf(" "));
  let inputNotOver = inputValue.length <= verseText.length;
  let beginningPartsMatch = inputBeginning === null || compareWords(args, inputBeginning, verseToCompareBeginning);
  let lastWordWasComplete;
  let currentWordNotWrong;
  if (settings.ignorePunctuation) {
    let validWithDash = getTargetWord(args).replace(/[\u2013|\u2014]/g, "-").indexOf(getCurrentWord(args)) === 0;
    let validWithSpace = getTargetWord(args).split(' ')
      .reduce((acc, targetStr) => acc ? true : targetStr.indexOf(getCurrentWord(args)) === 0, false);
    currentWordNotWrong = validWithDash || validWithSpace;

    let nextSpaceFromBeginning = verseText.substring(inputValue.lastIndexOf(" ")).replace(/[\u2013|\u2014]/g, "-").indexOf(" ");
    validWithDash = inputBeginning === null || nextSpaceFromBeginning === -1 || compareWords(args, verseToCompareBeginning, verseText.substring(0, nextSpaceFromBeginning + inputValue.lastIndexOf(" ")));
    nextSpaceFromBeginning = verseText.substring(inputValue.lastIndexOf(" ")).replace(/[\u2013|\u2014]/g, " ").indexOf(" ");
    validWithSpace = inputBeginning === null || nextSpaceFromBeginning === -1 || compareWords(args, verseToCompareBeginning, verseText.substring(0, nextSpaceFromBeginning + inputValue.lastIndexOf(" ")));
    lastWordWasComplete = validWithDash || validWithSpace;
  } else {
    let nextSpaceFromBeginning = verseText.substring(inputValue.lastIndexOf(" ")).indexOf(" ");
    currentWordNotWrong = getTargetWord(args).indexOf(getCurrentWord(args)) === 0;
    lastWordWasComplete = inputBeginning === null || nextSpaceFromBeginning === -1 || compareWords(args, verseToCompareBeginning, verseText.substring(0, nextSpaceFromBeginning + inputValue.lastIndexOf(" ")));
  }

  if (inputNotOver && beginningPartsMatch && currentWordNotWrong && lastWordWasComplete) {
    css = "";
  } else {
    css = "mistake";
  }
  return css
});


export default typerCss;