import typerCssArray from './typerExtensions/typerCssArray';
import typerModeArray from './typerExtensions/typerModeArray';
import transformTextArray from './typerExtensions/transformTextArray';
import { runTransformationArray } from './typerExtensions/typerUtils';

// args.inputValue = what is typed
// args.previousValue
// args.verseText = full text of the verse
// args.settings

const getResult = args => {
  args.mode = runTransformationArray("", typerModeArray, args);
  args.newText = runTransformationArray(args.inputValue, transformTextArray, args);
  args.css = runTransformationArray("", typerCssArray, args);

  return args;
}

export default { getResult };