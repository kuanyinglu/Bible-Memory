import { equalAfterTransform, splitWordList } from './typerUtils';

const removeMultipleSpace = args => {//remove double spaces that user types for some reason
  let mode = args.mode;
  let inputValue = args.inputValue;
  let newValue = args.value ?? args.inputValue;
  if ((mode === "TYPED" || mode === "OTHER") && newValue.length > 0 && newValue.substring(newValue.length - 1) === " " && newValue.length - newValue.trim().length > 1) {
    newValue = inputValue.trim() + " ";
  }
  return newValue;
};

const removeSingleSpace = args => {//remove single space that user types
  let mode = args.mode;
  let inputValue = args.inputValue;
  let newValue = args.value ?? inputValue;
  if ((mode === "TYPED" || mode === "OTHER") && newValue.length === 1 && newValue === " ") {
    newValue = "";
  }
  return newValue;
};

const fixCompletedText = args => {
  let mode = args.mode;
  let inputValue = args.inputValue;
  let verseText = args.verseText;
  let newValue = args.value ?? inputValue;
  if ((mode === "TYPED" || mode === "OTHER") && newValue.length > 0) {
    let verseWords = splitWordList(args, verseText);
    let inputWords = splitWordList(args, newValue);
    let restWrong = false;
    let incorrectWords = [];
    let correctWords = [];
    inputWords.forEach((_, i) => {
      let notLastTypedWordUnlessVeryLast = i !== inputWords.length - 1 || i === verseWords.length - 1;//force space to commit except very last word
      if (!restWrong && notLastTypedWordUnlessVeryLast && equalAfterTransform(args, verseWords[i], inputWords[i])) {
        return correctWords.push(verseWords[i]);
      } else {
        restWrong = true;
        return incorrectWords.push(inputWords[i]);//return the incomplete word
      }
    });
    let incorrectString = (correctWords.length > 0 && incorrectWords.length > 0 ? " " : "") + incorrectWords.join(" ");
    newValue = verseText.substring(0, correctWords.join(" ").length) + incorrectString;//need to restore dashes too
  }
  return newValue;
};

let transformTextArray = [];
transformTextArray.push(removeMultipleSpace);
transformTextArray.push(removeSingleSpace);
transformTextArray.push(fixCompletedText);

export default transformTextArray;
