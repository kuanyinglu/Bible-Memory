let typerModeArray = [];
typerModeArray.push(args => {
  let inputValue = args.inputValue;
  let previousValue = args.previousValue;
  let verseText = args.verseText;
  if (typeof inputValue === "string" && typeof previousValue === "string") {
    let isOneCharMore = (str1, str2) => { return str1.length === str2.length + 1 && str1.substring(0, str1.length - 1) === str2 };
    if (inputValue === verseText) {
      return "DONE";
    } else if (isOneCharMore(inputValue, previousValue)) {
      return "TYPED";
    } else if (isOneCharMore(previousValue, inputValue)) {
      return "BACKSPACE";
    } else {
      return "OTHER";
    }
  }
  return "";
});

export default typerModeArray;