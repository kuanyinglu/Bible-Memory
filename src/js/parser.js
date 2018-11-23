var parser = {};
parser.getFirstWord = function(text) {
  let firstSpace = text.indexOf(" ");
  if (firstSpace !== -1) {
    return text.slice(0, firstSpace).replace(/\"/g, '&quot;');
  } else {
    return text.replace(/\"/g, '\\\"');
  }
};
parser.getComparedWords = function(id, value, data) {
  let lastWordStart = value.lastIndexOf(" ");
  let successIndex = 0;
  let failIndex = -1;
  let word = "";
  let compareWord = "";
  let nextWord = "";
  let comparingLatest = true;
  if (lastWordStart !== -1) {
    word = value.slice(lastWordStart + 1);
    let earlierWords = value.slice(0, lastWordStart);
    let matchUntilSpace = data.indexOf(earlierWords) !== -1;
    let lastWordIsComplete = data.length > earlierWords.length && data[earlierWords.length] === " ";
    if(matchUntilSpace && lastWordIsComplete) {
      let remainingVerse = data.slice(earlierWords.length + 1);
      let dataNextSpace = remainingVerse.indexOf(" ");
      if (dataNextSpace !== -1) {//Found the word to compare
        compareWord = remainingVerse.slice(0, dataNextSpace);
        failIndex = lastWordStart;
        successIndex = lastWordStart + compareWord.length + 1;
        nextWord = parser.getNextWord(remainingVerse.slice(dataNextSpace + 1));
      } else {//This is the last word
        compareWord = remainingVerse;
        successIndex = data.length;
        failIndex = lastWordStart;
        nextWord = "";
      }
    } else {//Something didn't match, go back a word
      let temp = parser.getComparedWords(id, value.slice(0, lastWordStart), data);
      word = temp[0];
      compareWord = temp[1];
      successIndex = temp[2];
      failIndex = temp[3];
      nextWord = temp[4];
      comparingLatest = false;
    }
  } else {//This is the first word
    word = value;
    let remainingVerse = data;
    let dataNextSpace = remainingVerse.indexOf(" ");
    if (dataNextSpace !== -1) {//Found the word to compare
      compareWord = remainingVerse.slice(0, dataNextSpace);
      successIndex = compareWord.length;
      nextWord = parser.getNextWord(remainingVerse.slice(dataNextSpace + 1));
    } else {//This is the last word
      compareWord = remainingVerse;
      successIndex = remainingVerse.length;
      nextWord = "";
    }
  }
  return [word, compareWord, successIndex, failIndex, nextWord, comparingLatest];
};
parser.getNextWord = function(verse) {
  let nextWord = "";
  let splitPoint = verse.indexOf(" ");
  if (splitPoint !== -1) {
    nextWord = verse.slice(0, splitPoint);
  } else {
    nextWord = verse;
  }
  return nextWord;
};
parser.compareWord = function(word, compared) {
  let hasUpperCase = word.toLowerCase() !== word;
  let hasPunctuation = word.replace(/\W/g, '') !== word;
  let c = compared;
  if (!hasUpperCase) {
    c = c.toLowerCase();
  }
  if (!hasPunctuation) {
    c = c.replace(/\W/g, '');
  }
  return word === c;
};
parser.inputHasFuture = function(word, c) {
  let hasUpperCase = word.toLowerCase() !== word;
  let hasPunctuation = word.replace(/\W/g, '') !== word;
  if (!hasUpperCase) {
    c = c.toLowerCase();
  }
  if (!hasPunctuation) {
    c = c.replace(/[^\w\s]/g, '');
  } else {
    c.replace(/[^\s]/g, '');
  }
  return c.indexOf(word) === 0;
};