import { getTargetWord, getCurrentWord } from './typerEngine';

let typerCss = [];
typerCss.push(args => {
  let css = "";
  if (getTargetWord(args).indexOf(getCurrentWord(args)) !== -1) {
    css = "";
  } else {
    css = "mistake";
  }
  return css
});


export default typerCss;