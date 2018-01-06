var ui = {};
ui.openPractice = function(caller) {
  $('#accordion').accordion('open', 1);
  autosize($('textarea'));
  $('#book-title').empty();
  $('#book-title').append(parser.getBookName(caller.textContent));
  $('#answer').val(parser.fetchVersesFromReference(caller.textContent).join(" "));
};
ui.renderVerseButtons = function() {
    let target = $('#verses-grid');
    let htmlString = "";
    let verseGroups = verses.reduce(function(acc, curr, index) {
        if (index % 5 === 0) {
            acc.push([]);
        }
        acc[acc.length - 1].push(curr);
        return acc;
    }, []);
    verseGroups.forEach(function(group) {
      htmlString = htmlString + "<div class='five column row'>";
      group.forEach(function(verse) {
        htmlString = htmlString + "<div class='column'><button class='ui right labeled icon button' onclick='ui.openPractice(this)'><i class='right arrow icon'></i>" + verse + "</button></div>";
      });
      htmlString = htmlString + "</div>";
    });
    target.append(htmlString);
};
ui.testData = ["And this #$#the test that I'll need you to do.", "Again' eee."];
ui.inputChange = function(input) {
  let seq = input.dataset.id;
  let val = input.value;
  ui.progress(seq, val);
};
ui.progress = function(id, value) {
  let temp = ui.getComparedWords(id, value, ui.testData[id]);
  let word = temp[0];
  let compareWord = temp[1];
  let successIndex = temp[2];
  let failIndex = temp[3];
  if(ui.compareWord(word, compareWord)) {

  }
};
ui.getComparedWords = function(id, value, data) {
  let lastWordStart = value.lastIndexOf(" ");
  let successIndex = 0;
  let failIndex = 0;
  let word = "";
  let compareWord = "";
  if (lastWordStart !== -1) {
    word = value.slice(lastWordStart + 1);
    if(data.indexOf(value.slice(0, lastWordStart)) !== -1) {
      let remainingVerse = data.slice(lastWordStart + 1);
      let dataNextSpace = remainingVerse.indexOf(" ");
      if (dataNextSpace !== -1) {//Found the word to compare
        compareWord = remainingVerse.slice(0, dataNextSpace);
        failIndex = lastWordStart;
        successIndex = lastWordStart + compareWord.length + 1;
      } else {//This is the last word
        compareWord = remainingVerse;
        successIndex = remainingVerse.length + 1;
      }
    } else {//Something didn't match, go back a word
      let temp = ui.getComparedWords(id, value.slice(0, lastWordStart));
      word = temp[0];
      compareWord = temp[1];
      successIndex = temp[2];
      failIndex = temp[3];
    }
  } else {//This is the first word
    word = value;
    let remainingVerse = data;
    let dataNextSpace = remainingVerse.indexOf(" ");
    if (dataNextSpace !== -1) {//Found the word to compare
      compareWord = remainingVerse.slice(0, dataNextSpace);
      successIndex = compareWord.length;
    } else {//This is the last word
      compareWord = remainingVerse;
      successIndex = remainingVerse.length;
    }
  }
  return [word, compareWord, successIndex, failIndex];
};
ui.compareWord = function(w, c) {
  return w.toLowerCase().replace(/\W/g, '') === c.toLowerCase().replace(/\W/g, '');
};
ui.
