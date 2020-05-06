let transformToTargetArray = [];
transformToTargetArray.push(args => {//\u2013 and \u2014 are dashes
  let settings = args.settings;
  let value;
  if (settings.ignorePunctuation) {
    value = args.value.replace(/[\u2013|\u2014]/g, " ").replace(/-/g, " ").replace(/[^\w\s]/g, '');
  } else {
    value = args.value.replace(/[\u2013|\u2014]/g, "-");
  }
  return value;
});
transformToTargetArray.push(args => {
  let settings = args.settings;
  let value;
  if (settings.ignoreCapitalization) {
    value = args.value.toLowerCase();
  } else {
    value = args.value;
  }
  return value;
});
export default transformToTargetArray;