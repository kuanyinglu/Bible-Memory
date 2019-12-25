import { equalAfterTransform, verseToCurrentCompletedWord } from './typerUtils';

const removeMultipleSpace = args => {//remove double spaces that user types for some reason
  let mode = args.mode;
  let inputValue = args.inputValue;
  let newValue = inputValue;
  if ((mode === "TYPED" || mode === "OTHER") && inputValue.length > 0 && inputValue.substring(inputValue.length - 1) === " " && inputValue.length - inputValue.trim().length > 1) {
    newValue = inputValue.trim() + " ";
  }
  return newValue;
};

const fixCompletedText = args => {
  let mode = args.mode;
  let inputValue = args.inputValue;
  let newValue = inputValue;
  if ((mode === "TYPED" || mode === "OTHER") && inputValue.length > 0 && equalAfterTransform(args, inputValue, verseToCurrentCompletedWord(args))) {
    newValue = verseToCurrentCompletedWord(args);
  }
  return newValue;
};

let transformTextArray = [];
transformTextArray.push(removeMultipleSpace);
transformTextArray.push(fixCompletedText);

export default transformTextArray;
