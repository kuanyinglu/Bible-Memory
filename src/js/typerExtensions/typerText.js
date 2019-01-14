import { compareWords } from './typerEngine';

let typerText = [];
typerText.push(args => {//remove double spaces that user types for some reason
  let mode = args.mode;
  let inputValue = args.inputValue;
  if ((mode === "TYPED" || mode === "OTHER") && inputValue.length > 0 && inputValue.substring(inputValue.length - 1) === " " && inputValue.length - inputValue.trim().length > 1) {
    inputValue = inputValue.trim() + " ";
  }
  args.inputValue = inputValue;
  return inputValue;
});
typerText.push(args => {
  let mode = args.mode;
  let inputValue = args.inputValue;
  if ((mode === "TYPED" || mode === "OTHER") && inputValue.length > 0 && compareWords(args, inputValue, verseUntilCurrent(args))) {
    inputValue = verseUntilCurrent(args);
  }
  args.inputValue = inputValue;
  return inputValue;
});

export default typerText;

let verseUntilCurrent = args => {//verse up to the user position
  let inputValue = args.inputValue;
  let verseText = args.verseText;
  let verseProgress = "";
  if (inputValue.length <= verseText.length) {
    let lastSpaceIndex = verseText.substring(0, inputValue.length).lastIndexOf(" ");
    if (lastSpaceIndex === inputValue.length - 1) {
      verseProgress = verseText.substring(0, inputValue.length);
    } else {
      if (verseText.substring(lastSpaceIndex + 1).indexOf(" ") === -1) {
        verseProgress = verseText;
      } else {
        let nextSpaceIndex = verseText.substring(lastSpaceIndex + 1).indexOf(" ") + lastSpaceIndex + 1;
        verseProgress = verseText.substring(0, nextSpaceIndex + 1);
      }
    }
  } else {
    verseProgress = verseText;
  }
  return verseProgress;
}