import { equalAfterTransform, splitWordList, getTransformedWord } from './typerUtils';

let typerCssArray = [];
typerCssArray.push(args => {
  let css = args.value || "";
  let verseText = args.verseText;
  let inputValue = args.inputValue;
  
  let verseWords = splitWordList(args, verseText);
  let inputWords = splitWordList(args, inputValue);
  
  let inputNotOver = inputValue.length <= verseText.length;
  let beginningPartsMatch = inputWords.filter((_, i) => i !== inputWords.length - 1).every((_, i) => equalAfterTransform(args, verseWords[i], inputWords[i]));
  let currentWordNotWrong = inputWords.length <= verseWords.length && getTransformedWord(args, verseWords[inputWords.length - 1]).indexOf(getTransformedWord(args, inputWords[inputWords.length - 1])) === 0;

  if (inputNotOver && beginningPartsMatch && currentWordNotWrong) {
    css = css + "";
  } else {
    css = css + "mistake";
  }
  return css
});


export default typerCssArray;