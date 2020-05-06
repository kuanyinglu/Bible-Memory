import typerCssArray from './typerStateFunction/typerCssArray';
import typerModeArray from './typerStateFunction/typerModeArray';
import transformTextArray from './typerStateFunction/transformTextArray';
import { runTransformationArray, getTargetText } from './typerStateFunction/typerUtils';

// args.inputValue = what is typed
// args.previousValue
// args.verseText = full text of the verse
// args.settings

const getResult = args => {
  args.mode = runTransformationArray("", typerModeArray, args);
  args.newText = runTransformationArray(args.inputValue, transformTextArray, args);
  args.css = runTransformationArray("", typerCssArray, args);
  if (args.newText === args.verseText) {
    args.mode = "DONE";
  }
  args.hint = getTargetText(args, args.newText);

  return args;
}

export default { getResult };