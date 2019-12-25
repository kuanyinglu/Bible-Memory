import { getTargetWord, getPreviousTargetWord, getCurrentWord, equalAfterTransform } from './typerUtils';

const getTargetWordToCompare = args => {
  let mode = args.mode;
  let newWordNotStarted = getTargetWord(args) !== getPreviousTargetWord(args);
  if (mode === "TYPED") {
    if (newWordNotStarted) {
      return getPreviousTargetWord(args);
    } else {
      return getTargetWord(args);
    }
  } else if (mode === "BACKSPACE"){
    if (!newWordNotStarted) {
      return getPreviousTargetWord(args);
    } else {
      return getTargetWord(args);
    }
  }
};

let typerCssArray = [];
typerCssArray.push(args => {
  let css = args.value || "";
  let verseText = args.verseText;
  let inputValue = args.inputValue;
  let settings = args.settings;

  let inputBeginning = inputValue.lastIndexOf(" ") !== -1 ? inputValue.substring(0, inputValue.lastIndexOf(" ")) : null;
  let verseToCompareBeginning = verseText.substring(0, inputValue.lastIndexOf(" "));
  let inputNotOver = inputValue.length <= verseText.length;
  let beginningPartsMatch = inputBeginning === null || equalAfterTransform(args, inputBeginning, verseToCompareBeginning);
  let lastWordWasComplete;
  let currentWordNotWrong = true;
  if (settings.ignorePunctuation) {
    let targetWordToCompare = getTargetWordToCompare(args);
    if (targetWordToCompare) {
      let validWithDash = targetWordToCompare.replace(/[\u2013|\u2014]/g, "-").indexOf(getCurrentWord(args)) === 0;
      let validWithSpace = targetWordToCompare.split(' ')
        .reduce((acc, targetStr) => acc ? true : targetStr.indexOf(getCurrentWord(args)) === 0, false);
      currentWordNotWrong = validWithDash || validWithSpace;
    }

    //last word check
    let nextSpaceFromBeginning = verseText.substring(inputValue.lastIndexOf(" ")).replace(/[\u2013|\u2014]/g, "-").indexOf(" ");
    let validWithDash = inputBeginning === null || nextSpaceFromBeginning === -1 || equalAfterTransform(args, verseToCompareBeginning, verseText.substring(0, nextSpaceFromBeginning + inputValue.lastIndexOf(" ")));
    nextSpaceFromBeginning = verseText.substring(inputValue.lastIndexOf(" ")).replace(/[\u2013|\u2014]/g, " ").indexOf(" ");
    let validWithSpace = inputBeginning === null || nextSpaceFromBeginning === -1 || equalAfterTransform(args, verseToCompareBeginning, verseText.substring(0, nextSpaceFromBeginning + inputValue.lastIndexOf(" ")));
    lastWordWasComplete = validWithDash || validWithSpace;
  } else {
    let nextSpaceFromBeginning = verseText.substring(inputValue.lastIndexOf(" ")).indexOf(" ");
    let targetWordToCompare = getTargetWordToCompare(args);
    if (targetWordToCompare) {
      currentWordNotWrong = targetWordToCompare.indexOf(getCurrentWord(args)) === 0;
    }
    lastWordWasComplete = inputBeginning === null || nextSpaceFromBeginning === -1 || equalAfterTransform(args, verseToCompareBeginning, verseText.substring(0, nextSpaceFromBeginning + inputValue.lastIndexOf(" ")));
  }

  if (inputNotOver && beginningPartsMatch && currentWordNotWrong && lastWordWasComplete) {
    css = css + "";
  } else {
    css = css + "mistake";
  }
  return css
});


export default typerCssArray;