import { verseUntilCurrent, getCurrentWord, compareWords } from './typerEngine';

let typerText = [];
typerText.push(args => {
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