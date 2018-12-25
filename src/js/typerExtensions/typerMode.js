let typerMode = [];
typerMode.push(args => {
  let inputValue = args.inputValue;
  let previousValue = args.previousValue;
  if ($.type(inputValue) === "string" && $.type(previousValue) === "string") {
    let isOneCharMore = (str1, str2) => { return str1.length === str2.length + 1 && str1.substring(0, str1.length - 1) === str2 };
    if (isOneCharMore(inputValue, previousValue)) {
      return "TYPED";
    } else if (isOneCharMore(previousValue, inputValue)) {
      return "BACKSPACE";
    } else {
      return "OTHER";
    }
  }
  return "";
});

export default typerMode;